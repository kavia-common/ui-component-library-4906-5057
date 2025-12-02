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

  return (
    <>
      <button
        className="md:hidden btn w-full mx-4 my-3"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="sidebar"
      >
        {open ? "Hide Filters" : "Show Filters"}
      </button>
      <aside
        id="sidebar"
        className={`card p-4 md:p-6 md:sticky md:top-[72px] md:h-[calc(100vh-88px)] overflow-auto mx-4 md:mx-0 ${open ? '' : 'hidden md:block'}`}
        aria-label="Sidebar filters"
      >
        <div>
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Categories</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {['All', ...categories].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                  activeCat === c
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:border-blue-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Tags</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => {
              const active = activeTags.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => toggleTag(t)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                    active
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:border-amber-400'
                  }`}
                >
                  #{t}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
