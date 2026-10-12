import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this project under /Site-MasterPllays/.
  base: process.env.GITHUB_ACTIONS === 'true' ? '/Site-MasterPllays/' : '/',
})
