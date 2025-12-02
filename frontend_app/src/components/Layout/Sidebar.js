import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Sidebar
 * Displays filterable categories and tags sourced from JSON meta.
 */
export default function Sidebar({ categories = [], tags = [] }) {
  const location = useLocation();
  const navigate = useNavigate();

  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [open, setOpen] = useState(false);
  const activeCat = params.get('category') || 'All';
  const activeTags = (params.get('tags') || '').split(',').filter(Boolean);

  useEffect(() => {
    // close when path or search changes on mobile
    setOpen(false);
  }, [location.pathname, location.search]);

  const toggleTag = (tag) => {
    const next = new URLSearchParams(params.toString());
    let t = (next.get('tags') || '').split(',').filter(Boolean);
    if (t.includes(tag)) t = t.filter((x) => x !== tag);
    else t.push(tag);
    if (t.length) next.set('tags', t.join(','));
    else next.delete('tags');
    navigate({ pathname: '/', search: next.toString() });
  };

  const setCategory = (category) => {
    const next = new URLSearchParams(params.toString());
    if (category && category !== 'All') next.set('category', category);
    else next.delete('category');
    navigate({ pathname: '/', search: next.toString() });
  };

  // Collapsible sections state
  const [catsOpen, setCatsOpen] = useState(true);
  const [tagsOpen, setTagsOpen] = useState(true);

  return (
    <>
      {/* Mobile slide-over trigger */}
      <button
        className="md:hidden w-full mx-4 my-3 inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-white shadow-soft"
        style={{ backgroundImage: 'linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a0 100%)' }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="sidebar"
      >
        {open ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Sidebar container */}
      <aside
        id="sidebar"
        className={`md:sticky md:top-[72px] md:h-[calc(100vh-88px)] overflow-auto md:block ${
          open ? 'fixed inset-0 z-40 p-4' : 'hidden md:block'
        }`}
        aria-label="Sidebar filters"
      >
        {/* Slide-over backdrop for mobile */}
        <div className={`md:hidden fixed inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setOpen(false)} />

        {/* Panel */}
        <div className={`card p-4 md:p-6 relative md:static md:translate-x-0 transition-transform ${
          open ? 'translate-x-0' : 'md:translate-x-0 -translate-x-2'
        } backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 ring-1 ring-black/5`}>
          {/* Header row for mobile */}
          <div className="md:hidden flex items-center justify-between">
            <h2 className="font-semibold">Filters</h2>
            <button className="text-sm px-3 py-1 rounded-lg text-white" style={{ backgroundImage: 'linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a0 100%)' }} onClick={() => setOpen(false)}>
              Done
            </button>
          </div>

          {/* Categories */}
          <div className="mt-2">
            <button
              className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 dark:text-gray-200"
              onClick={() => setCatsOpen((v) => !v)}
              aria-expanded={catsOpen}
            >
              <span>Categories</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{catsOpen ? "−" : "+"}</span>
            </button>
            {catsOpen && (
              <div className="mt-3 space-y-2">
                {['All', ...categories].map((c) => {
                  const isActive = activeCat === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all ring-1 ring-black/5 ${
                        isActive
                          ? 'text-white shadow-soft'
                          : 'text-gray-700 dark:text-gray-200 bg-white/60 dark:bg-gray-900/60 hover:bg-white/80 dark:hover:bg-gray-900/80'
                      }`}
                      style={isActive ? { backgroundImage: 'linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a0 100%)' } : {}}
                    >
                      <span>{c}</span>
                      <span className={`ml-2 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                      }`}>{/* Count is visual hint; actual counts shown on Home header */}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="mt-6">
            <button
              className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 dark:text-gray-200"
              onClick={() => setTagsOpen((v) => !v)}
              aria-expanded={tagsOpen}
            >
              <span>Tags</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{tagsOpen ? "−" : "+"}</span>
            </button>
            {tagsOpen && (
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((t) => {
                  const active = activeTags.includes(t);
                  return (
                    <button
                      key={t}
                      onClick={() => toggleTag(t)}
                      className={`px-3 py-1.5 text-sm rounded-full transition-all ring-1 ring-black/5 ${
                        active
                          ? 'text-white shadow-soft'
                          : 'bg-white/60 dark:bg-gray-900/60 text-gray-700 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-gray-900/80'
                      }`}
                      style={active ? { backgroundImage: 'linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a0 100%)' } : {}}
                    >
                      #{t}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
