# Day at a Glance Dashboard

A clean, responsive dashboard prototype ready for data.

## Setup

1. Enable GitHub Pages:
   - Go to repo Settings → Pages
   - Source: `main` → `/docs`
   - Save

2. Access at: `https://paigeabbot.github.io/paige-pa-design/`

## Data Files (edit these to update the dashboard)

All data lives in `/docs/data/`:

| File | Purpose |
|------|---------|
| `weather.json` | Current weather |
| `forecast.json` | 4-day forecast |
| `tasks.json` | Todo list |
| `events.json` | Today's timeline |
| `notes.json` | Quick notes |

## Editing Data

Simply edit any JSON file and push. The dashboard updates automatically.

### Example - Update weather:
```json
{
    "current": {
        "temp": 72,
        "unit": "F",
        "icon": "sunny",
        "description": "Sunny and pleasant"
    }
}
```

### Available weather icons:
- `sunny` → ☀️
- `cloudy` → ⛅
- ` rainy` → 🌧️
- `snowy` → ❄️
- `stormy` → ⛈️

## Customization

Edit these files to customize:
- `styles.css` → Colors, spacing, fonts
- `index.html` → Layout, sections
- `script.js` → Data fetching logic

## No Personal Info

This is a prototype. All data is sample/placeholder.
Replace with real data when ready.
