# pogo

A Pokémon GO data scraping pipeline that pulls current game data from LeekDuck and provides it as consumable JSON endpoints.

## Overview

pogo scrapes live Pokémon GO data and provides clean, structured JSON files for:

- **Eggs**: What Pokémon hatch from which egg types
- **Events**: Current and upcoming in-game events with detailed information
- **Raids**: Current raid bosses across all tiers
- **Research**: Field research tasks and their rewards
- **Rocket Lineups**: Team GO Rocket member teams and encounter rewards

## Quick Start

### Accessing the Data

All data files are available via raw GitHub URLs:

| Data Type | Formatted URL | Minified URL |
|-----------|--------------|--------------||
| **Combined (All Data)** | [combined.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/combined.json) | [combined.min.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/combined.min.json) |
| **Eggs** | [eggs.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/eggs.json) | [eggs.min.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/eggs.min.json) |
| **Events** | [events.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.json) | [events.min.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json) |
| **Raids** | [raids.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/raids.json) | [raids.min.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/raids.min.json) |
| **Research** | [research.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/research.json) | [research.min.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/research.min.json) |
| **Rocket Lineups** | [rocketLineups.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/rocketLineups.json) | [rocketLineups.min.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/rocketLineups.min.json) |

### Example Usage

```javascript
// Fetch all data at once using the combined endpoint
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/combined.min.json')
  .then(response => response.json())
  .then(data => {
    const tier5Raids = data.raids.filter(raid => raid.tier === 'Tier 5');
    const communityDays = data.events.filter(e => e.eventType === 'community-day');
    console.log('Current T5 bosses:', tier5Raids.map(r => r.name));
    console.log('Upcoming Community Days:', communityDays.length);
  });

// Or fetch individual endpoints
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/raids.min.json')
  .then(response => response.json())
  .then(raids => {
    const tier5Raids = raids.filter(raid => raid.tier === 'Tier 5');
    console.log('Current T5 bosses:', tier5Raids.map(r => r.name));
  });
```

```python
import requests

# Fetch all data at once
response = requests.get('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/combined.min.json')
data = response.json()

# Access all categories
events = data['events']
raids = data['raids']
research = data['research']
eggs = data['eggs']
rocket_lineups = data['rocketLineups']

# Find Community Day events
community_days = [e for e in events if e['eventType'] == 'community-day']
print(f"Upcoming Community Days: {len(community_days)}")
```

## Documentation

Detailed documentation for each data type:

- **[Eggs Documentation](Eggs.md)** - Egg hatches, rarity tiers, and Adventure Sync rewards
- **[Events Documentation](Events.md)** - Event types, extra data structures, and seasonal information
- **[Raids Documentation](Raids.md)** - Raid tiers, CP ranges, weather boosts, and type information
- **[Research Documentation](Research.md)** - Field research tasks, rewards, and seasonal breakthroughs
- **[Rocket Lineups Documentation](RocketLineups.md)** - Team GO Rocket encounters, leaders, and grunt types

## How It Works

The scraping pipeline runs in three stages:

### 1. Base Scraping (`npm run scrape`)

Runs `scrape.js` to collect baseline data:
- Scrapes current events, eggs, raids, research tasks, and Rocket lineups
- Writes both `.json` (formatted) and `.min.json` (minified) files to `files/` directory
- Creates a combined file (`combined.json` and `combined.min.json`) containing all scraped data in a single endpoint
- Uses `jsdom` to parse HTML from LeekDuck pages

### 2. Detail Scraping (`npm run detailedscrape`)

Runs `detailedscrape.js` to enrich event data:
- Requires `files/events.min.json` to exist
- Creates `files/temp/` directory
- Iterates through events and calls specialized scrapers based on event type:
  - `pages/detailed/generic.js` - **Always runs for all events**: checks for spawns section and field research tasks section
  - `pages/detailed/breakthrough.js` - Research Breakthrough reward details (for `research-breakthrough` events)
  - `pages/detailed/communityday.js` - Community Day spawns, bonuses, shinies, special research (for `community-day` events)
  - `pages/detailed/raidbattles.js` - Raid boss and shiny lists (for `raid-battles` events)
  - `pages/detailed/research.js` - Extracts promo codes from store redemption links (for `research` events)
  - `pages/detailed/spotlight.js` - Spotlight Hour featured Pokémon and bonus (for `pokemon-spotlight-hour` events)
- Writes per-event JSON files to `files/temp/`:
  - `<eventID>_generic.json` - Generic flags (all events)
  - `<eventID>.json` - Type-specific data (when applicable)
  - `<eventID>_codes.json` - Promo codes (research events only)

### 3. Detail Combination (`npm run combinedetails`)

Runs `combinedetails.js` to merge enriched data:
- Reads all files from `files/temp/`
- Merges detail data into corresponding events in `files/events.min.json`
- Populates `extraData` field with nested objects:
  - `generic` - Contains `hasSpawns` and `hasFieldResearchTasks` boolean flags (all events)
  - `breakthrough` - Research Breakthrough reward pool with shiny flags
  - `spotlight` - Featured Pokémon name, bonus description, shiny flag, and evolution family list
  - `communityday` - Spawns, bonuses, bonus disclaimers, shinies, and special research steps
  - `raidbattles` - Boss and shiny Pokémon lists
  - `promocodes` - Array of promotional codes for item redemption
- Rewrites `files/events.json` and `files/events.min.json` with merged data
- Cleans up `files/temp/` directory recursively

## Data Structure

Each data file contains an array of objects or structured data. The structure varies by data type:

### Simple Arrays
- **Eggs**: Array of Pokémon objects with egg type, rarity (1-5 scale with tier labels), CP ranges, shiny/regional flags, and Adventure Sync/Gift Exchange indicators
- **Raids**: Array of raid boss objects with tier, type icons, normal/boosted CP ranges, weather boost icons, and shiny availability

### Object with Metadata
- **Research**: Object containing:
  - `seasonalInfo` - Current season metadata:
    - `breakthroughPokemon` - Array of possible Research Breakthrough encounter Pokémon
    - `spindaPatterns` - Array of available Spinda pattern numbers
    - `season` - Current season name
  - `tasks` - Array of field research task objects with task text, type category, and reward details (encounters with CP ranges or items with quantities)

### Enriched Data
- **Events**: Array of event objects with base fields:
  - `eventID`, `name`, `eventType`, `heading`, `link`, `image`
  - `start`, `end` - ISO date strings
  - `timezone` - Timezone indicator ("Local Time", "PST", "PDT", "EST", "EDT", "UTC", or null)
  - `extraData` - Nested object with type-specific enrichment (see Detail Scraping section above)

### Hierarchical Data
- **Rocket Lineups**: Array of Rocket member objects with name, title, type, gender inference, and three battle slots each containing arrays of possible shadow Pokémon (with types, shiny flags, encounter rewards)

## Development

### Prerequisites

- Node.js (v14 or higher recommended)
- npm

### Dependencies

- `jsdom` (21.1.1) - HTML parsing and DOM manipulation
- `moment` (latest) - Date/time parsing and formatting

### Local Setup

```bash
# Clone the repository
git clone https://github.com/quantNebula/pogo.git
cd pogo

# Install dependencies
npm install

# Run the scraping pipeline
npm run scrape              # Base data collection
npm run detailedscrape      # Enrich event data (requires events.min.json)
npm run combinedetails      # Merge enriched data back into events

# Or run all three in sequence
npm run scrape && npm run detailedscrape && npm run combinedetails
```

### Project Structure

```
pogo/
├── files/                  # Output directory for JSON data
│   ├── eggs.json
│   ├── eggs.min.json
│   ├── events.json
│   ├── events.min.json
│   ├── raids.json
│   ├── raids.min.json
│   ├── research.json
│   ├── research.min.json
│   ├── rocketLineups.json
│   ├── rocketLineups.min.json
│   └── temp/               # Temporary files during detail scraping
├── pages/                  # Scraper modules
│   ├── detailed/           # Event detail scrapers
│   │   ├── breakthrough.js
│   │   ├── communityday.js
│   │   ├── generic.js
│   │   ├── raidbattles.js
│   │   ├── research.js
│   │   └── spotlight.js
│   ├── eggs.js
│   ├── events.js
│   ├── raids.js
│   ├── research.js
│   └── rocketLineups.js
├── combinedetails.js       # Merge enriched data
├── detailedscrape.js       # Event detail enrichment
├── scrape.js               # Main base scraper
├── package.json
└── README.md               # This file
```
