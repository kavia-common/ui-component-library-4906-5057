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
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500/80 to-amber-400/80"></div>
          <div className="font-bold text-lg">Ocean UI</div>
        </Link>

        <form onSubmit={submit} className="ml-auto flex-1 max-w-xl">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search components (name, category, tags)…"
              className="input pl-10"
              aria-label="Search components"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">⌘K</span>
          </div>
        </form>

        <button
          onClick={onToggleTheme}
          className="btn whitespace-nowrap"
          aria-label="Toggle dark/light theme"
          title="Toggle dark/light theme"
        >
          {badge}
        </button>
      </div>
    </header>
  );
}
