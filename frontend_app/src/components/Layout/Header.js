import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import data from "../../data/components.json";

/**
 * PUBLIC_INTERFACE
 * Header
 * App header with brand, search input, theme toggle, and components mega menu.
 */
export default function Header({ theme, onToggleTheme }) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setQuery((new URLSearchParams(location.search)).get('q') || '');
  }, [location.search]); // keep in sync when navigating

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  const submit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (query) params.set('q', query);
    else params.delete('q');
    navigate({ pathname: '/', search: params.toString() });
  };

  const badge = useMemo(() => (theme === 'dark' ? '☀️ Light' : '🌙 Dark'), [theme]);

  // Build category -> components map for menu
  const categories = useMemo(() => {
    const map = {};
    for (const c of data.components) {
      if (!map[c.category]) map[c.category] = [];
      map[c.category].push({ id: c.id, name: c.name });
    }
    // sort by name for consistency
    Object.keys(map).forEach((k) => map[k].sort((a, b) => a.name.localeCompare(b.name)));
    return map;
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-gray-900/40 bg-white/70 dark:bg-gray-900/60 border-b border-white/30 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-3">
          {/* Brand mark uses the main gradient */}
          <div className="h-9 w-9 rounded-lg ring-1 ring-black/5 shadow-soft" style={{ backgroundImage: 'linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a0 100%)' }} />
          <div className="font-extrabold text-lg tracking-tight text-gray-900 dark:text-white">Ocean UI</div>
        </Link>

        {/* Components menu - desktop */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="px-3 py-2 text-sm rounded-lg bg-white/60 dark:bg-gray-900/60 ring-1 ring-black/5 hover:bg-white/80 dark:hover:bg-gray-900/80"
            aria-haspopup="true"
            aria-expanded={menuOpen}
          >
            Components
          </button>
          <div
            className={`absolute left-0 mt-2 w-[720px] max-w-[90vw] p-4 rounded-xl bg-white/90 dark:bg-gray-900/90 ring-1 ring-black/5 shadow-soft transition origin-top-left ${menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[320px] overflow-auto pr-1">
              {Object.entries(categories).map(([cat, items]) => (
                <div key={cat}>
                  <div className="text-xs font-semibold text-gray-700 dark:text-gray-200 mb-2">{cat}</div>
                  <ul className="space-y-1">
                    {items.map((c) => (
                      <li key={c.id}>
                        <Link
                          to={`/components/${c.id}`}
                          className="block text-sm px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">Tip: Use ⌘K / Ctrl+K to open the command palette demo.</div>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden ml-auto inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm text-white shadow-soft"
          style={{ backgroundImage: 'linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a0 100%)' }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
        >
          Menu
        </button>

        {/* Search */}
        <form onSubmit={submit} className="hidden md:block ml-auto flex-1 max-w-xl">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search components (name, category, tags)…"
              className="input pl-10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xs ring-1 ring-black/5 focus:ring-2 focus:ring-ocean/40"
              aria-label="Search components"
            />
            <span className="pointer-events-none absolute left-3 top-2.5 text-gray-400">⌘K</span>
          </div>
        </form>

        <button
          onClick={onToggleTheme}
          className="hidden md:inline-flex whitespace-nowrap items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white shadow-soft transition-all focus:outline-none focus:ring-2 focus:ring-ocean/40"
          style={{ backgroundImage: 'linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a0 100%)' }}
          aria-label="Toggle dark/light theme"
          title="Toggle dark/light theme"
        >
          {badge}
        </button>
      </div>

      {/* Mobile drawer */}
      <div id="mobile-nav" className={`md:hidden ${mobileOpen ? "block" : "hidden"}`}>
        <div className="px-4 pb-4 space-y-3">
          <form onSubmit={submit}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search components…"
              className="input w-full"
              aria-label="Search components"
            />
          </form>
          <div className="card p-3">
            <div className="text-xs font-semibold text-gray-700 dark:text-gray-200 mb-2">Components</div>
            <div className="max-h-64 overflow-auto space-y-3">
              {Object.entries(categories).map(([cat, items]) => (
                <div key={cat}>
                  <div className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">{cat}</div>
                  <ul className="grid grid-cols-2 gap-1">
                    {items.map((c) => (
                      <li key={c.id} className="">
                        <Link to={`/components/${c.id}`} className="block text-sm px-2 py-1 rounded bg-white/60 dark:bg-gray-900/60 ring-1 ring-black/5">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={onToggleTheme}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white shadow-soft"
            style={{ backgroundImage: 'linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a0 100%)' }}
          >
            {badge}
          </button>
        </div>
      </div>
    </header>
  );
}
