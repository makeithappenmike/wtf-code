import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path')

// Vite was used to instead of create-react-app
// For more, refer to https://vitejs.dev/
export default defineConfig({
  plugins: [react()]
})
