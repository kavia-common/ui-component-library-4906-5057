import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Header
 * App header with brand, search input, and theme toggle.
 */
export default function Header({ theme, onToggleTheme }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [location.search]); // keep in sync when navigating

  const submit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (query) params.set('q', query);
    else params.delete('q');
    navigate({ pathname: '/', search: params.toString() });
  };

  const badge = useMemo(() => (theme === 'dark' ? '☀️ Light' : '🌙 Dark'), [theme]);

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-gray-900/40 bg-white/70 dark:bg-gray-900/60 border-b border-white/30 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-3">
          {/* Brand mark uses the main gradient */}
          <div className="h-9 w-9 rounded-lg ring-1 ring-black/5 shadow-soft" style={{ backgroundImage: 'linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a0 100%)' }} />
          <div className="font-extrabold text-lg tracking-tight text-gray-900 dark:text-white">Ocean UI</div>
        </Link>

        <form onSubmit={submit} className="ml-auto flex-1 max-w-xl">
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
          className="whitespace-nowrap inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white shadow-soft transition-all focus:outline-none focus:ring-2 focus:ring-ocean/40"
          style={{ backgroundImage: 'linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a0 100%)' }}
          aria-label="Toggle dark/light theme"
          title="Toggle dark/light theme"
        >
          {badge}
        </button>
      </div>
    </header>
  );
}
