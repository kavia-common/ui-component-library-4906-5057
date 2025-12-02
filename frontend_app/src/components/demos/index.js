import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * This file exports small interactive demo components for use in cards and detail previews.
 * Keep these light and dependency-free. They embrace the Ocean gradients and dark mode.
 * Accessibility: All interactive widgets include basic ARIA, keyboard, and focus handling.
 */

// Gradient style helper
const gradientStyle = {
  backgroundImage: "linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a0 100%)",
};

// Utility: trap focus within a container (used by Modal/Command)
function useFocusTrap(active, containerRef, firstFocusRef) {
  useEffect(() => {
    if (!active) return;

    const focusable = () => {
      if (!containerRef.current) return [];
      const sel = [
        "a[href]",
        "button:not([disabled])",
        "textarea",
        "input",
        "[tabindex]:not([tabindex='-1'])",
        "select",
      ].join(",");
      return Array.from(containerRef.current.querySelectorAll(sel));
    };

    const onKeyDown = (e) => {
      if (e.key !== "Tab") return;
      const nodes = focusable();
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const prevActive = document.activeElement;
    const toFocus = firstFocusRef?.current || focusable()[0];
    setTimeout(() => toFocus?.focus(), 0);

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (prevActive && prevActive.focus) prevActive.focus();
    };
  }, [active, containerRef, firstFocusRef]);
}

// PUBLIC_INTERFACE
export function DemoPrimaryButton() {
  // Simple CTA with a click feedback and aria-live status
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (!clicked) return;
    const t = setTimeout(() => setClicked(false), 800);
    return () => clearTimeout(t);
  }, [clicked]);
  return (
    <div>
      <button
        onClick={() => setClicked(true)}
        className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold text-white shadow-soft transition-all focus:outline-none focus:ring-2 focus:ring-ocean/40"
        style={gradientStyle}
        aria-describedby="primary-btn-status"
      >
        Get Started
      </button>
      <span id="primary-btn-status" className="sr-only" aria-live="polite">
        {clicked ? "Button clicked" : ""}
      </span>
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoStatsCard() {
  const [value, setValue] = useState(12451);
  const bump = () => setValue((v) => v + Math.floor(Math.random() * 10));
  return (
    <div className="rounded-xl p-4 bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 shadow-soft">
      <div className="text-sm text-gray-500 dark:text-gray-400">Active Users</div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-2xl font-bold text-gray-900 dark:text-white" aria-live="polite">
          {value.toLocaleString()}
        </div>
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">
          +{(Math.random() * 5).toFixed(1)}%
        </span>
      </div>
      <button
        onClick={bump}
        className="mt-3 px-3 py-1.5 rounded-lg bg-white/60 dark:bg-gray-900/60 text-sm ring-1 ring-black/5"
        aria-label="Refresh value"
      >
        Refresh
      </button>
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoFloatingLabelInput() {
  // Floating label input with basic validation
  const [val, setVal] = useState("");
  const [touched, setTouched] = useState(false);
  const isEmail = val.includes("@");
  return (
    <div className="relative">
      <input
        id="demo-email"
        placeholder=" "
        className={`peer input placeholder-transparent ${touched && !isEmail ? "ring-2 ring-red-500/60" : ""}`}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={() => setTouched(true)}
        aria-describedby="demo-email-help"
        aria-invalid={touched && !isEmail}
        type="email"
      />
      <label
        htmlFor="demo-email"
        className="absolute left-3 -top-2.5 bg-white dark:bg-gray-900 px-1 text-xs text-gray-500 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-gray-500 transition-all"
      >
        Email
      </label>
      {touched && !isEmail && (
        <div id="demo-email-help" className="mt-1 text-xs text-red-600 dark:text-red-400">
          Please enter a valid email.
        </div>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoTabs() {
  // Tabs with roving tabindex and ARIA roles
  const tabs = ["Overview", "Details", "Reviews"];
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % tabs.length);
      tabRefs.current[(activeIndex + 1) % tabs.length]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + tabs.length) % tabs.length);
      tabRefs.current[(activeIndex - 1 + tabs.length) % tabs.length]?.focus();
    }
  };

  return (
    <div className="p-3 rounded-xl bg-white/70 dark:bg-gray-900/70 ring-1 ring-black/5">
      <div
        className="inline-flex rounded-lg ring-1 ring-black/5 overflow-hidden"
        role="tablist"
        aria-label="Demo tabs"
        onKeyDown={onKeyDown}
      >
        {tabs.map((t, i) => (
          <button
            key={t}
            ref={(el) => (tabRefs.current[i] = el)}
            role="tab"
            aria-selected={activeIndex === i}
            aria-controls={`panel-${i}`}
            id={`tab-${i}`}
            tabIndex={activeIndex === i ? 0 : -1}
            className={`px-3 py-1.5 transition ${activeIndex === i ? "text-white" : "bg-white/60 dark:bg-gray-900/60"}`}
            style={activeIndex === i ? gradientStyle : {}}
            onClick={() => setActiveIndex(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <div
        id={`panel-${activeIndex}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeIndex}`}
        className="mt-3 text-sm text-gray-600 dark:text-gray-300"
      >
        {activeIndex === 0 && "Summary content..."}
        {activeIndex === 1 && "Detailed specs go here..."}
        {activeIndex === 2 && "User feedback and ratings."}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoStepper() {
  const steps = ["Cart", "Shipping", "Payment"];
  const [idx, setIdx] = useState(0);
  return (
    <div className="flex flex-col gap-3">
      <ol className="flex items-center gap-3 p-4 rounded-xl bg-white/70 dark:bg-gray-900/70 ring-1 ring-black/5 text-sm" aria-label="Progress">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <li className="inline-flex items-center gap-2" aria-current={i === idx ? "step" : undefined}>
              <span
                className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                  i <= idx ? "text-white" : "bg-white/60 dark:bg-gray-900/60 text-gray-700 dark:text-gray-200"
                }`}
                style={i <= idx ? gradientStyle : {}}
              >
                {i + 1}
              </span>
              {s}
            </li>
            {i !== steps.length - 1 && <li aria-hidden="true">—</li>}
          </React.Fragment>
        ))}
      </ol>
      <div className="flex gap-2">
        <button
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          className="px-3 py-1.5 rounded-lg bg-white/60 dark:bg-gray-900/60 ring-1 ring-black/5 text-sm"
        >
          Back
        </button>
        <button
          onClick={() => setIdx((i) => Math.min(steps.length - 1, i + 1))}
          className="btn text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoPagination() {
  const [page, setPage] = useState(1);
  const pages = [1, 2, 3];
  return (
    <nav
      className="inline-flex items-center gap-2 p-2 rounded-xl bg-white/70 dark:bg-gray-900/70 ring-1 ring-black/5"
      role="navigation"
      aria-label="Pagination"
    >
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className="px-3 py-1 rounded bg-white/60 dark:bg-gray-900/60 disabled:opacity-50"
        aria-label="Previous page"
      >
        Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-3 py-1 rounded ${page === p ? "text-white" : "bg-white/60 dark:bg-gray-900/60"}`}
          style={page === p ? gradientStyle : {}}
          aria-current={page === p ? "page" : undefined}
        >
          {p}
        </button>
      ))}
      <button
        disabled={page === pages.length}
        onClick={() => setPage((p) => Math.min(pages.length, p + 1))}
        className="px-3 py-1 rounded bg-white/60 dark:bg-gray-900/60 disabled:opacity-50"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}

// PUBLIC_INTERFACE
export function DemoCarousel() {
  // Carousel with next/prev buttons, keyboard arrow support, and basic swipe
  const items = ["One", "Two", "Three", "Four"];
  const [idx, setIdx] = useState(0);
  const containerRef = useRef(null);
  const touch = useRef({ startX: 0, endX: 0 });

  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);
  const next = () => setIdx((i) => (i + 1) % items.length);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  const onTouchStart = (e) => {
    touch.current.startX = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    touch.current.endX = e.changedTouches[0].clientX;
    const delta = touch.current.endX - touch.current.startX;
    if (Math.abs(delta) > 30) {
      if (delta > 0) prev();
      else next();
    }
  };

  return (
    <div
      className="p-3 rounded-xl bg-white/70 dark:bg-gray-900/70 ring-1 ring-black/5"
      role="region"
      aria-roledescription="carousel"
      aria-label="Demo carousel"
      onKeyDown={onKeyDown}
    >
      <div
        ref={containerRef}
        tabIndex={0}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="h-24 rounded-xl bg-white/80 dark:bg-gray-900/80 ring-1 ring-black/5 flex items-center justify-center text-sm outline-none"
        aria-live="polite"
      >
        Slide {idx + 1}: {items[idx]}
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={prev} className="px-3 py-1.5 rounded-lg bg-white/60 dark:bg-gray-900/60 ring-1 ring-black/5 text-sm" aria-label="Previous slide">
          Prev
        </button>
        <button onClick={next} className="btn text-sm" aria-label="Next slide">
          Next
        </button>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoDropdown() {
  // Dropdown with ARIA and keyboard navigation
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!open) return;
      if (!menuRef.current || !btnRef.current) return;
      if (!menuRef.current.contains(e.target) && !btnRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const onKeyDown = (e) => {
    if (!open) return;
    const items = menuRef.current?.querySelectorAll("a,button,[tabindex]:not([tabindex='-1'])") || [];
    if (e.key === "Escape") {
      setOpen(false);
      btnRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      (items[0] || btnRef.current)?.focus();
    }
  };

  return (
    <div className="relative inline-block" onKeyDown={onKeyDown}>
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="btn"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="demo-dropdown-menu"
      >
        Menu
      </button>
      <div
        id="demo-dropdown-menu"
        ref={menuRef}
        className={`absolute mt-2 right-0 w-44 p-2 rounded-lg bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 shadow-soft transition transform origin-top-right ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
        role="menu"
      >
        <button className="block w-full text-left px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-800" role="menuitem" tabIndex={open ? 0 : -1}>
          Item A
        </button>
        <button className="block w-full text-left px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-800" role="menuitem" tabIndex={open ? 0 : -1}>
          Item B
        </button>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoTooltip() {
  const [show, setShow] = useState(false);
  const btnRef = useRef(null);
  return (
    <div className="inline-block relative">
      <button
        ref={btnRef}
        className="px-3 py-2 rounded-lg bg-white/60 dark:bg-gray-900/60 ring-1 ring-black/5"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        aria-describedby="demo-tooltip"
      >
        Hover or focus me
      </button>
      <div
        id="demo-tooltip"
        role="tooltip"
        className={`absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-gray-900 text-white text-xs transition ${
          show ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        Tooltip text
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoModal() {
  // Modal with ESC to close, focus trap, and aria-modal
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const firstBtnRef = useRef(null);

  useFocusTrap(open, panelRef, firstBtnRef);

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <div>
      <button onClick={() => setOpen(true)} className="btn">
        Open Modal
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Demo modal">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div
            ref={panelRef}
            className="relative z-10 p-6 rounded-xl bg-white/90 dark:bg-gray-900/90 ring-1 ring-black/5 shadow-soft w-[min(90vw,420px)]"
          >
            <h4 className="font-semibold">Modal title</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">This is a modal preview.</p>
            <div className="mt-3 flex justify-end gap-2">
              <button
                ref={firstBtnRef}
                className="px-3 py-2 rounded-lg bg-white/60 dark:bg-gray-900/60 ring-1 ring-black/5"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button className="btn" onClick={() => setOpen(false)}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoAccordion() {
  // Accordion with ARIA attributes
  const [open, setOpen] = useState({ one: true, two: false });
  return (
    <div className="space-y-2">
      <section className="p-3 rounded-xl bg-white/70 dark:bg-gray-900/70 ring-1 ring-black/5">
        <button
          className="w-full flex items-center justify-between font-medium"
          onClick={() => setOpen((s) => ({ ...s, one: !s.one }))}
          aria-expanded={open.one}
          aria-controls="acc-panel-1"
          id="acc-btn-1"
        >
          <span>Section 1</span>
          <span className="text-xs text-gray-500">{open.one ? "−" : "+"}</span>
        </button>
        <div
          id="acc-panel-1"
          role="region"
          aria-labelledby="acc-btn-1"
          className={`${open.one ? "block" : "hidden"} mt-2 text-sm text-gray-600 dark:text-gray-300`}
        >
          Content
        </div>
      </section>
      <section className="p-3 rounded-xl bg-white/70 dark:bg-gray-900/70 ring-1 ring-black/5">
        <button
          className="w-full flex items-center justify-between font-medium"
          onClick={() => setOpen((s) => ({ ...s, two: !s.two }))}
          aria-expanded={open.two}
          aria-controls="acc-panel-2"
          id="acc-btn-2"
        >
          <span>Section 2</span>
          <span className="text-xs text-gray-500">{open.two ? "−" : "+"}</span>
        </button>
        <div
          id="acc-panel-2"
          role="region"
          aria-labelledby="acc-btn-2"
          className={`${open.two ? "block" : "hidden"} mt-2 text-sm text-gray-600 dark:text-gray-300`}
        >
          More content
        </div>
      </section>
    </div>
  );
}

// Toast queue manager (very lightweight)
const useToastQueue = () => {
  const [queue, setQueue] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (active || queue.length === 0) return;
    const next = queue[0];
    setActive(next);
    const t = setTimeout(() => {
      setActive(null);
      setQueue((q) => q.slice(1));
    }, 1500);
    return () => clearTimeout(t);
  }, [queue, active]);

  const push = (msg) => setQueue((q) => [...q, { id: Date.now(), msg }]);

  return { push, active };
};

// PUBLIC_INTERFACE
export function DemoToast() {
  const { push, active } = useToastQueue();

  return (
    <div className="relative">
      <div className="flex gap-2">
        <button onClick={() => push("Saved successfully")} className="btn">
          Show Toast
        </button>
        <button onClick={() => push("Profile updated")} className="btn">
          Queue Another
        </button>
      </div>
      <div
        className={`fixed bottom-6 right-6 px-3 py-2 rounded-xl bg-white/80 dark:bg-gray-900/80 ring-1 ring-black/5 shadow-soft text-sm transition ${
          active ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        role="status"
        aria-live="polite"
      >
        {active?.msg}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoCommandPalette() {
  // Command palette with keyboard toggle, focus trap, and ESC close
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  useFocusTrap(open, panelRef, inputRef);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div>
      <div className="text-sm text-gray-600 dark:text-gray-300">Press ⌘K / Ctrl+K to open</div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]" role="dialog" aria-modal="true" aria-label="Command palette">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div ref={panelRef} className="relative z-10 w-[min(90vw,560px)] p-4 rounded-xl bg-white/80 dark:bg-gray-900/80 ring-1 ring-black/5 shadow-soft">
            <div className="text-sm text-gray-500">Run a command</div>
            <input ref={inputRef} className="input mt-2" placeholder="Type..." aria-label="Command input" />
            <div className="mt-3 flex justify-end">
              <button
                className="px-3 py-1.5 rounded-lg bg-white/60 dark:bg-gray-900/60 ring-1 ring-black/5 text-sm"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoDataTable() {
  // Data table with search, sort, and pagination (client-side)
  const [q, setQ] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const rows = useMemo(
    () => [
      { name: "Alex", role: "Engineer" },
      { name: "Taylor", role: "Designer" },
      { name: "Riley", role: "PM" },
      { name: "Sam", role: "Engineer" },
      { name: "Chris", role: "Support" },
      { name: "Jamie", role: "Engineer" },
    ],
    []
  );

  const filtered = rows
    .filter(
      (r) =>
        r.name.toLowerCase().includes(q.toLowerCase()) ||
        r.role.toLowerCase().includes(q.toLowerCase())
    )
    .sort((a, b) => (sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    // Reset to first page when search changes
    setPage(1);
  }, [q]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <input
          className="input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name or role..."
          aria-label="Search table"
        />
        <button
          className="px-3 py-2 rounded-lg bg-white/60 dark:bg-gray-900/60 ring-1 ring-black/5 text-sm"
          onClick={() => setSortAsc((s) => !s)}
          aria-label="Toggle sort order"
        >
          Sort: {sortAsc ? "A→Z" : "Z→A"}
        </button>
      </div>
      <div className="overflow-auto rounded-xl ring-1 ring-black/5">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="text-left p-2">
                <button
                  className="inline-flex items-center gap-1"
                  onClick={() => setSortAsc((s) => !s)}
                  aria-label="Sort by name"
                >
                  Name {sortAsc ? "▲" : "▼"}
                </button>
              </th>
              <th className="text-left p-2">Role</th>
            </tr>
          </thead>
          <tbody className="bg-white/70 dark:bg-gray-900/70">
            {current.map((r) => (
              <tr key={`${r.name}-${r.role}`}>
                <td className="p-2">{r.name}</td>
                <td className="p-2">{r.role}</td>
              </tr>
            ))}
            {!current.length && (
              <tr>
                <td className="p-2 text-gray-500 dark:text-gray-400" colSpan={2}>
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <nav className="inline-flex items-center gap-2" aria-label="Table pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 rounded bg-white/60 dark:bg-gray-900/60 disabled:opacity-50"
          aria-label="Previous page"
        >
          Prev
        </button>
        <span className="text-sm">
          Page <strong>{page}</strong> of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="px-3 py-1 rounded bg-white/60 dark:bg-gray-900/60 disabled:opacity-50"
          aria-label="Next page"
        >
          Next
        </button>
      </nav>
    </div>
  );
}

// PUBLIC_INTERFACE
export function getDemoForComponentId(id) {
  // Map data id -> demo element
  switch (id) {
    case "button-primary":
      return <DemoPrimaryButton />;
    case "card-stats":
      return <DemoStatsCard />;
    case "input-floating-label":
      return <DemoFloatingLabelInput />;

    case "nav-tabs":
      return <DemoTabs />;
    case "nav-stepper":
      return <DemoStepper />;
    case "nav-pagination":
      return <DemoPagination />;

    case "int-carousel":
      return <DemoCarousel />;
    case "ui-dropdown":
      return <DemoDropdown />;
    case "ui-tooltip":
      return <DemoTooltip />;
    case "ui-modal":
      return <DemoModal />;
    case "int-accordion":
      return <DemoAccordion />;
    case "ui-toast":
    case "int-toast":
      return <DemoToast />;
    case "data-data-table":
    case "data-table":
      return <DemoDataTable />;

    case "layout-command-palette":
    case "int-command-palette":
      return <DemoCommandPalette />;

    default:
      return null;
  }
}
