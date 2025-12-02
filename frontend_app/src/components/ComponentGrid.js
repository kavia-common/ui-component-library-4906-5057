import ComponentCard from "./ComponentCard";

/**
 * PUBLIC_INTERFACE
 * ComponentGrid
 * Responsive grid of components with helpful empty state and skeletons.
 */
export default function ComponentGrid({ items, loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card p-4 animate-pulse">
            <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="mt-1 h-3 w-1/4 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="mt-4 h-24 bg-gray-100 dark:bg-gray-800 rounded" />
            <div className="mt-4 flex gap-2">
              <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!items?.length) {
    return (
      <div className="card p-8 text-center">
        <div className="text-3xl">🔍</div>
        <h3 className="mt-2 font-semibold">No components found</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Try adjusting your search, category, or tag filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {items.map((item) => (
        <ComponentCard key={item.id} item={item} />
      ))}
    </div>
  );
}
