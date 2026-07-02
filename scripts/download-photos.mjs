#!/usr/bin/env node
/**
 * Downloads every album image from Immich into public/photos/<slug>/<id>.jpg
 * so the slideshow is fully self-contained and works offline.
 *
 * Re-runnable: existing files are skipped. Uses Immich web previews
 * (~1440px JPEG) for a good size/quality balance. Switch SIZE to 'original'
 * below for full resolution.
 *
 *   node scripts/download-photos.mjs
 */
import { mkdir, writeFile, access } from 'node:fs/promises'
import { constants } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SIZE = 'preview' // 'preview' | 'original'
const CONCURRENCY = 8

const manifestPath = resolve(__dirname, '..', 'data', 'albums.json')
const manifest = JSON.parse(
  await import('node:fs').then((fs) => fs.readFileSync(manifestPath, 'utf8')),
)
const API = manifest.api

const exists = (p) =>
  access(p, constants.F_OK)
    .then(() => true)
    .catch(() => false)

async function download(album, asset, dir) {
  const dest = resolve(dir, `${asset.id}.jpg`)
  if (await exists(dest)) return 'skip'
  const url = `${API}/api/assets/${asset.id}/thumbnail?key=${album.key}&size=${SIZE}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} for ${asset.id}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(dest, buf)
  return 'ok'
}

async function runQueue(tasks, concurrency) {
  let i = 0
  let ok = 0
  let skip = 0
  const workers = Array.from({ length: concurrency }, async () => {
    while (i < tasks.length) {
      const idx = i++
      try {
        const r = await tasks[idx]()
        if (r === 'skip') skip++
        else ok++
      } catch (e) {
        console.error('  ✗', e.message)
      }
      if ((ok + skip) % 25 === 0) {
        process.stdout.write(`  …${ok + skip}/${tasks.length}\r`)
      }
    }
  })
  await Promise.all(workers)
  return { ok, skip }
}

let total = 0
for (const album of manifest.albums) {
  const dir = resolve(__dirname, '..', 'photos', album.slug)
  await mkdir(dir, { recursive: true })
  process.stdout.write(`▶ ${album.title}  (${album.count})  `)

  const tasks = album.assets.map((asset) => () => download(album, asset, dir))
  const { ok, skip } = await runQueue(tasks, CONCURRENCY)
  console.log(`+${ok} neu, ${skip} vorhanden`)
  total += album.count
}
console.log(`\nFertig: ${total} Bilder in public/photos/`)
