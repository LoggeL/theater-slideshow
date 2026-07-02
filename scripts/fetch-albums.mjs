#!/usr/bin/env node
/**
 * Fetches every album (and all of its assets) from the Immich share links
 * and writes a single manifest to src/data/albums.json.
 *
 * Immich share-link access pattern (no API key needed, only the public key):
 *   1. GET /api/shared-links/me?key=<KEY>          -> album metadata (id, name, thumb)
 *   2. GET /api/albums/<albumId>  with header
 *      x-immich-share-key: <KEY>                   -> full asset list
 *
 * Images are referenced directly at runtime via the thumbnail/original
 * endpoints, so nothing is downloaded here.
 *
 *   node scripts/fetch-albums.mjs
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const API = 'https://photo.rittmann.cloud'

// ── Album definitions ────────────────────────────────────────────────────
// `kind`: 'play' = theater production, 'team' = behind-the-scenes / pause album.
// `playSlug` links a play album to its metadata in config.ts (timeline.json).
// `order` controls display order within the chronological play run.
const ALBUMS = [
  {
    key: 'phjHU0RHKVkT16M8sRXySR-ZcxsvEhVUqfiC_S27IyVCbDgelLJ68S4t8yUpdICJxfM',
    kind: 'team', slug: 'hinter-den-kulissen',
    title: 'Hinter den Kulissen',
    subtitle: 'Das Ensemble',
  },
  {
    key: '-uVJKS4akMF9G-XZj1wIxa4_udImnCOyqOcnlUHPobnMLC-KWSWq-oTE0rWf5eBMgY4',
    kind: 'team', slug: 'kreativbuehne',
    title: 'Kreativbühne',
    subtitle: 'Hinter den Kulissen',
  },
  {
    key: 'AWd0iv9M_6lxKTvBVEXbRGj-FfWzNpzq1kXkevURmbHnKvfXKk42S0mC1pOHr4WhVGQ',
    kind: 'team', slug: 'praesentation',
    title: 'Präsentation',
    subtitle: 'Das Ensemble',
  },
  {
    key: 'nQLb_Bgjhr2VGB4N9nWVbjJjnBs_eK3ZYe7lSjnhCd6shHfOs353QXlDODHHdZrMZwk',
    kind: 'play', slug: 'kristall', playSlug: 'kristall', order: 2,
    title: 'Der Kristall der Träume', year: 2020,
  },
  {
    key: 'q58Rv2q--5jRkiouaECithvIrEhucpx6ym0Bw7_3-LJr_z9atHOpbLZjUTY_oogk6NM',
    kind: 'play', slug: 'maleficarum', playSlug: 'maleficarum', order: 3,
    title: 'Malleus Maleficarum', year: 2021,
  },
  {
    key: 'eGpe7XkJJqmARA2bWYGiQ70J6AtxTNS7mc7Yfl5STAppX0m1ygPx5rGVPEOyrRtsLKM',
    kind: 'play', slug: 'goldfieber', playSlug: 'goldfieber', order: 4,
    title: 'Goldfieber', year: 2022,
  },
  {
    key: 'x1iVqLE7HJ33VqB-F3vOBe2HAp1g5InO92pZyrKVqb_K2b4OYqVz2hWDjNCoMs6I8ag',
    kind: 'play', slug: 'freiheit', playSlug: 'freiheit', order: 5,
    title: 'Traum von Freiheit', year: 2023,
  },
  {
    key: 'TJOCoQMZt5mQfMH5WNQQBPqmW5q_v1tT1WBTEbAaPGgExuNNR_KmjMXW50g84UtIsFk',
    kind: 'play', slug: 'nexus', playSlug: 'nexus', order: 6,
    title: 'Nexus', year: 2024,
  },
  {
    key: '4aVhY4HmAE9DYXHoVtskRyBtiFGctG3IMsQsbeEMEHlBXZTdaVxrahiX9MS7bfbV_BE',
    kind: 'play', slug: 'anno', playSlug: 'anno', order: 7,
    title: 'Anno 1146', year: 2025,
  },
  {
    key: 'Sur-Ta27P-lFpfsM0i0Pp8kggFvZc6n41L-6J5WhDGh3KAVaz_KkNbTYFTeQlNcWITo',
    kind: 'play', slug: 'dystopia', playSlug: 'dystopia', order: 1,
    title: 'Dystopia', year: 2019,
  },
]

async function getJson(url, { headers } = {}) {
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.json()
}

async function fetchAlbum(def) {
  const meta = await getJson(`${API}/api/shared-links/me?key=${def.key}`)
  const albumId = meta.album.id
  const thumbId = meta.album.albumThumbnailAssetId

  const full = await getJson(`${API}/api/albums/${albumId}`, {
    headers: { 'x-immich-share-key': def.key },
  })

  // Keep images only, drop live-photo videos. Preserve album order (the first
  // asset is the curated cover / "Deckblatt").
  const assets = (full.assets || [])
    .filter((a) => a.type === 'IMAGE')
    .map((a) => ({
      id: a.id,
      name: a.originalFileName,
      date: a.fileCreatedAt,
    }))

  // The cover is the album's thumbnail asset if present, otherwise the first.
  const coverId = thumbId || assets[0]?.id || null

  return {
    ...def,
    albumId,
    albumName: meta.album.albumName,
    coverId,
    count: assets.length,
    assets,
  }
}

async function main() {
  const out = []
  for (const def of ALBUMS) {
    const album = await fetchAlbum(def)
    console.log(
      `  ${album.kind.padEnd(4)}  ${String(album.count).padStart(3)}  ${album.title}`,
    )
    out.push(album)
  }

  const manifest = {
    api: API,
    generated: new Date().toISOString(),
    albums: out,
  }

  const dest = resolve(__dirname, '..', 'data', 'albums.json')
  writeFileSync(dest, JSON.stringify(manifest, null, 2))
  console.log(`\nWrote ${out.length} albums -> ${dest}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
