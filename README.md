# FestivalCrew 0.3.0 – Fokus-Ansicht

Die mobile Festivalplanungs-Demo ist bewusst minimalistisch: dunkles Grau, klare Typografie, nur ein dezenter roter Akzent. **Unabhängiges Fan-Projekt, kein offizielles Wacken-Angebot.**

## Einfacher Aufbau

- **Übersicht:** Anzahl offener Einkäufe, offene Packaufgaben, Festivalkasse, nächste Aktionen und kommender Konzerttermin.
- **Listen:** Einkaufsliste (offen/gekauft/alle) und Packliste (offen/gepackt/alle) in einem Bereich; Formulare nur bei Bedarf aufklappen.
- **Kasse:** Ein gemeinsamer Kassenstand, Bon scannen, Ausgabe, Einzahlung und Ausgleich. Details zu Personen, Bons und Buchungen sind einklappbar.
- **Festival:** Timeline und lokaler Chat als zwei Unteransichten.
- **Einstellungen:** Festival- und Mitgliederverwaltung, Export/Import, Daten zurücksetzen.

## Kassenbon

Kassenbon fotografieren, Positionen im Browser erkennen, prüfen, mit der Einkaufsliste abgleichen und optional in die Kasse übernehmen. Einzelartikel, Mengen und Preise können fehlerhaft erkannt werden und müssen vor dem Speichern geprüft werden. Beim Scan werden die OCR-Bibliothek und ggf. Sprachdaten online geladen; die Bildverarbeitung läuft im Browser.

## Grenzen der Testversion

- Daten aus früheren Testversionen bleiben erhalten: Der Browser-Speicherschlüssel wurde **nicht geändert**.
- Noch **keine Synchronisierung zwischen mehreren Handys**, kein gemeinsamer Echtzeit-Chat und keine offiziellen Wacken-Spielplandaten.
- Lokale Daten können beim Löschen der Browserdaten verloren gehen. In Einstellungen eine JSON-Sicherung exportieren.
- Keine persönliche oder gemeinsame Geldabrechnung als verifiziert betrachten; es handelt sich um einen Prototyp.

Öffentliche Demo: https://rasha9311-cyber.github.io/FestivalCrew-Web/

Änderungsdatum: 2026-11-23
