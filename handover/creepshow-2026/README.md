# Creepshow 2026 Cast/Role Slides — Handover

Stand: 2026-08-20

## Ziel

Sebastians Request vorbereiten: Rollen-/Cast-Slides passend zum Stück bauen.

Layout-Idee:
- eine Seite: Rollenbild / Cast-Foto
- andere Seite: Plakatmotiv ohne Termine/Daten
- Personen sollen visuell „aufs Bild schauen“: Plakatvariante links/rechts je nach Blickrichtung nutzen
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
├── manual-corrections.md  # manuelle Korrekturen
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
- 179 Kandidatenbilder insgesamt
- 7 ohne sicheren Match:
  - Carina
  - Elena
  - Jonas
  - Lina
  - Louis
  - Sebastian
  - Theresa

Aliases/unsichere Matches:

- `Niko` -> Immich `Nikodem`
- `Tobias` -> Immich `Tobi`
- `LinaK` -> Immich `Lina_K.`
- `Carina` könnte Immich `Caro` sein, aber bitte visuell prüfen

## Manuelle Korrektur vom 20.08.

Logge hat bestätigt:

> Das referenzierte Bild/Sheet ist komplett Logge / Johannes.

Diese Bilder nur für **Logge / Johannes — Bote / Diener** verwenden, nicht für andere Cast-Mitglieder.

Siehe auch `manual-corrections.md`.

## Offene Punkte

1. Fehlende 7 Personen visuell aus den Contact-Sheets zuordnen.
2. `Caro` = `Carina` prüfen.
3. Vollnamen ergänzen. `team.json` enthält meist nur Vornamen.
4. Plakatmotiv **ohne Termine/Daten** beschaffen.
5. Finales Design bauen:
   - Print-/Screen-Slides mit Rollenbild + Plakatmotiv
   - Web-Komponente im Stil der Website
6. Entscheiden, ob Beschriftung `Schauspieler – Rolle` oder `Rolle – Schauspieler`.

## Vorschlag fürs Weiterarbeiten

1. `personsheets/` durchgehen und pro Person das beste Bild wählen.
2. Fehlende Personen in `sheets/` über die nummerierten Contact-Sheets suchen.
3. `cast-candidates.json` um `selectedFile` ergänzen.
4. Danach Generator bauen, der aus Cast/Rolle/Bild/Plakat die finalen Slides rendert.

## Repo-Kontext

Dieses Handover liegt im Repo:

```text
LoggeL/theater-slideshow
branch: handover/creepshow-2026-cast-slides
```

Das vorhandene Projekt ist eine HTML-basierte Theater-Slideshow. Für Sebastians neuen Request kann man Design/Look wiederverwenden, aber die Struktur muss eher als Cast-/Role-Slide-Generator erweitert werden.
