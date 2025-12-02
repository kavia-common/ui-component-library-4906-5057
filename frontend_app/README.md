# Ocean UI Component Browser (React + Tailwind)

A web app to browse, preview, and copy React UI components styled with Tailwind CSS. Features search, filters, dark/light mode, responsive layout, and code copy (JSX & HTML).

## Quick Start

- Install dependencies: `npm install`
- Run dev server: `npm start`
- Open http://localhost:3000

## Features

- Home page with header/navbar, search, and dark/light toggle
- Sidebar with filterable categories and tags
- Responsive grid of components with quick actions: View, Copy JSX, Copy HTML
- Component detail page with live preview and code tabs
- Fuzzy search by name, category, and tags (client-side)
- Helpful empty/error states and loading skeletons
- Ocean Professional theme with subtle gradients and smooth transitions

## Add New Components

1. Open `src/data/components.json`.
2. Append a new object in the `components` array:
```json
{
  "id": "badge-notification",
  "name": "Notification Badge",
  "category": "Feedback",
  "tags": ["responsive", "light", "dark"],
  "previewType": "live",
  "description": "A badge to show notifications count.",
  "jsx": "export function NotificationBadge({ count = 3 }) { return (<span className=\\"inline-flex items-center justify-center rounded-full bg-red-600 text-white text-xs px-2 py-0.5\\">{count}</span>); }",
  "html": "<span class=\\"inline-flex items-center justify-center rounded-full bg-red-600 text-white text-xs px-2 py-0.5\\">3</span>",
  "props": [
    { "name": "count", "type": "number", "default": 3, "description": "Displayed number" }
  ]
}
```
3. Optionally, add new category/tag to `meta.categories` or `meta.tags`.
4. Save the file and the grid will update.

Notes:
- For advanced interactive previews, you may add conditional rendering logic in `ComponentCard` and `ComponentDetail` pages keyed by `id`.
- For HTML copy, you can either store a pre-rendered HTML snippet in JSON (recommended) or implement JSX-to-HTML conversion per component.

## Theming

- Dark/light mode uses Tailwind’s `dark` class and persists to `localStorage`.
- Theme utilities and Ocean colors are provided in `tailwind.config.js` and `src/styles/tailwind.css`.

## Environment

The app does not require external APIs. It respects existing env variables, but does not depend on them.

