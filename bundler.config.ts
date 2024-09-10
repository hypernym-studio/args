import { defineConfig } from '@hypernym/bundler'

export default defineConfig({
  alias: true,
  entries: [{ input: './src/index.ts' }, { types: './src/types/index.ts' }],
})
