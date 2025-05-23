# Sticky Notes Application

This is a **Sticky Notes Application** built using modern technologies like React, TypeScript, and TailwindCSS. The application allows users to create and organize sticky notes, offering a visually appealing and functional interface. Key features include local storage integration and dynamic color updates based on note deadlines.

## Features

- Drag-and-drop functionality for rearranging notes.
- Deadline-based color changes for better task management.
- Responsive design using TailwindCSS.

## Technologies Used

- [React](https://reactjs.org/) and [React DOM](https://reactjs.org/docs/react-dom.html) for building the user interface.
- [TypeScript](https://www.typescriptlang.org/) for type safety and cleaner code.
- [TailwindCSS](https://tailwindcss.com/) for styling.
- [dnd-kit](https://dndkit.com/) for drag-and-drop functionality.
- [uuid](https://www.npmjs.com/package/uuid) for unique IDs.

## Sources

- dnd-kit document
- Search
- AI

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/setareh/stickyNote.git
   cd sticky-notes

   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

    npm run dev

### Build

    npm run build

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

#
