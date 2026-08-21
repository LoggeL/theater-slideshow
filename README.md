# Creepshow 2026 Slideshow

Produktive Cast-, Rollen- und Kreativteam-Slideshow des Kolpingtheaters Ramsen.

## Live

<https://loggel.github.io/theater-slideshow/>

## Inhalt

- 28 Cast-/Rollenslides mit ausgewählten Creepshow-Fotos
- zwei wechselnde offizielle Plakatmotive
- vier Kreativteam-Übersichten
- 13 individuelle Technikteam-Features
- responsive Darstellung, Autoplay, Vollbild und weiche Übergänge

Die Namen und Funktionen wurden mit dem finalen Programmheft abgeglichen. Die
Technikporträts stammen aus den offiziellen Team-Assets der Theater-Website;
wo dort kein Porträt veröffentlicht ist, wird der offizielle Platzhalter mit
Initialen verwendet.

## Struktur

```text
index.html                App
cast-candidates.json      Cast, Rollen und ausgewählte Bilder
creative-team.json        Kreativteam-Übersichten
technical-team.json       Technikteam-Features
assets/
├── cast/                 28 verwendete Castbilder
├── posters/              2 Plakatmotive
└── team/                 9 Teamfotos + offizieller Platzhalter
```

## Lokal starten

```bash
python3 -m http.server 4173
```

Danach <http://127.0.0.1:4173/> öffnen.

Steuerung: `←/→` = wechseln · `Leertaste` = Autoplay · `F` = Vollbild.

GitHub Pages veröffentlicht den Root von `main`; deshalb bleibt die öffentliche
URL bewusst flach.
