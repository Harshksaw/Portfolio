import { useEffect, useRef, useState } from "react";
import { resume } from "../data/resume";
import { ArrowOutwardIcon } from "./Icons";
import "./styles/Career.css";

const Career = () => {
  const entries = resume.experience;
  const [activeIndex, setActiveIndex] = useState(0);
  const [allExpanded, setAllExpanded] = useState(false);

  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const detailRefs = useRef<(HTMLDetailsElement | null)[]>([]);

  const activeEntry = entries[activeIndex] ?? entries[0];
  const isActiveCurrent = activeEntry?.date.toLowerCase().includes("present") ?? false;

  useEffect(() => {
    if (detailRefs.current[0]) {
      detailRefs.current[0].open = true;
    }
  }, []);

  const toggleExpandAll = () => {
    const nextValue = !allExpanded;
    detailRefs.current.forEach((el) => {
      if (el) el.open = nextValue;
    });
    setAllExpanded(nextValue);
  };

  // Sync active role preview on desktop as items cross the reading band
  useEffect(() => {
    const items = itemRefs.current.filter((el): el is HTMLLIElement => el !== null);
    if (items.length === 0) return;

    const mqDesktop = window.matchMedia("(min-width: 1025px)");
    let observer: IntersectionObserver | null = null;

    const syncObserver = () => {
      observer?.disconnect();
      observer = null;
      if (!mqDesktop.matches) return;

      observer = new IntersectionObserver(
        (observed) => {
          for (const record of observed) {
            if (!record.isIntersecting) continue;
            const idx = Number(record.target.getAttribute("data-index"));
            if (!Number.isNaN(idx)) {
              setActiveIndex((prev) => (prev === idx ? prev : idx));
              break;
            }
          }
        },
        {
          rootMargin: "-32% 0px -48% 0px",
          threshold: 0,
        }
      );

      items.forEach((el) => observer?.observe(el));
    };

    syncObserver();
    mqDesktop.addEventListener("change", syncObserver);

    return () => {
      mqDesktop.removeEventListener("change", syncObserver);
      observer?.disconnect();
    };
  }, [entries.length]);

  const jumpToRole = (idx: number) => {
    const bounded = Math.max(0, Math.min(entries.length - 1, idx));
    setActiveIndex(bounded);
    itemRefs.current[bounded]?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "center",
    });
  };

  return (
    <section
      className="section-wrap section-block career-section"
      id="experience"
      tabIndex={-1}
      aria-labelledby="experience-heading"
    >
      <div className="section-head">
        <p className="section-cmd">
          <b>$</b> git log --career --follow
        </p>
        <h2 id="experience-heading" className="section-title">
          Career timeline
        </h2>
        <p className="section-lead">
          Scroll through the timeline to inspect each role&apos;s architecture,
          production impact, and systems ownership in the live terminal preview.
        </p>
        <div className="career-mobile-controls">
          <button
            type="button"
            className="career-step-btn"
            onClick={toggleExpandAll}
          >
            {allExpanded ? "Collapse all highlights" : "Expand all highlights"}
          </button>
        </div>
      </div>

      <div className="career-layout">
        {activeEntry && (
          <aside className="career-preview-wrap" aria-label="Active role live preview">
            <div className="career-preview-panel">
              <div className="career-preview-bar">
                <span className="career-preview-cmd">
                  $ git show role-0{activeIndex + 1}
                </span>
                <div className="career-preview-controls">
                  <span className="career-preview-counter">
                    0{activeIndex + 1} / 0{entries.length}
                  </span>
                  <button
                    type="button"
                    className="career-step-btn"
                    onClick={() => jumpToRole(activeIndex - 1)}
                    disabled={activeIndex === 0}
                    aria-label="Previous role in timeline"
                  >
                    prev
                  </button>
                  <button
                    type="button"
                    className="career-step-btn"
                    onClick={() => jumpToRole(activeIndex + 1)}
                    disabled={activeIndex === entries.length - 1}
                    aria-label="Next role in timeline"
                  >
                    next
                  </button>
                </div>
              </div>

              <div className="preview-stage-body">
                <div className="preview-role-top">
                  <h3 className="preview-role-title">{activeEntry.role}</h3>
                  <span className="preview-role-date">
                    {isActiveCurrent && (
                      <span className="timeline-current-pill">Active</span>
                    )}
                    <span>{activeEntry.date}</span>
                  </span>
                </div>

                <p className="preview-org-line">
                  {activeEntry.companyUrl ? (
                    <a
                      href={activeEntry.companyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="timeline-company-link"
                    >
                      <span>{activeEntry.company}</span>
                      <ArrowOutwardIcon width={14} height={14} />
                    </a>
                  ) : (
                    <span>{activeEntry.company}</span>
                  )}
                  <span className="timeline-sep" aria-hidden="true">
                    {" "}
                    |{" "}
                  </span>
                  <span>{activeEntry.location}</span>
                </p>

                <p className="preview-summary">{activeEntry.blurb}</p>

                {activeEntry.bullets.length > 0 && (
                  <div className="preview-bullets-wrap">
                    <span className="preview-section-label">
                      # engineering highlights
                    </span>
                    <ul className="timeline-bullets">
                      {activeEntry.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </aside>
        )}

        <ol className="timeline-list">
          {entries.map((entry, index) => {
            const isCurrent = entry.date.toLowerCase().includes("present");
            const isSelected = index === activeIndex;

            return (
              <li
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                data-index={index}
                className={`timeline-item ${isCurrent ? "is-current" : ""} ${
                  isSelected ? "is-selected" : ""
                }`.trim()}
                key={`${entry.company}-${entry.role}-${entry.date}`}
              >
                <div className="timeline-marker" aria-hidden="true" />
                <article className="timeline-card">
                  <div className="timeline-head">
                    <div>
                      <h3 className="timeline-role">{entry.role}</h3>
                      <p className="timeline-org">
                        {entry.companyUrl ? (
                          <a
                            href={entry.companyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="timeline-company-link"
                          >
                            <span>{entry.company}</span>
                            <ArrowOutwardIcon width={14} height={14} />
                          </a>
                        ) : (
                          <span>{entry.company}</span>
                        )}
                        <span className="timeline-sep" aria-hidden="true">
                          {" "}
                          |{" "}
                        </span>
                        <span>{entry.location}</span>
                      </p>
                    </div>

                    <span className="timeline-date">
                      {isCurrent && (
                        <span className="timeline-current-pill">Active</span>
                      )}
                      <span>{entry.date}</span>
                    </span>
                  </div>

                  <p className="timeline-blurb">{entry.blurb}</p>

                  <div className="timeline-card-actions">
                    <button
                      type="button"
                      className={`timeline-inspect-btn ${
                        isSelected ? "is-active" : ""
                      }`.trim()}
                      onClick={() => setActiveIndex(index)}
                      aria-pressed={isSelected}
                    >
                      {isSelected ? "Focused in preview" : "Inspect in preview"}
                    </button>
                  </div>

                  {entry.bullets.length > 0 && (
                    <details
                      ref={(el) => {
                        detailRefs.current[index] = el;
                      }}
                      className="timeline-details"
                    >
                      <summary>Key engineering highlights</summary>
                      <ul className="timeline-bullets">
                        {entry.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    </details>
                  )}
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Career;
