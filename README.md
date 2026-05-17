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

## Karten-Konfiguration (YAML)

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
    icon: "🦷"
    minutes: 10
  - id: room
    name: Zimmer aufräumen
    icon: "🛏"
    minutes: 20
  - id: homework
    name: Hausaufgaben
    icon: "📚"
    minutes: 15
```

## Verhalten

- **Aufgabe antippen** — Häkchen setzen/entfernen, Medienzeit wird sofort addiert/subtrahiert
- **Täglicher Reset** — Aufgaben-Häkchen werden automatisch jeden Tag geleert; Medienzeit akkumuliert
- **Einlösen (PIN)** — Eltern wählen vordefinierten Betrag oder lösen alles ein
- **Reset (PIN)** — Aufgaben manuell zurücksetzen
- **Separate Instanzen** — pro Kind eine eigene Karte mit eigenen Entitäten
