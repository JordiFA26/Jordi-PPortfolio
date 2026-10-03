import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev only: serve /api/* from the same handlers Vercel runs in production.
const devApi = {
  name: 'dev-api',
  configureServer(server) {
    server.middlewares.use('/api/episodes', async (req, res) => {
      const { default: handler } = await server.ssrLoadModule('/api/episodes.js')
      const shim = {
        setHeader: (k, v) => res.setHeader(k, v),
        status(code) {
          res.statusCode = code
          return this
        },
        json(body) {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(body))
        },
      }
      await handler(req, shim)
    })
  },
}

export default defineConfig({
  plugins: [react(), devApi],
  server: { port: 5173 },
})
