import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Expose ANTHROPIC_API_KEY to the client so the chat widget can call the live
// model. Reads from a .env file (any var, via the empty prefix) or the shell.
// ⚠️ This bundles the key into the client build — fine for local/dev, but for
// production proxy the model through a backend instead of shipping a key.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const key = env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY || ''
  return {
    plugins: [react()],
    define: {
      'import.meta.env.ANTHROPIC_API_KEY': JSON.stringify(key),
    },
  }
})
