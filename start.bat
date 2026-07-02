@echo off
chcp 65001 >nul
title Kolpingtheater - Jubilaeums-Slideshow
cd /d "%~dp0"

echo.
echo   ============================================
echo     Kolpingtheater Ramsen - Jubilaeums-Slideshow
echo   ============================================
echo.

REM Die Slideshow ist eine eigenstaendige index.html - kein Server, keine
REM Installation noetig. Es wird einfach der Standardbrowser geoeffnet.

if not exist "index.html" (
  echo   FEHLER: index.html nicht gefunden.
  pause
  exit /b 1
)

if not exist "photos" (
  echo   Hinweis: Der Ordner "photos" fehlt - die Bilder werden nicht angezeigt.
  echo   Falls vorhanden einmalig ausfuehren:  node scripts\download-photos.mjs
  echo.
)

echo   Oeffne Slideshow im Browser ...
echo   (Tasten: Leertaste = Play/Pause, Pfeiltasten = weiter/zurueck, F = Vollbild)
echo.

start "" "%~dp0index.html"
