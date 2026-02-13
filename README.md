# Gallery

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646cff.svg)](https://vitejs.dev/)

Modern photo gallery with masonry layout, smooth animations, and dark mode. Built with React 19 and Framer Motion.

## Features

- **Masonry Layout** – Responsive grid with CSS columns
- **Smooth Animations** – Framer Motion powered transitions and hover effects
- **Album Filtering** – Interactive tab-based category filtering
- **Dark Mode** – System preference detection with manual toggle
- **Lazy Loading** – Native lazy loading for optimized performance
- **Type-Safe** – Full TypeScript coverage with comprehensive testing

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
**Animation:** Framer Motion 12
**Testing:** Vitest 4 · Testing Library · jsdom
**Tooling:** ESLint 9 · Prettier

## Project Structure

```
src/
├── components/      # Gallery, Filter, ThemeToggle
├── App.tsx          # Application controller
├── main.tsx         # Application entry point
├── imageLoader.ts   # Responsive image loading
├── photoLoader.ts   # Data fetching & validation
├── types.ts         # TypeScript definitions
└── styles/          # CSS styles

tests/               # Test suite
├── App.test.tsx
├── Gallery.test.tsx
├── Filter.test.tsx
└── photoLoader.test.ts
```

## Requirements

Node.js 22+ (see `.nvmrc`)

## License

MIT
