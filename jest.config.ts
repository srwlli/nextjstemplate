// jest.config.ts
import type { Config } from 'jest';
import nextJest from 'next/jest';

// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
const createJestConfig = nextJest({
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Handle module aliases (e.g., "@/components") that we configured in tsconfig.json
    '^@/(.*)$': '<rootDir>/src/$1', // This maps "@/*" to "src/*" as per your tsconfig
  },
  // Optional: Collect test coverage
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/_app.tsx', // Exclude Next.js specific files
    '!src/**/_document.tsx',
    '!src/**/layout.tsx', // Exclude Next.js App Router layout
    '!src/lib/database.types.ts', // Exclude auto-generated Supabase types
    '!src/lib/prisma.ts', // Exclude Prisma client instance (often not unit tested directly)
    '!src/lib/supabaseClient.ts', // Exclude Supabase client instance (often not unit tested directly)
    '!src/**/auth-actions.ts', // Exclude server actions directly if testing them differently
    '!src/app/api/**', // Exclude API routes from client test coverage
    '!src/**/*.stories.{js,jsx,ts,tsx}', // Exclude Storybook stories if you add them
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig); 