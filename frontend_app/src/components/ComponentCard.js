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
    <div className="card p-5 transition-transform hover:-translate-y-0.5 hover:shadow-elevated">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">{item.tags?.slice(0,3).map(t=>`#${t}`).join(' ')}</span>
      </div>

      <div className="mt-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xs">
        {/* Simple live preview for known components */}
        {item.id === 'button-primary' && (
          <button className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold text-white shadow-soft transition-all focus:outline-none focus:ring-2 focus:ring-ocean/40" style={{ backgroundImage: 'linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a0 100%)' }}>
            Get Started
          </button>
        )}
        {item.id === 'card-stats' && (
          <div className="rounded-xl p-4 bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 shadow-soft">
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
        <Link to={`/components/${item.id}`} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white shadow-soft transition-all focus:outline-none focus:ring-2 focus:ring-ocean/40" style={{ backgroundImage: 'linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a0 100%)' }}>View</Link>
        <button id={`${item.id}-jsx-btn`} onClick={() => onCopy('jsx')} className="px-3 py-2 rounded-lg text-sm bg-amber-500 text-white hover:bg-amber-600 transition shadow-soft">Copy JSX</button>
        <button id={`${item.id}-html-btn`} onClick={() => onCopy('html')} className="px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition bg-white/60 dark:bg-gray-900/60">
          Copy HTML
        </button>
      </div>
    </div>
  );
}
