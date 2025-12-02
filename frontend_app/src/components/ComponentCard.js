import { Link } from "react-router-dom";
import { copyToClipboard } from "../utils";

/**
 * PUBLIC_INTERFACE
 * ComponentCard
 * Displays a component preview and actions.
 */
export default function ComponentCard({ item }) {
  const onCopy = async (type) => {
    const ok = await copyToClipboard(item[type] || '');
    if (ok) {
      // basic toast-like feedback via title change
      const el = document.getElementById(`${item.id}-${type}-btn`);
      if (el) {
        const original = el.textContent;
        el.textContent = "Copied!";
        setTimeout(() => (el.textContent = original), 1000);
      }
    }
  };

  return (
    <div className="card p-4 transition-transform hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">{item.tags?.slice(0,3).map(t=>`#${t}`).join(' ')}</span>
      </div>

      <div className="mt-4 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 p-4 bg-gradient-to-br from-blue-500/5 to-gray-50 dark:from-blue-500/10 dark:to-gray-900/50">
        {/* Simple live preview for known components */}
        {item.id === 'button-primary' && (
          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-semibold shadow-soft transition-colors">
            Get Started
          </button>
        )}
        {item.id === 'card-stats' && (
          <div className="rounded-xl p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-soft">
            <div className="text-sm text-gray-500 dark:text-gray-400">Active Users</div>
            <div className="mt-2 flex items-baseline gap-2">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">12,451</div>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">+4.2%</span>
            </div>
          </div>
        )}
        {item.id === 'input-floating-label' && (
          <div className="relative">
            <input placeholder=" " className="peer input placeholder-transparent" />
            <label className="absolute left-3 -top-2.5 bg-white dark:bg-gray-900 px-1 text-xs text-gray-500 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-gray-500 transition-all">
              Email
            </label>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Link to={`/components/${item.id}`} className="btn">View</Link>
        <button id={`${item.id}-jsx-btn`} onClick={() => onCopy('jsx')} className="btn-secondary px-3 py-2 rounded-lg text-sm">Copy JSX</button>
        <button id={`${item.id}-html-btn`} onClick={() => onCopy('html')} className="px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition">
          Copy HTML
        </button>
      </div>
    </div>
  );
}
