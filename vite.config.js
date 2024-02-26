/* eslint-disable import/no-extraneous-dependencies */
/*
 * Copyright (c) 2020-24 Prolincur Technologies LLP.
 * All Rights Reserved.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import macrosPlugin from 'vite-plugin-babel-macros'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import banner from 'vite-plugin-banner'
import { resolve } from 'path'
import json from './package.json'

export default defineConfig({
  plugins: [
    react(),
    macrosPlugin(),
    dts({ include: ['src'] }),
    cssInjectedByJsPlugin(),
    banner(
      'Copyright (c) 2020-24 Prolincur Technologies LLP.\nAll Rights Reserved.\n\n' +
      'Please check the provided LICENSE file for licensing details.\n' +
      '\n' +
      'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,\n' +
      'INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR\n' +
      'PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE\n' +
      'LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT\n' +
      'OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR\n' +
      'OTHER DEALINGS IN THE SOFTWARE.\n'
    ),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.jsx'),
      formats: ['es'],
    },
    copyPublicDir: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react/jsx-runtime', ...(Object.keys(json.peerDependencies) || [])],
      input: {
        lib: './src/index.jsx',
      },
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
})
