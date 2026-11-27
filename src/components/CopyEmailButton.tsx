import { useCallback, useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "./Icons";
import "./styles/CopyButton.css";

interface CopyEmailButtonProps {
  email: string;
  targetId: string;
  className?: string;
}

let lastAnnouncement = "";

function legacyCopy(text: string): boolean {
  const previousFocus = document.activeElement as HTMLElement | null;
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.cssText = "position:fixed;inset-block-start:0;opacity:0";
  document.body.append(field);
  field.select();
  try {
    return document.execCommand("copy");
  } finally {
    field.remove();
    previousFocus?.focus({ preventScroll: true });
  }
}

const CopyEmailButton = ({
  email,
  targetId,
  className = "",
}: CopyEmailButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [announcement, setAnnouncement] = useState("");
  const timerRef = useRef<number | undefined>(undefined);

  const performCopy = useCallback(async () => {
    window.clearTimeout(timerRef.current);
    let ok = false;
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch {
      ok = legacyCopy(email);
    }

    let message = ok ? "Copied" : "Copy failed";
    if (message === lastAnnouncement) {
      message += "\u00A0";
    }
    lastAnnouncement = message;

    setStatus(ok ? "copied" : "failed");
    setAnnouncement("");
    requestAnimationFrame(() => setAnnouncement(message));

    timerRef.current = window.setTimeout(() => {
      setStatus("idle");
      setAnnouncement("");
    }, 2000);
  }, [email]);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    if ("CommandEvent" in window) {
      const handleDocumentCommand = (event: Event) => {
        const cmdEvent = event as Event & { command?: string; source?: Element | null };
        if (cmdEvent.source === button && cmdEvent.command === "--copy") {
          void performCopy();
        }
      };
      document.addEventListener("command", handleDocumentCommand, true);
      return () => document.removeEventListener("command", handleDocumentCommand, true);
    }

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      void performCopy();
    };
    button.addEventListener("click", handleClick);
    return () => button.removeEventListener("click", handleClick);
  }, [performCopy]);

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  return (
    <span className="copy-control">
      <button
        ref={buttonRef}
        type="button"
        className={`copy-email-btn ${className}`.trim()}
        data-copied={status === "copied" ? "" : undefined}
        data-failed={status === "failed" ? "" : undefined}
        aria-label={`Copy email address ${email}`}
        {...({
          command: "--copy",
          commandfor: targetId,
        } as Record<string, string>)}
      >
        {status === "copied" ? <CheckIcon /> : <CopyIcon />}
        <span>{status === "copied" ? "Copied" : "Copy email"}</span>
      </button>
      {status !== "idle" ? (
        <span className="copy-tip" aria-hidden="true">
          {status === "copied" ? "Copied" : "Copy failed"}
        </span>
      ) : null}
      <span className="visually-hidden" role="status">
        {announcement}
      </span>
    </span>
  );
};

export default CopyEmailButton;
