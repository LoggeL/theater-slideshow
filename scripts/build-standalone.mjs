#!/usr/bin/env node
/**
 * Bakes the album data into index.html so the slideshow is fully self-contained
 * (no server, no fetch). Reads data/albums.json, slimms it down and injects it
 * at the DATA marker inside index.html.
 *
 *   node scripts/build-standalone.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const htmlPath = resolve(root, 'index.html')
const dataPath = resolve(root, 'data', 'albums.json')

const manifest = JSON.parse(readFileSync(dataPath, 'utf8'))

const slim = manifest.albums.map((a) => ({
  kind: a.kind,
  slug: a.slug,
  title: a.title,
  subtitle: a.subtitle || null,
  playSlug: a.playSlug || null,
  order: a.order ?? null,
  year: a.year ?? null,
  coverId: a.coverId,
  assets: a.assets.map((x) => x.id),
}))

let html = readFileSync(htmlPath, 'utf8')
const marker = '/*__DATA__*/[]'
if (html.includes(marker)) {
  html = html.replace(marker, JSON.stringify(slim))
} else {
  const dataRe = /const ALBUMS = \[[\s\S]*?\];\r?\n\r?\n      \/\* ════════ ENGINE ════════ \*\//
  if (!dataRe.test(html)) {
    console.error('Data marker not found in index.html - aborting.')
    process.exit(1)
  }
  html = html.replace(
    dataRe,
    'const ALBUMS = ' + JSON.stringify(slim) + ';\n\n      /* ════════ ENGINE ════════ */',
  )
}
if (!html.includes('const ALBUMS = ')) {
  console.error('Data marker not found in index.html - aborting.')
  process.exit(1)
}
writeFileSync(htmlPath, html)

var total = slim.reduce(function (n, a) { return n + a.assets.length }, 0)
console.log('Baked ' + slim.length + ' albums (' + total + ' photos) into index.html')
