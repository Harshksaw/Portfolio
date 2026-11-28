import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { resume } from "../data/resume";
import "./styles/TerminalSession.css";

type TabId = "status" | "stack" | "diff" | "contact";

interface TerminalLine {
  kind: "cmd" | "out" | "note" | "err" | "plus" | "minus";
  label?: string;
  text: string;
}

interface CommandHistoryItem {
  id: number;
  command: string;
  lines: TerminalLine[];
  actionHref?: string;
  actionLabel?: string;
  actionExternal?: boolean;
}

const TABS: { id: TabId; label: string }[] = [
  { id: "status", label: "status" },
  { id: "stack", label: "stack" },
  { id: "diff", label: "diff" },
  { id: "contact", label: "contact" },
];

function buildTabOutputs(): Record<TabId, TerminalLine[]> {
  return {
    status: [
      { kind: "cmd", text: "whoami && ./status.sh" },
      { kind: "out", label: "engineer", text: `${resume.basics.name} | ${resume.basics.title}` },
      { kind: "out", label: "location", text: resume.basics.location },
      { kind: "out", label: "focus", text: "RAG agents, Go/FastAPI services, cloud sandboxes, HLS media" },
      { kind: "out", label: "impact", text: "1,500+ OC staff | -60% LLM cost | 1.5s HLS seek | 30K+ users" },
      { kind: "cmd", text: "ls ./featured" },
      { kind: "out", label: "dirs", text: "doc-intel/  codeexpo/  krishna-lms/  bwisher/" },
    ],
    stack: [
      { kind: "cmd", text: "cat stack.toml" },
      ...resume.skills.slice(0, 5).map((group) => ({
        kind: "out" as const,
        label: group.category.toLowerCase().replace(/[^a-z0-9]+/g, "_"),
        text: group.items.join(", "),
      })),
    ],
    diff: [
      { kind: "cmd", text: "git diff a/legacy b/production" },
      { kind: "minus", text: "- 30s HLS course video seek stalls across 2K+ learners" },
      { kind: "plus", text: "+ 1.5s direct byte-range S3/CloudFront seek (~70% less bandwidth)" },
      { kind: "minus", text: "- Linear cloud LLM spend across enterprise document queries" },
      { kind: "plus", text: "+ -60% LLM inference cost via Qwen3-4B QLoRA + FAISS RAG" },
      { kind: "plus", text: "+ Kafka + BullMQ multi-channel campaigns serving 30K+ users" },
    ],
    contact: [
      { kind: "cmd", text: "./contact.sh --links" },
      { kind: "out", label: "email", text: resume.basics.email },
      ...resume.basics.links.map((link) => ({
        kind: "out" as const,
        label: link.label.toLowerCase(),
        text: link.url.replace(/^https?:\/\//, ""),
      })),
      { kind: "out", label: "status", text: "Open to SWE, Full-Stack & AI Systems roles" },
    ],
  };
}

function flattenLinesLength(lines: TerminalLine[]): number {
  return lines.reduce((sum, line) => {
    const labelLen = line.label ? line.label.length + 2 : 0;
    return sum + labelLen + line.text.length;
  }, 0);
}

function sliceLines(lines: TerminalLine[], charBudget: number): {
  visible: { line: TerminalLine; shownLabel: string; shownText: string }[];
  isComplete: boolean;
} {
  let remaining = charBudget;
  const visible: { line: TerminalLine; shownLabel: string; shownText: string }[] = [];

  for (const line of lines) {
    if (remaining <= 0) break;
    const labelPrefix = line.label ?? "";
    const fullLen = (labelPrefix ? labelPrefix.length + 2 : 0) + line.text.length;

    if (remaining >= fullLen) {
      visible.push({ line, shownLabel: labelPrefix, shownText: line.text });
      remaining -= fullLen;
    } else {
      const shownLabel = labelPrefix.slice(0, remaining);
      const afterLabel = Math.max(0, remaining - (labelPrefix ? labelPrefix.length + 2 : 0));
      const shownText = line.text.slice(0, afterLabel);
      visible.push({ line, shownLabel, shownText });
      remaining = 0;
    }
  }

  return {
    visible,
    isComplete: charBudget >= flattenLinesLength(lines),
  };
}

export default function TerminalSession({ className = "" }: { className?: string }) {
  const tabOutputs = useMemo(() => buildTabOutputs(), []);
  const [activeTab, setActiveTab] = useState<TabId>("status");
  const [typedChars, setTypedChars] = useState<number>(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return flattenLinesLength(tabOutputs.status);
    }
    return 0;
  });
  const [typingDone, setTypingDone] = useState<boolean>(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return true;
    }
    return false;
  });
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const nextIdRef = useRef(1);
  const bodyRef = useRef<HTMLDivElement>(null);

  const currentLines = tabOutputs[activeTab];
  const totalChars = useMemo(() => flattenLinesLength(currentLines), [currentLines]);

  useEffect(() => {
    if (typingDone || activeTab !== "status") {
      setTypedChars(totalChars);
      setTypingDone(true);
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setTypedChars(totalChars);
      setTypingDone(true);
      return;
    }

    let timer = 0;
    let typed = 0;
    const startDelay = window.setTimeout(() => {
      timer = window.setInterval(() => {
        typed = Math.min(totalChars, typed + 5);
        setTypedChars(typed);
        if (typed >= totalChars) {
          window.clearInterval(timer);
          setTypingDone(true);
        }
      }, 28);
    }, 160);

    return () => {
      window.clearTimeout(startDelay);
      window.clearInterval(timer);
    };
  }, [activeTab, totalChars, typingDone]);

  useEffect(() => {
    if (bodyRef.current && history.length > 0) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const { visible, isComplete } = useMemo(() => {
    if (activeTab !== "status" || typingDone) {
      return sliceLines(currentLines, totalChars);
    }
    return sliceLines(currentLines, typedChars);
  }, [activeTab, currentLines, totalChars, typedChars, typingDone]);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    setHistory([]);
    setTypingDone(true);
  };

  const handleReplay = () => {
    setActiveTab("status");
    setHistory([]);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedChars(flattenLinesLength(tabOutputs.status));
      setTypingDone(true);
    } else {
      setTypedChars(0);
      setTypingDone(false);
    }
  };

  const runCommand = (rawCommand: string) => {
    const clean = rawCommand.trim();
    if (!clean) return;
    const normalized = clean.toLowerCase();

    if (normalized === "clear" || normalized === "cls") {
      setHistory([]);
      return;
    }

    const id = nextIdRef.current++;
    let responseLines: TerminalLine[];
    let actionHref: string | undefined;
    let actionLabel: string | undefined;
    let actionExternal = false;

    if (normalized === "help" || normalized === "?") {
      responseLines = [
        {
          kind: "note",
          text: "Commands: status, stack, diff, work, experience, contact, resume, clear",
        },
      ];
    } else if (normalized === "status" || normalized === "whoami") {
      setActiveTab("status");
      setTypingDone(true);
      responseLines = [
        { kind: "out", label: "engineer", text: `${resume.basics.name} | ${resume.basics.title}` },
        { kind: "out", label: "location", text: resume.basics.location },
      ];
    } else if (normalized === "stack") {
      setActiveTab("stack");
      setTypingDone(true);
      responseLines = tabOutputs.stack.slice(1, 4);
      actionHref = "#stack";
      actionLabel = "Open stack section";
    } else if (normalized === "diff") {
      setActiveTab("diff");
      setTypingDone(true);
      responseLines = tabOutputs.diff.slice(1, 5);
    } else if (normalized === "work" || normalized === "ls" || normalized === "projects") {
      responseLines = [
        { kind: "out", label: "01", text: "Doc-Intel: Multi-tenant Qdrant RAG + Groq/Gemini failover" },
        { kind: "out", label: "02", text: "CodeExpo: Browser IDE with xterm.js WebSocket + Docker sandbox" },
        { kind: "out", label: "03", text: "Krishna LMS: 2K+ learners, 1.5s HLS seek (~70% less bandwidth)" },
        { kind: "out", label: "04", text: "Bwisher: Kafka + BullMQ marketing engine (30K+ users)" },
      ];
      actionHref = "#work";
      actionLabel = "Open projects section";
    } else if (normalized === "experience" || normalized === "career") {
      responseLines = resume.experience.slice(0, 3).map((entry) => ({
        kind: "out" as const,
        label: entry.date,
        text: `${entry.role} | ${entry.company}`,
      }));
      actionHref = "#experience";
      actionLabel = "Open timeline section";
    } else if (normalized === "contact") {
      setActiveTab("contact");
      setTypingDone(true);
      responseLines = tabOutputs.contact.slice(1, 4);
      actionHref = "#contact";
      actionLabel = "Open contact section";
    } else if (normalized === "resume" || normalized === "cv") {
      responseLines = [
        { kind: "note", text: "Print-formatted single-page résumé ready at /resume." },
      ];
      actionHref = "/resume";
      actionLabel = "Open printable résumé";
      actionExternal = true;
    } else {
      responseLines = [
        { kind: "err", text: `zsh: command not found: ${clean} (try "help")` },
      ];
    }

    setHistory((prev) => [
      ...prev.slice(-3),
      { id, command: clean, lines: responseLines, actionHref, actionLabel, actionExternal },
    ]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim()) return;
    runCommand(inputValue);
    setInputValue("");
  };

  return (
    <section
      className={`term-window ${className}`.trim()}
      aria-label="Interactive developer shell preview"
    >
      <div className="term-bar">
        <span className="term-identity">tty0 | harsh@kelowna:~</span>
        <div className="term-bar-actions">
          <div className="term-tabs" role="tablist" aria-label="Shell inspections">
            {TABS.map((tab) => {
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={`term-tab ${selected ? "is-active" : ""}`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            className="term-replay"
            onClick={handleReplay}
            aria-label="Replay terminal typing animation"
            title="Replay typing"
          >
            replay
          </button>
        </div>
      </div>

      <div
        ref={bodyRef}
        className="term-body"
        role="tabpanel"
        aria-label={`${activeTab} output`}
      >
        <div className="term-lines">
          {visible.map(({ line, shownLabel, shownText }, idx) => (
            <div key={`${activeTab}-${idx}`} className={`term-line is-${line.kind}`}>
              {line.kind === "cmd" ? (
                <>
                  <span className="term-prompt" aria-hidden="true">
                    $
                  </span>
                  <span className="term-cmd-text">{shownText}</span>
                </>
              ) : line.label ? (
                <>
                  <span className="term-key">{shownLabel}</span>
                  <span className="term-val">{shownText}</span>
                </>
              ) : (
                <span className="term-val">{shownText}</span>
              )}
              {!isComplete && idx === visible.length - 1 ? (
                <span className="term-caret is-typing" aria-hidden="true" />
              ) : null}
            </div>
          ))}

          {isComplete && history.length === 0 ? (
            <div className="term-line is-cmd term-idle-line" aria-hidden="true">
              <span className="term-prompt">$</span>
              <span className="term-caret is-settled" />
            </div>
          ) : null}
        </div>

        {history.length > 0 ? (
          <div className="term-history">
            {history.map((item) => (
              <div key={item.id} className="term-history-block">
                <div className="term-line is-cmd">
                  <span className="term-prompt" aria-hidden="true">
                    $
                  </span>
                  <span className="term-cmd-text">{item.command}</span>
                </div>
                {item.lines.map((line, i) => (
                  <div key={i} className={`term-line is-${line.kind}`}>
                    {line.label ? (
                      <>
                        <span className="term-key">{line.label}</span>
                        <span className="term-val">{line.text}</span>
                      </>
                    ) : (
                      <span className="term-val">{line.text}</span>
                    )}
                  </div>
                ))}
                {item.actionHref && item.actionLabel ? (
                  <div className="term-line is-action">
                    <a
                      href={item.actionHref}
                      className="term-action-link"
                      target={item.actionExternal ? "_blank" : undefined}
                      rel={item.actionExternal ? "noreferrer" : undefined}
                    >
                      {item.actionLabel}
                    </a>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="term-chips" role="group" aria-label="Quick terminal commands">
        {["work", "experience", "stack", "diff", "resume", "clear"].map((cmd) => (
          <button
            key={cmd}
            type="button"
            className="term-chip"
            onClick={() => runCommand(cmd)}
          >
            ${" "}
            {cmd}
          </button>
        ))}
      </div>

      <form className="term-input-row" onSubmit={handleSubmit}>
        <label htmlFor="term-cmd-input" className="visually-hidden">
          Enter terminal command
        </label>
        <span className="term-prompt" aria-hidden="true">
          visitor@harsh:~$
        </span>
        <input
          id="term-cmd-input"
          type="text"
          className="term-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="help | stack | work | resume | clear"
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit" className="term-run-btn">
          run
        </button>
      </form>
    </section>
  );
}
