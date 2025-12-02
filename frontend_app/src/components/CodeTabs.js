import { useState } from "react";
import { copyToClipboard, simpleHighlight } from "../utils";

/**
 * PUBLIC_INTERFACE
 * CodeTabs
 * Tabs to switch between JSX and HTML code with copy buttons.
 */
export default function CodeTabs({ jsx = "", html = "" }) {
  const [tab, setTab] = useState('jsx');

  const active = (t) => t === tab ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 border-transparent';
  const code = tab === 'jsx' ? jsx : html;

  const onCopy = async () => {
    const ok = await copyToClipboard(code);
    // small feedback by changing button label briefly
    const btn = document.getElementById('copy-code-btn');
    if (btn) {
      const t = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => (btn.textContent = t), 1000);
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <div className="flex">
          <button onClick={() => setTab('jsx')} className={`px-4 py-2 text-sm border-b-2 ${active('jsx')}`}>JSX</button>
          <button onClick={() => setTab('html')} className={`px-4 py-2 text-sm border-b-2 ${active('html')}`}>HTML</button>
        </div>
        <button
          id="copy-code-btn"
          onClick={onCopy}
          className="m-2 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white shadow-soft transition-all focus:outline-none focus:ring-2 focus:ring-ocean/40"
          style={{ backgroundImage: 'linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a0 100%)' }}
        >
          Copy
        </button>
      </div>
      <pre className="p-4 overflow-auto text-sm leading-relaxed">
        <code dangerouslySetInnerHTML={{ __html: simpleHighlight(code) }} />
      </pre>
    </div>
  );
}
