# Gallery

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646cff.svg)](https://vitejs.dev/)

High-performance photo gallery with masonry layout, lightbox viewer, and dark mode. Zero runtime dependencies.

## Features

- **Masonry Layout** – Responsive grid with CSS columns
- **Lightbox Viewer** – Full-screen navigation with keyboard controls
- **Category Filtering** – Tab-based album filtering
- **Dark Mode** – System preference detection with manual toggle
- **Lazy Loading** – IntersectionObserver-based scroll animations
- **Type-Safe** – Full TypeScript coverage with property-based testing

## Quick Start

```bash
npm install
npm run dev          # http://localhost:5173
```

## Commands

```bash
npm run build        # Production build
npm run preview      # Preview production build
npm test             # Run test suite
npm run lint         # ESLint validation
```

## Tech Stack

**Core:** React 19 · TypeScript 5.9 · Vite 7.3
**Testing:** Vitest 4 · fast-check · jsdom
**Tooling:** ESLint 9 · Prettier

## Project Structure

```
src/
├── components/      # Gallery, Filter, Lightbox, ThemeToggle
├── App.tsx          # Application controller
├── imageLoader.ts   # Responsive image loading
├── photoLoader.ts   # Data fetching & validation
└── types.ts         # TypeScript definitions
```

## Requirements

Node.js 22+ (see `.nvmrc`)

## License

MIT
