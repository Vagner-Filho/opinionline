# GEMINI.md

## Project Overview

This is a full-stack web application built with [Nuxt.js](https://nuxt.com/), a meta-framework for [Vue.js](https://vuejs.org/). The application, named "Opinionline," appears to be a platform for publishing and reading articles. It features a server-side API for handling data and authentication, and a frontend for displaying the articles and managing content.

### Key Technologies

*   **Frontend:**
    *   [Nuxt.js](https://nuxt.com/) (v4)
    *   [Vue.js](https://vuejs.org/) (v3)
    *   [@nuxt/ui](https://ui.nuxt.com/) for UI components
    *   [Tailwind CSS](https://tailwindcss.com/) for styling
*   **Backend:**
    *   Nuxt.js Server Routes
    *   [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) for the database
    *   [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) for authentication
*   **Testing:**
    *   [Vitest](https://vitest.dev/) for unit testing

### Architecture

The project follows a typical Nuxt.js structure, with a clear separation of concerns between the frontend and backend.

*   `app/`: Contains the Vue.js components, pages, layouts, and assets for the frontend.
*   `server/`: Contains the server-side logic, including API routes, database access, and authentication services.
*   `database/`: The SQLite database file (`opinionlinedev.db` for development) is located in the root directory.

## Building and Running

### Installation

To get started, install the project dependencies using your preferred package manager:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Development

To start the development server, run the following command. The application will be available at `http://localhost:3000`.

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

### Production

To build the application for production, use the following command:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

To preview the production build locally, run:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

### Testing

To run the unit tests, use the following command:

```bash
npm run test:unit
```

## Development Conventions

### Coding Style

The project uses TypeScript and follows the standard Vue.js and Nuxt.js coding conventions. The use of `@nuxt/ui` and Tailwind CSS suggests a utility-first approach to styling.

### Testing Practices

Unit tests are located in the `test/` directory and are written using `vitest`. The tests seem to be focused on individual components.

### Database

The database schema is defined in `server/core/data/query/setup.ts`. The application uses a SQLite database, and the database file is created in the root directory. The development database is named `opinionlinedev.db`.
