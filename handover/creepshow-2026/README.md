# Creepshow 2026 Cast/Role Slides — Handover

Stand: 2026-08-20

## Ziel

Sebastians Request vorbereiten: Rollen-/Cast-Slides passend zum Stück bauen.

Layout-Idee:
- eine Seite: Rollenbild / Cast-Foto
- andere Seite: eines der beiden offiziellen Hochformat-Plakate mit unterschiedlichen Charakter-Sets
- Personen und Plakatseite wechseln alternierend links/rechts; auch das Plakatmotiv wechselt pro Rolle
- unten Beschriftung, z. B. `Louis Noé – Graf Thaddäus von Falkenstein` oder `Graf Thaddäus von Falkenstein – Louis Noé`
- zusätzlich Web-Version fürs Kreativteam/Cast, alternierend Bild/Plakat links/rechts

## Quelle

Fotos kommen aus Immich:

- `https://photo.rittmann.cloud`
- Account: `Theater@rittmann.cloud`
- Es wurden die gelikten Bilder verwendet.
- Gefundene Favoriten: 381 Assets / 377 eindeutige Dateinamen
- Zeitraum: 2026-03-31 bis 2026-04-15

**Credentials sind absichtlich nicht im Repo committed.**

## Enthaltene Dateien

```text
handover/creepshow-2026/
├── previews/              # 377 gelikte Immich-Previewbilder, 1440x2160
├── sheets/                # 11 Contact-Sheets mit Nummerierung #0..#376
├── personsheets/          # pro erkannter Person ein Kandidaten-Sheet
├── cast-candidates.json   # Cast -> Rolle -> Kandidatenbilder
├── creepshow-poster-moon.jpeg    # offizielles Hochformat-Plakat, Charakter-Set Mond/Haus
├── creepshow-poster-castle.jpeg  # offizielles Hochformat-Plakat, Charakter-Set Schloss
├── manual-corrections.md  # manuelle Korrekturen
├── index.html             # responsive Cast-/Rollen-Slideshow
└── README.md              # diese Datei
```

## Datenlage

Website-/Cast-Daten aus `Kolpingtheater-Ramsen/next-theater`, `src/data/team.json`.

Aktuelles Stück: **Creepshow 2026 / Open Air**

Cast mit Rollen:

| Person | Rolle |
|---|---|
| Carina | Drusilla |
| Elena | Lucy |
| Fernanda | Tante Heideltraut von Storchensumpf |
| Fynn | Ensemble |
| Hendrik | Karl |
| Jakob | Bruno |
| Jonas | Vetter Viktor |
| Jule | Motte |
| Julian | Ensemble |
| Lena | Ensemble |
| Lina | Fiona |
| LinaK | Portrait |
| Logge / Johannes | Bote / Diener |
| Louis | Graf Thaddäus von Falkenstein |
| Marcella | Suzie |
| Max | Ensemble |
| Maximilian | Ensemble |
| Nela | Felia |
| Nele | Prinzessin Iset |
| Niko | Praktikant Emil |
| Nora | Portrait |
| Raphael | Diener |
| Sebastian | Butler Wilson / Regie |
| Sophie | Mia |
| Theresa | Clara |
| Till | Herr Schniebli |
| Tobias | Jacques |
| Vanessa | Ensemble |
| Yunus | Dr. Adrian Düsterwald |

## Automatisches Matching

Immich Face Recognition wurde gegen die gelikten Bilder gematcht.

Aktueller Stand:

- 29 Cast-Mitglieder
- 22 Personen mit automatisch zugeordneten Kandidatenbildern
- 7 Personen visuell gegen die beschrifteten Team-Avatare zugeordnet
- 29 Personen mit ausgewähltem `selectedFile`
- 251 Kandidatenreferenzen auf 249 eindeutige Bilder; gemeinsame Szenen dürfen mehreren Personen zugeordnet sein
- keine Person mehr ohne Match

Aliases/unsichere Matches:

- `Niko` -> Immich `Nikodem`
- `Tobias` -> Immich `Tobi`
- `LinaK` -> Immich `Lina_K.`
- `Carina` -> Immich `Caro` (von Logge bestätigt)

## Manuelle Korrektur vom 20.08.

Logge hat bestätigt:

> Das referenzierte Bild/Sheet ist komplett Logge / Johannes.

Diese Bilder nur für **Logge / Johannes — Bote / Diener** verwenden, nicht für andere Cast-Mitglieder.

Siehe auch `manual-corrections.md`.

## Cast-App starten

Im Repo-Root einen lokalen Server starten:

```bash
python3 -m http.server 4173
```

Danach `http://127.0.0.1:4173/handover/creepshow-2026/` öffnen.

Steuerung: `←/→` = Rollen wechseln · `Leertaste` = Autoplay · `F` = Vollbild.

## Offene Punkte

1. Vollnamen ergänzen. `team.json` enthält meist nur Vornamen.
2. Aus der geprüften Web-App bei Bedarf Print-Dateien exportieren.
3. Beschriftungsreihenfolge final freigeben; die App zeigt derzeit `Schauspieler` über `Rolle`.

## Vorschlag fürs Weiterarbeiten

1. Die ausgewählten Rollenbilder in der Cast-App prüfen.
2. Bei Änderungswünschen `selectedFile` in `cast-candidates.json` ersetzen.
3. Print-/Screen-Ausgaben mit den beiden eingebauten offiziellen Plakatmotiven freigeben.

## Repo-Kontext

Dieses Handover liegt im Repo:

```text
LoggeL/theater-slideshow
branch: handover/creepshow-2026-cast-slides
```

Das vorhandene Projekt ist eine HTML-basierte Theater-Slideshow. Für Sebastians neuen Request kann man Design/Look wiederverwenden, aber die Struktur muss eher als Cast-/Role-Slide-Generator erweitert werden.
