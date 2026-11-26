import { useEffect, useRef, useState } from "react";
import { FileTextIcon, MenuIcon } from "./Icons";
import "./styles/Navbar.css";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [isWide, setIsWide] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );
  const [fallbackOpen, setFallbackOpen] = useState(false);

  const supportsPopover =
    typeof HTMLElement !== "undefined" &&
    Object.prototype.hasOwnProperty.call(HTMLElement.prototype, "popover");

  useEffect(() => {
    if (supportsPopover || !fallbackOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFallbackOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [supportsPopover, fallbackOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const syncLayout = () => {
      const wide = mq.matches;
      setIsWide(wide);
      const menu = menuRef.current;
      if (!menu) return;
      if (wide) {
        menu.removeAttribute("popover");
        setFallbackOpen(false);
      } else if (supportsPopover) {
        menu.setAttribute("popover", "auto");
      }
    };

    syncLayout();
    mq.addEventListener("change", syncLayout);
    return () => mq.removeEventListener("change", syncLayout);
  }, [supportsPopover]);

  // Scrollspy: the active link is the last section whose top has scrolled past
  // a line just below the sticky header. Nothing is active on the hero, and the
  // last item (Contact, a short footer) wins once the page hits bottom.
  // (Replaces CSS scroll-target-group, whose own heuristic flipped to the next
  // section as soon as it entered the viewport.)
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const links = Array.from(menu.querySelectorAll<HTMLAnchorElement>("a[href^='#']"));
    const sectionEls = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!sectionEls.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = (headerRef.current?.offsetHeight ?? 64) + window.innerHeight * 0.25;
      let activeId: string | null = null;
      for (const section of sectionEls) {
        if (section.getBoundingClientRect().top <= line) activeId = section.id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) activeId = sectionEls[sectionEls.length - 1].id;

      links.forEach((link) => {
        const active = link.getAttribute("href") === `#${activeId}`;
        link.classList.toggle("target-current", active);
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const closeMobileMenu = () => {
    if (isWide) return;
    const menu = menuRef.current as (HTMLUListElement & { hidePopover?: () => void }) | null;
    if (supportsPopover && menu?.matches(":popover-open")) {
      menu.hidePopover?.();
    } else {
      setFallbackOpen(false);
    }
  };

  return (
    <header
      ref={headerRef}
      className={`site-header ${isWide ? "is-wide" : ""} ${
        !supportsPopover && fallbackOpen ? "is-fallback-open" : ""
      }`.trim()}
    >
      <a href="#hero-heading" className="skip-link visually-hidden">
        Skip to main content
      </a>

      <div className="section-wrap header-inner">
        <a href="#top" className="brand-mark">
          <span className="brand-monogram" aria-hidden="true">
            HS
          </span>
          <span className="brand-name">Harsh Saw</span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          <button
            type="button"
            className="menu-button"
            aria-controls="site-menu"
            aria-expanded={!supportsPopover ? fallbackOpen : undefined}
            {...(supportsPopover
              ? ({
                  popovertarget: "site-menu",
                  popovertargetaction: "toggle",
                } as Record<string, string>)
              : {
                  onClick: () => setFallbackOpen((prev) => !prev),
                })}
          >
            <MenuIcon />
            <span>Menu</span>
          </button>

          <ul
            id="site-menu"
            ref={menuRef}
            className={`site-menu ${!supportsPopover && fallbackOpen ? "is-open" : ""}`.trim()}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="nav-link"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="/resume"
          target="_blank"
          rel="noreferrer"
          className="header-resume-btn"
        >
          <FileTextIcon width={16} height={16} />
          <span>Résumé</span>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
