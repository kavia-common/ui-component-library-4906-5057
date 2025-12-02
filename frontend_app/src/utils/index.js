/**
 * PUBLIC_INTERFACE
 * readThemePreference
 * Retrieves the user's theme preference from localStorage or system preference.
 */
export function readThemePreference() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {}
  // system preference
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

/**
 * PUBLIC_INTERFACE
 * saveThemePreference
 * Saves theme preference to localStorage (best-effort).
 */
export function saveThemePreference(theme) {
  try {
    localStorage.setItem('theme', theme);
  } catch {}
}

/**
 * PUBLIC_INTERFACE
 * copyToClipboard
 * Attempts to copy a string to the clipboard with graceful fallback.
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {}
  try {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}

/**
 * PUBLIC_INTERFACE
 * simpleHighlight
 * Very lightweight code highlighter for JSX/HTML keywords (avoid heavy deps).
 */
export function simpleHighlight(code) {
  const esc = code
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
  return esc
    .replace(/(className|class|const|let|return|function)/g, '<span class="text-blue-600 dark:text-blue-400 font-medium">$1</span>')
    .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<span class="text-emerald-600 dark:text-emerald-400">$1</span>');
}
