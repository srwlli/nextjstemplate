# Next.js App Template

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/CSS-TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Database-Supabase-000000?logo=supabase&logoColor=white)](https://supabase.com/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-000000?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Jest](https://img.shields.io/badge/Testing-Jest-C21325?logo=jest&logoColor=white)](https://jestjs.io/)
[![Shadcn UI](https://img.shields.io/badge/UI-ShadcnUI-000000?logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)

---

## 🚀 Project Overview

This is a robust, modern, and highly opinionated Next.js application template built with the **App Router**. It provides a comprehensive starter kit for developing full-stack web applications, focusing on developer experience, performance, and best practices. It's designed to be easily extensible and scalable for various project types.

## ✨ Key Features

* **Next.js 15+ (App Router):** Leveraging the latest features for server components, server actions, and optimized routing.
* **TypeScript:** Full type-safety across the application.
* **Tailwind CSS 4:** Utility-first CSS framework for rapid UI development.
* **Supabase Integration:** Full-stack database and authentication solution.
    * **PostgreSQL Database:** Managed relational database.
    * **Supabase Auth:** Email/password and OAuth (Google, GitHub) authentication.
    * **Prisma ORM:** Type-safe database access layer for robust data operations.
* **Shadcn UI:** Re-usable, customizable UI components built with Radix UI and Tailwind CSS.
* **Zustand:** Lightweight and performant client-side state management.
* **Jest & React Testing Library:** Comprehensive unit and integration testing setup.
* **ESLint & Prettier:** Automated code linting and formatting for consistent code quality.
* **Husky & Lint-Staged:** Git pre-commit hooks to enforce code standards.
* **Robust Error Handling:** Global 404, global error boundaries, and segment-specific loading/error UIs.
* **SEO & Metadata:** Comprehensive SEO setup with Next.js Metadata API and `robots.txt`.
* **Absolute Imports:** Configured for cleaner import paths.

## 📦 Tech Stack

* [Next.js](https://nextjs.org/)
* [React](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Supabase](https://supabase.com/)
* [Prisma](https://www.prisma.io/)
* [Shadcn UI](https://ui.shadcn.com/)
* [Zustand](https://zustand-zustand.vercel.app/)
* [Jest](https://jestjs.io/)
* [React Testing Library](https://testing-library.com/react)
* [ESLint](https://eslint.org/)
* [Prettier](https://prettier.io/)
* [Husky](https://typicode.github.io/husky/)
* [Lucide React](https://lucide.dev/icons/) (for icons)
* [date-fns](https://date-fns.org/) (for date utilities)
* [clsx](https://github.com/clsx-unit/clsx) (for conditional classNames)
* [Sonner](https://sonner.emilkowalski.dk/) (for toast notifications)

## 🚀 Getting Started

Follow these steps to get your development environment up and running:

### Prerequisites

Make sure you have the following installed:
* Node.js (LTS version recommended)
* npm (comes with Node.js) or Yarn
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/srwlli/nextjstemplate.git
cd nextjstemplate # Or the name of your cloned directory
```

### 2. Set Up Environment Variables

This project uses environment variables for sensitive information and API keys.

  * **Supabase Project Setup:**

    1.  Go to [Supabase](https://supabase.com/) and create a new project.
    2.  Navigate to **Project Settings** > **API** to get your `Project URL`, `anon` (public) `key`, and `Service Role Key`.
    3.  Go to **Project Settings** > **Database** > **Connection String** > **URI** to get your database connection string for Prisma.
    4.  For OAuth providers (Google, GitHub, etc.), go to **Authentication** > **Providers** in your Supabase dashboard. Enable the providers and set their **Redirect URL** to `http://localhost:3000/auth/callback` (or your local dev port).

  * **Create `.env.local`:**

    1.  In the root of your project, copy the content from `.env.example` into a new file named `.env.local`.

    2.  Fill in your actual Supabase credentials and your site URL:

        ```
        # .env.local
        # This file holds your local environment variables and should NOT be committed to Git.

        # Supabase Project URL (Found in Supabase Project Settings -> API)
        NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL_HERE

        # Supabase Public Anon Key (Found in Supabase Project Settings -> API)
        NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY_HERE

        # Supabase Service Role Key (Found in Supabase Project Settings -> API -> Service Role Key)
        # This key is HIGHLY SENSITIVE and MUST ONLY BE USED ON THE SERVER-SIDE (e.g., in Server Actions).
        SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE

        # Database URL for Prisma (Found in Supabase Project Settings -> Database -> Connection String -> URI)
        DATABASE_URL="postgresql://postgres:[YOUR-DB-PASSWORD]@[YOUR-DB-HOST]:5432/postgres?schema=public"

        # Your site's public URL (for email redirects, OG images, etc.)
        # In development: http://localhost:3000
        # In production: https://yourdomain.com
        NEXT_PUBLIC_SITE_URL=http://localhost:3000
        ```

    3.  **Important:** Ensure `.env.local` is listed in your `.gitignore` file.

### 3. Install Dependencies

```bash
npm install
```

### 4. Database Setup (Prisma & Supabase)

This template uses Prisma to manage your database schema.

  * **Generate Prisma Client & Push Schema:**
    ```bash
    npx prisma generate # Generates the Prisma client based on schema.prisma
    npx prisma db push  # Pushes the schema to your connected Supabase database
    ```
    You can verify your `profiles` and `posts` tables in the Supabase Dashboard > Table Editor.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📖 Project Structure

```
.
├── .husky/              # Git hooks managed by Husky
├── public/              # Static assets (favicons, robots.txt, etc.)
├── prisma/              # Prisma schema and migrations
├── src/                 # Application source code
│   ├── app/             # Next.js App Router (pages, layouts, loading, error, not-found)
│   │   ├── (auth)/      # Grouped routes for authentication (e.g., /login, /signup, /auth/callback)
│   │   ├── posts/       # Routes for blog posts (list, dynamic single post)
│   │   └── user-dashboard/ # Protected user dashboard with nested layout
│   ├── components/      # Reusable React components
│   │   ├── layout/      # Components specific to overall layout (Header, Navigation)
│   │   └── ui/          # Shadcn UI components (generated by npx shadcn add)
│   ├── lib/             # Utility functions, API clients, server actions
│   │   ├── auth-actions.ts # Server Actions for authentication logic
│   │   ├── post-actions.ts # Server Actions for post-related data mutations
│   │   ├── prisma.ts    # Centralized Prisma Client instance
│   │   └── supabaseClient.ts # Centralized Supabase Client instances
│   │   └── supabase/    # Supabase server-side client config
│   │   └── utils.ts     # General utilities
│   ├── store/           # Zustand client-side stores
│   └── styles/          # Global styles (globals.css)
├── .env.example         # Example environment variables
├── .env                 # Your local environment variables (not committed)
├── .gitignore           # Files and directories to ignore in Git
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies and scripts
├── postcss.config.js    # PostCSS configuration (for Tailwind)
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── jest.config.js       # Jest testing framework configuration
└── jest.setup.js        # Jest setup file
```

## ⚙️ Available Scripts

In the project directory, you can run:

  * `npm run dev`
    Starts the development server.
  * `npm run build`
    Builds the application for production.
  * `npm run start`
    Starts the production server after building.
  * `npm run lint`
    Runs ESLint to check for code style issues.
  * `npm run lint:fix`
    Runs ESLint and automatically fixes fixable issues.
  * `npm run format`
    Formats code using Prettier.
  * `npm run test`
    Runs all Jest tests.
  * `npm run test:watch`
    Runs Jest tests in watch mode.
  * `npm run prisma:generate`
    Generates the Prisma client based on `schema.prisma`.
  * `npm run prepare`
    Installs Husky Git hooks. Automatically run after `npm install`.
  * `npm run postinstall`
    Automatically runs after `npm install` (currently runs `prisma generate`).

## 🔐 Authentication

This template uses Supabase Auth for user authentication.

  * **Flows:** Supports email/password signup/login and OAuth (Google, GitHub).
  * **Privacy:** Follows Supabase's privacy-first design for duplicate email sign-ups; an explicit "email exists" message is not given to prevent enumeration.
  * **Protected Routes:** Examples in `/dashboard` and `/user-dashboard` redirect unauthenticated users.
  * **Logic:** All authentication logic resides in `src/lib/auth-actions.ts`.

## 📊 Data Fetching

Leverages Next.js App Router's data fetching mechanisms:

  * **Server Components:** For initial data loads (e.g., `/posts`, `/posts/[id]`).
  * **Server Actions:** For secure data mutations (e.g., creating/deleting posts in `src/lib/post-actions.ts`).
  * **Client-Side:** For interactive UI elements (e.g., Zustand counter, `PublicMessageBoard`).

## 🧪 Testing

Comprehensive testing setup using:

  * **Jest:** As the test runner.
  * **React Testing Library:** For component testing (simulating user interactions).
  * Includes unit tests for Zustand stores and integration tests for key components.

## 💅 UI Components

Uses [Shadcn UI](https://ui.shadcn.com/) for a beautiful and customizable design system, built on Radix UI and Tailwind CSS. Components are copied directly into `src/components/ui`.

## 🚨 Error Handling & Loading States

Implemented robust error and loading feedback:

  * **Global 404 Page:** `src/app/not-found.tsx` for unmatched routes.
  * **Global Error Boundary:** `src/app/error.tsx` for catching unhandled client-side errors.
  * **Segment-Specific UIs:** `loading.tsx` and `error.tsx` for specific route segments (e.g., `/posts`).
  * **Consistent Loading Indicators:** Forms and buttons disable and show loading text during asynchronous operations.
  * **Toast Notifications:** Used for user feedback on actions.

## 🚀 Deployment

This Next.js template is designed for easy deployment to platforms like [Vercel](https://vercel.com/).

  * **Vercel:** Vercel automatically detects Next.js applications. Simply link your Git repository. Ensure your environment variables (from `.env.local`) are configured in Vercel's project settings.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
