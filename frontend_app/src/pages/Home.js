import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Layout/Sidebar";
import ComponentGrid from "../components/ComponentGrid";
import data from "../data/components.json";
import Fuse from "fuse.js";
import { useLocation } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Home
 * Displays sidebar filters and a responsive component grid.
 */
export default function Home() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const components = data.components;
  const categories = data.meta.categories;
  const tags = data.meta.tags;

  const filtered = useMemo(() => {
    setLoading(true);
    const params = new URLSearchParams(location.search);
    const q = (params.get('q') || '').trim();
    const category = params.get('category') || '';
    const selectedTags = (params.get('tags') || '').split(',').filter(Boolean);

    let list = components;
    if (category) {
      list = list.filter((c) => c.category.toLowerCase() === category.toLowerCase());
    }
    if (selectedTags.length) {
      list = list.filter((c) => selectedTags.every((t) => c.tags.includes(t)));
    }
    if (q) {
      const fuse = new Fuse(list, {
        keys: ['name', 'category', 'tags'],
        threshold: 0.4,
      });
      list = fuse.search(q).map((r) => r.item);
    }
    // simulate brief load for skeleton effect
    const t = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const items = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const q = (params.get('q') || '').trim();
    const category = params.get('category') || '';
    const selectedTags = (params.get('tags') || '').split(',').filter(Boolean);
    let list = components;
    if (category) list = list.filter((c) => c.category.toLowerCase() === category.toLowerCase());
    if (selectedTags.length) list = list.filter((c) => selectedTags.every((t) => c.tags.includes(t)));
    if (q) {
      const fuse = new Fuse(list, { keys: ['name', 'category', 'tags'], threshold: 0.4 });
      list = fuse.search(q).map((r) => r.item);
    }
    return list;
  }, [location.search, components]);

  useEffect(() => {
    // initial small loading
    const t = setTimeout(() => setLoading(false), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 grid md:grid-cols-[280px_1fr] gap-6">
      <Sidebar categories={categories} tags={tags} />
      <main>
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Browse Components</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Ocean Professional theme • {items.length} items</p>
        </div>
        <ComponentGrid items={items} loading={loading} />
      </main>
    </div>
  );
}
