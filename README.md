# Theater-Jubiläums-Slideshow

Kinematografische Diashow für das Jubiläum des Kolpingtheaters Ramsen, im
Design der Theater-Website (Bühnenschwarz, Kolping-Orange, Cinzel-Schrift,
Spotlight, Film-Grain, Ken-Burns). Sie läuft **ohne Installation und ohne
Server** — einfach `index.html` per Doppelklick (oder `start.bat`) öffnen.

## Starten

Doppelklick auf **`start.bat`** (öffnet den Standardbrowser) — oder direkt auf
`index.html`. Kein Node, kein Server, kein Internet nötig (Bilder liegen lokal
in `photos/`).

**Steuerung:** `Leertaste` = Play/Pause · `←/→` = zurück/weiter · `F` = Vollbild

## Konzept

- Jedes Album beginnt mit seinem **Deckblatt** (Cover + Titel + Jahr + Text).
- Die **Stück-Alben** laufen chronologisch (2019 → 2025).
- Nach je **2 Stücken** folgt ein **Team-Album als Pause** (rotierend:
  Hinter den Kulissen → Kreativbühne → Präsentation).

Stellgrößen (Rhythmus, Timing, Texte) stehen oben im `<script>` von `index.html`
(`PLAYS_PER_BLOCK`, `PLAY_ORDER`, `TIMING`, `PLAY_BLURB`).

## Aufbau

```
index.html              eigenständige App (CSS + JS + Daten inline)
photos/<slug>/<id>.jpg  alle Bilder (lokal)
data/albums.json        Album-Metadaten (Quelle für den Generator)
scripts/
  fetch-albums.mjs        Holt Album-Daten von Immich        (braucht Node)
  download-photos.mjs     Lädt alle Bilder nach photos/      (braucht Node)
  build-standalone.mjs    Backt die Daten in index.html      (braucht Node)
start.bat               Öffnet die Slideshow im Browser
```

Die Node-Skripte brauchen **keine** npm-Pakete (nur Node-Built-ins).

## Aktualisieren

Wenn sich in Immich etwas ändert (einmalig, nur auf einem Rechner mit Node):

```bash
node scripts/fetch-albums.mjs       # Metadaten neu holen
node scripts/download-photos.mjs    # neue Bilder herunterladen
node scripts/build-standalone.mjs   # Daten in index.html backen
```

Oder alles auf einmal: `node scripts/fetch-albums.mjs && node scripts/download-photos.mjs && node scripts/build-standalone.mjs`

## GitHub Pages

Das Repo wird auch via GitHub Pages veröffentlicht (statisches Hosting der
`index.html` + `photos/`). `.nojekyll` sorgt dafür, dass die Dateien unverändert
ausgeliefert werden.
