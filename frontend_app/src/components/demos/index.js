import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * This file exports small interactive demo components for use in cards and detail previews.
 * Keep these light and dependency-free. They embrace the Ocean gradients and dark mode.
 */

// Gradient style helper
const gradientStyle = {
  backgroundImage: 'linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a0 100%)',
};

// PUBLIC_INTERFACE
export function DemoPrimaryButton() {
  /** Simple CTA with a click feedback */
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (!clicked) return;
    const t = setTimeout(() => setClicked(false), 800);
    return () => clearTimeout(t);
  }, [clicked]);
  return (
    <button
      onClick={() => setClicked(true)}
      className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold text-white shadow-soft transition-all focus:outline-none focus:ring-2 focus:ring-ocean/40"
      style={gradientStyle}
      aria-live="polite"
    >
      {clicked ? "Clicked!" : "Get Started"}
    </button>
  );
}

// PUBLIC_INTERFACE
export function DemoStatsCard() {
  /** Animated value tick using a small state change */
  const [value, setValue] = useState(12451);
  const bump = () => setValue((v) => v + Math.floor(Math.random() * 10));
  return (
    <div className="rounded-xl p-4 bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 shadow-soft">
      <div className="text-sm text-gray-500 dark:text-gray-400">Active Users</div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</div>
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">+{(Math.random() * 5).toFixed(1)}%</span>
      </div>
      <button onClick={bump} className="mt-3 px-3 py-1.5 rounded-lg bg-white/60 dark:bg-gray-900/60 text-sm ring-1 ring-black/5">Refresh</button>
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoFloatingLabelInput() {
  /** Floating label input with basic validation */
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
        type="email"
      />
      <label
        htmlFor="demo-email"
        className="absolute left-3 -top-2.5 bg-white dark:bg-gray-900 px-1 text-xs text-gray-500 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-gray-500 transition-all"
      >
        Email
      </label>
      {touched && !isEmail && (
        <div id="demo-email-help" className="mt-1 text-xs text-red-600 dark:text-red-400">Please enter a valid email.</div>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoTabs() {
  const tabs = ["Overview", "Details", "Reviews"];
  const [active, setActive] = useState(tabs[0]);
  return (
    <div className="p-3 rounded-xl bg-white/70 dark:bg-gray-900/70 ring-1 ring-black/5">
      <div className="inline-flex rounded-lg ring-1 ring-black/5 overflow-hidden">
        {tabs.map((t) => (
          <button
            key={t}
            className={`px-3 py-1.5 transition ${active === t ? "text-white" : "bg-white/60 dark:bg-gray-900/60"}`}
            style={active === t ? gradientStyle : {}}
            onClick={() => setActive(t)}
            aria-pressed={active === t}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        {active === "Overview" && "Summary content..."}
        {active === "Details" && "Detailed specs go here..."}
        {active === "Reviews" && "User feedback and ratings."}
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
      <ol className="flex items-center gap-3 p-4 rounded-xl bg-white/70 dark:bg-gray-900/70 ring-1 ring-black/5 text-sm">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <li className="inline-flex items-center gap-2">
              <span
                className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${i <= idx ? "text-white" : "bg-white/60 dark:bg-gray-900/60 text-gray-700 dark:text-gray-200"}`}
                style={i <= idx ? gradientStyle : {}}
              >
                {i + 1}
              </span>
              {s}
            </li>
            {i !== steps.length - 1 && <li>—</li>}
          </React.Fragment>
        ))}
      </ol>
      <div className="flex gap-2">
        <button onClick={() => setIdx((i) => Math.max(0, i - 1))} className="px-3 py-1.5 rounded-lg bg-white/60 dark:bg-gray-900/60 ring-1 ring-black/5 text-sm">Back</button>
        <button onClick={() => setIdx((i) => Math.min(steps.length - 1, i + 1))} className="btn text-sm">Next</button>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoPagination() {
  const [page, setPage] = useState(1);
  const pages = [1, 2, 3];
  return (
    <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-white/70 dark:bg-gray-900/70 ring-1 ring-black/5">
      <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 rounded bg-white/60 dark:bg-gray-900/60 disabled:opacity-50">Prev</button>
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
      <button disabled={page === pages.length} onClick={() => setPage((p) => Math.min(pages.length, p + 1))} className="px-3 py-1 rounded bg-white/60 dark:bg-gray-900/60 disabled:opacity-50">Next</button>
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoCarousel() {
  const items = ["One", "Two", "Three", "Four"];
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);
  const next = () => setIdx((i) => (i + 1) % items.length);
  return (
    <div className="p-3 rounded-xl bg-white/70 dark:bg-gray-900/70 ring-1 ring-black/5">
      <div className="h-24 rounded-xl bg-white/80 dark:bg-gray-900/80 ring-1 ring-black/5 flex items-center justify-center text-sm">
        Slide {idx + 1}: {items[idx]}
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={prev} className="px-3 py-1.5 rounded-lg bg-white/60 dark:bg-gray-900/60 ring-1 ring-black/5 text-sm">Prev</button>
        <button onClick={next} className="btn text-sm">Next</button>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoDropdown() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button onClick={() => setOpen((v) => !v)} className="btn">Menu</button>
      <div
        className={`absolute mt-2 right-0 w-44 p-2 rounded-lg bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 shadow-soft transition transform origin-top-right ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
        role="menu"
      >
        <a className="block px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-800" href="#a">Item A</a>
        <a className="block px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-800" href="#b">Item B</a>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoTooltip() {
  const [hover, setHover] = useState(false);
  return (
    <div className="inline-block relative">
      <button
        className="px-3 py-2 rounded-lg bg-white/60 dark:bg-gray-900/60 ring-1 ring-black/5"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Hover me
      </button>
      <div
        className={`absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-gray-900 text-white text-xs transition ${hover ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        role="tooltip"
      >
        Tooltip text
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoModal() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)} className="btn">Open Modal</button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative z-10 p-6 rounded-xl bg-white/90 dark:bg-gray-900/90 ring-1 ring-black/5 shadow-soft w-[min(90vw,420px)]">
            <h4 className="font-semibold">Modal title</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">This is a modal preview.</p>
            <div className="mt-3 flex justify-end gap-2">
              <button className="px-3 py-2 rounded-lg bg-white/60 dark:bg-gray-900/60 ring-1 ring-black/5" onClick={() => setOpen(false)}>Cancel</button>
              <button className="btn" onClick={() => setOpen(false)}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoAccordion() {
  const [open, setOpen] = useState({ one: true, two: false });
  return (
    <div className="space-y-2">
      <section className="p-3 rounded-xl bg-white/70 dark:bg-gray-900/70 ring-1 ring-black/5">
        <button className="w-full flex items-center justify-between font-medium" onClick={() => setOpen((s) => ({ ...s, one: !s.one }))}>
          <span>Section 1</span>
          <span className="text-xs text-gray-500">{open.one ? "−" : "+"}</span>
        </button>
        {open.one && <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Content</div>}
      </section>
      <section className="p-3 rounded-xl bg-white/70 dark:bg-gray-900/70 ring-1 ring-black/5">
        <button className="w-full flex items-center justify-between font-medium" onClick={() => setOpen((s) => ({ ...s, two: !s.two }))}>
          <span>Section 2</span>
          <span className="text-xs text-gray-500">{open.two ? "−" : "+"}</span>
        </button>
        {open.two && <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">More content</div>}
      </section>
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoToast() {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const trigger = () => {
    setMsg("Saved successfully");
    setShow(true);
    setTimeout(() => setShow(false), 1400);
  };
  return (
    <div className="relative">
      <button onClick={trigger} className="btn">Show Toast</button>
      <div className={`fixed bottom-6 right-6 px-3 py-2 rounded-xl bg-white/80 dark:bg-gray-900/80 ring-1 ring-black/5 shadow-soft text-sm transition ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {msg}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoCommandPalette() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);
  return (
    <div>
      <div className="text-sm text-gray-600 dark:text-gray-300">Press ⌘K / Ctrl+K to open</div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-[min(90vw,560px)] p-4 rounded-xl bg-white/80 dark:bg-gray-900/80 ring-1 ring-black/5 shadow-soft">
            <div className="text-sm text-gray-500">Run a command</div>
            <input ref={inputRef} className="input mt-2" placeholder="Type..." />
            <div className="mt-3 flex justify-end">
              <button className="px-3 py-1.5 rounded-lg bg-white/60 dark:bg-gray-900/60 ring-1 ring-black/5 text-sm" onClick={() => setOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
export function DemoDataTable() {
  const [q, setQ] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const rows = useMemo(() => ([
    { name: "Alex", role: "Engineer" },
    { name: "Taylor", role: "Designer" },
    { name: "Riley", role: "PM" },
    { name: "Sam", role: "Engineer" },
  ]), []);
  const filtered = rows
    .filter((r) => r.name.toLowerCase().includes(q.toLowerCase()) || r.role.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or role..." />
        <button className="px-3 py-2 rounded-lg bg-white/60 dark:bg-gray-900/60 ring-1 ring-black/5 text-sm" onClick={() => setSortAsc((s) => !s)}>
          Sort: {sortAsc ? "A→Z" : "Z→A"}
        </button>
      </div>
      <table className="w-full text-sm rounded-xl overflow-hidden ring-1 ring-black/5">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Role</th>
          </tr>
        </thead>
        <tbody className="bg-white/70 dark:bg-gray-900/70">
          {filtered.map((r) => (
            <tr key={r.name}>
              <td className="p-2">{r.name}</td>
              <td className="p-2">{r.role}</td>
            </tr>
          ))}
          {!filtered.length && (
            <tr>
              <td className="p-2 text-gray-500 dark:text-gray-400" colSpan={2}>No results</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// PUBLIC_INTERFACE
export function getDemoForComponentId(id) {
  /** Map data id -> demo element */
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
