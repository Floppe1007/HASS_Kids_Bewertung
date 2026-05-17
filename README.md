# Family Task Card

Eine Home Assistant Lovelace Card für Familien: Kinder sammeln Medienzeit durch das Abhaken von Aufgaben.

## Installation via HACS

1. HACS → Integrationen → ⋮ → Benutzerdefinierte Repositories
2. URL: `https://github.com/Floppe1007/HASS_Kids_Bewertung`
3. Kategorie: **Lovelace**
4. Installieren → HA neu starten

## HA-Helfer anlegen (pro Kind)

In HA → Einstellungen → Geräte & Dienste → Helfer:

1. **Zahl** (`input_number`) — z.B. `max_media_time`, Min: 0, Max: 9999, Schrittweite: 1
2. **Text** (`input_text`) — z.B. `max_task_state`, **Max. Länge: 255**

## Karte hinzufügen

Die Karte erscheint nach der Installation automatisch im HA-Karten-Picker unter dem Namen **Family Task Card** — kein YAML nötig.

1. Dashboard bearbeiten → Karte hinzufügen → "Family Task Card" suchen
2. Im Konfigurations-Dialog Entitäten, PIN und Einlöse-Beträge eintragen
3. Aufgaben direkt im Editor anlegen (Icon aus MDI-Bibliothek, Name, Minuten)

Alternativ per YAML:

```yaml
type: custom:family-task-card
name: Max
entity_media_time: input_number.max_media_time
entity_task_state: input_text.max_task_state
pin: "1234"
redeem_amounts: [30, 60]
tasks:
  - id: teeth
    name: Zähne putzen
    icon: mdi:toothbrush-paste
    minutes: 10
  - id: room
    name: Zimmer aufräumen
    icon: mdi:broom
    minutes: 20
  - id: homework
    name: Hausaufgaben
    icon: mdi:book-open-variant
    minutes: 15
```

## Verhalten

| Aktion | Beschreibung |
|---|---|
| Aufgabe antippen | Häkchen setzen/entfernen, Medienzeit sofort addiert/subtrahiert |
| ＋ Neue Aufgabe | PIN-geschützt — Eltern können Aufgaben direkt in der Karte hinzufügen |
| Täglicher Reset | Häkchen werden automatisch jeden Tag geleert; Medienzeit akkumuliert weiter |
| Einlösen (PIN) | Eltern wählen vordefinierten Betrag oder lösen alles ein |
| Reset (PIN) | Setzt Häkchen **und Medienzeit-Zähler** auf 0 |

- **Separate Instanzen** — pro Kind eine eigene Karte mit eigenen Entitäten
- **Icons** — aus der MDI-Standardbibliothek (`mdi:...`), wählbar über den integrierten Icon-Picker
