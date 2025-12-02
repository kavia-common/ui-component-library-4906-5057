import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "../data/components.json";
import CodeTabs from "../components/CodeTabs";
import { getDemoForComponentId } from "../components/demos";

/**
 * PUBLIC_INTERFACE
 * ComponentDetail
 * Shows a component's live preview, description, props, and code in tabs.
 */
export default function ComponentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const comp = useMemo(() => data.components.find((c) => c.id === id), [id]);

  if (!comp) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="card p-8 text-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-xs">
          <h2 className="font-semibold">Component not found</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">We couldn't locate the requested component.</p>
          <button
            className="mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white shadow-soft"
            style={{ backgroundImage: 'linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a0 100%)' }}
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const Demo = getDemoForComponentId(comp.id);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <button onClick={() => navigate(-1)} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">&larr; Back</button>

      <div className="mt-4 flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">{comp.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{comp.category} • {comp.tags?.map(t => `#${t}`).join(' ')}</p>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="font-semibold">Live Preview</h2>
          <div className="mt-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xs">
            {/* Render interactive demo if available; fallback to minimal static preview if none */}
            {Demo ? (
              Demo
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400">No interactive demo available for this component.</div>
            )}
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{comp.description}</p>
          {comp.props?.length ? (
            <div className="mt-4">
              <h3 className="text-sm font-semibold">Props</h3>
              <ul className="mt-2 space-y-1">
                {comp.props.map((p) => (
                  <li key={p.name} className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-mono font-medium">{p.name}</span>
                    <span className="text-gray-400">: {p.type}</span>
                    {p.default ? <span className="text-gray-400"> • default: {p.default}</span> : null}
                    {p.description ? <span className="text-gray-500"> — {p.description}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <CodeTabs jsx={comp.jsx} html={comp.html} />
      </div>
    </div>
  );
}
