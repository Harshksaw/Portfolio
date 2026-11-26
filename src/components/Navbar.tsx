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

  // Scrollspy: native CSS scroll-target-group when supported, IntersectionObserver fallback otherwise.
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const links = Array.from(menu.querySelectorAll<HTMLAnchorElement>("a[href^='#']"));

    if (CSS.supports("scroll-target-group: auto")) {
      const syncAriaCurrent = () => {
        const currentLink = menu.querySelector<HTMLAnchorElement>("a:target-current");
        links.forEach((link) => {
          link.setAttribute("aria-current", link === currentLink ? "true" : "false");
        });
      };
      syncAriaCurrent();
      document.addEventListener("scrollend", syncAriaCurrent);
      return () => document.removeEventListener("scrollend", syncAriaCurrent);
    }

    const sectionEls = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!sectionEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.getAttribute("id");
          links.forEach((link) => {
            const active = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("target-current", active);
            link.setAttribute("aria-current", active ? "true" : "false");
          });
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sectionEls.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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
