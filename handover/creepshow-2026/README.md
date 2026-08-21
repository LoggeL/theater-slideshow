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
├── creative-team.json     # Kreativteam-Credits aus final.pdf, auf vier Slides verteilt
├── creepshow-poster-moon.jpeg    # offizielles Hochformat-Plakat, Charakter-Set Mond/Haus
├── creepshow-poster-castle.jpeg  # offizielles Hochformat-Plakat, Charakter-Set Schloss
├── manual-corrections.md  # manuelle Korrekturen
├── index.html             # responsive Cast-/Rollen-Slideshow
└── README.md              # diese Datei
```

## Datenlage

Vorläufige Website-/Cast-Daten kamen aus `Kolpingtheater-Ramsen/next-theater`, `src/data/team.json`.
Für die finale Besetzung, Vollnamen und das Kreativteam ist die lokal übergebene `final.pdf` maßgeblich; sie wird nicht ins Repo committed.

Aktuelles Stück: **Creepshow 2026 / Open Air**

Cast mit Rollen:

| Person | Rolle |
|---|---|
| Carina Sattler | Hausgeist Drusilla von Falkenstein |
| Elena Matheis | Lucy von Falkenstein |
| Fernanda Fischer | Heideltraut von Storchensumpf |
| Fynn Hüttmann | Ensemble |
| Hendrik Kummermehr | Karl / Ensemble |
| Jakob Leidig | Bruno / Ensemble |
| Johannes Stüber | Paketbote / Ensemble |
| Jonas Berst | Viktor von Falkenstein |
| Jule Tyras | Motte |
| Julian Peters | Ensemble |
| Lena Wischnowski | Ensemble |
| Lina Kutschan | Portrait |
| Lina Roos | Fiona |
| Louis Noe | Graf Thaddäus von Falkenstein |
| Marcella Minklei | Suzie / Ensemble |
| Maren Archinger | Ensemble |
| Max Hüther | Ensemble |
| Maximilian Fischer | Ensemble |
| Nela Rödel | Felia |
| Nele Rörig | Prinzessin Iset |
| Nikodem Wozniak | Praktikant Emil |
| Nora Bidinger | Portrait |
| Sebastian Sattler | Butler Wilson |
| Sophie Schäfer | Mia |
| Theresa Kummermehr | Clara von Falkenstein |
| Till Michel | Herr Schniebli / Ensemble |
| Tobias Knechtel | Jacques der Koch |
| Yunus Sari | Dr. Adrian Düsterwald |

## Automatisches Matching

Immich Face Recognition wurde gegen die gelikten Bilder gematcht.

Aktueller Stand:

- 28 Cast-Mitglieder gemäß `final.pdf`
- 21 Personen mit Immich-Zuordnung
- 8 Personen visuell gegen beschriftete Team-Avatare bzw. `final.pdf` geprüft; Carina ist in beiden Gruppen enthalten
- 28 Personen mit ausgewähltem `selectedFile`
- 236 Kandidatenreferenzen auf 234 eindeutige Bilder; gemeinsame Szenen dürfen mehreren Personen zugeordnet sein
- keine Person mehr ohne Match
- 4 zusätzliche Kreativteam-Slides mit allen Funktionen und Namen aus `final.pdf`

Aliases/unsichere Matches:

- `Nikodem Wozniak` -> Immich `Nikodem`
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

1. Aus der geprüften Web-App bei Bedarf Print-Dateien exportieren.
2. Beschriftungsreihenfolge final freigeben; die App zeigt derzeit `Schauspieler` über `Rolle`.

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
