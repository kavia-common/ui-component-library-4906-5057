import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Layout/Header";
import Home from "./pages/Home";
import ComponentDetail from "./pages/ComponentDetail";
import { useEffect, useState } from "react";
import { readThemePreference, saveThemePreference } from "./utils";
import "./styles/tailwind.css";

/**
 * PUBLIC_INTERFACE
 * App
 * Root component setting up routes, theme, and base layout.
 */
export default function App() {
  const [theme, setTheme] = useState(readThemePreference());

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    saveThemePreference(theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <BrowserRouter>
      {/* App shell background as requested */}
      <div className="min-h-screen bg-ocean-gradient">
        {/* Layer subtle noise/glass via container to enhance readability */}
        <div className="min-h-screen">
          <Header theme={theme} onToggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/components/:id" element={<ComponentDetail />} />
          </Routes>
          <footer className="mt-10 border-t border-white/30 dark:border-white/10 backdrop-blur-sm bg-white/40 dark:bg-gray-900/40">
            <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-gray-700 dark:text-gray-300">
              <div>Ocean UI Components • Tailwind + React • Dark/Light mode</div>
            </div>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}
