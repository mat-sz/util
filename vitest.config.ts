import { defineConfig } from 'vitest/config';

export default defineConfig(() => {
  return { test: { name: 'util', globals: true, environment: 'jsdom' } };
});
