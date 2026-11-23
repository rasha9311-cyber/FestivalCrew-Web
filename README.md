# 🤘 FestivalCrew Web – Rock Edition v0.2.0

Die öffentliche, installierbare Demo für Festivalplanung mit Einkaufsliste, Festivalkasse, Packliste, Band-Timeline und lokalem Gruppenchat. FestivalCrew ist **kein offizielles Wacken-Produkt**.

## 📱 Öffnen

https://rasha9311-cyber.github.io/FestivalCrew-Web/

Updates erscheinen automatisch über GitHub Actions und GitHub Pages. Bei alter Anzeige die Seite neu laden.

## 🧾 Kassenbon-Scanner

- Foto aufnehmen oder aus Galerie wählen
- Browser-Texterkennung mit Tesseract.js (Bibliothek und Sprachdaten werden über CDN geladen)
- Positionen mit Artikelnamen, Mengen, Preisen und vorgeschlagenen Listen-Zuordnungen erkennen
- **Vor dem Speichern** alle Positionen kontrollieren und manuell korrigieren
- Neu gekaufte Artikel zur Einkaufsliste hinzufügen oder bestehende Artikel als gekauft / teilweise gekauft markieren
- Den Betrag als Ausgabe der Festivalkasse buchen, auf ausgewählte Personen aufteilen oder lediglich archivieren
- Originalfoto und erkannte Positionen auf diesem Gerät speichern

OCR-Erkennung ist heuristisch und kann Positionen, Pfand, Rabatte oder Beträge falsch lesen. Es werden keine Kartendaten automatisch extrahiert oder geprüft.

## 💰 Gruppenkasse

Vier Schnellaktionen: Bon scannen, Ausgabe, Einzahlung, Ausgleich. Die Personenübersicht zeigt Guthaben und Schulden inklusive vereinfachter Überweisungs-Vorschläge.

## 🔒 Grenzen der Demo

**Kein Mehrbenutzerbetrieb:** Alle Festivaldaten liegen ausschließlich im lokalen Speicher des jeweiligen Browsers. Es gibt noch keine Benutzerkonten, keine gemeinsame Echtzeit-Datenbank, keinen gemeinsamen Chat, keinen automatischen Datenabgleich und keinen Wacken-Import. Daten können beim Löschen der Browserdaten verloren gehen; nutze regelmäßig Export unter Einstellungen.

Die OCR-Funktion lädt Programmdateien aus dem Internet, verarbeitet Bilder aber im Browser. Deshalb keine Geheimnisse im Code hinterlegen und keine sensiblen Gruppenbuchungen als bereits synchronisiert betrachten.

## Entwicklung

- privates Haupt-Repository: `FestivalCrew`
- öffentliches Web-Deployment: `FestivalCrew-Web`
- Stack: HTML/CSS/JavaScript, PWA, GitHub Pages
- Gestaltung: dunkler Rock-/Festival-Look mit Rot, Anthrazit und kupferfarbenen Akzenten
