# pogo API Reference

**Complete data reference for Pokémon GO game data scraped from LeekDuck**
## Overview

pogo provides five JSON endpoints containing live Pokémon GO data. Each endpoint is available in both formatted (`.json`) and minified (`.min.json`) versions.

**Base URL:** `https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/`

### Available Endpoints

| Endpoint | Formatted | Minified | Data Type |
|----------|-----------|----------|-----------|
| Combined | `combined.json` | `combined.min.json` | Object with all data categories |
| Eggs | `eggs.json` | `eggs.min.json` | Array of Pokémon objects |
| Raids | `raids.json` | `raids.min.json` | Array of raid boss objects |
| Research | `research.json` | `research.min.json` | Object with seasonal info and task arrays |
| Rocket Lineups | `rocketLineups.json` | `rocketLineups.min.json` | Array of Rocket member objects |
| Events | `events.json` | `events.min.json` | Array of event objects |

## Data Endpoints

### Quick Access URLs

```
Combined (minified):  https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/combined.min.json
Eggs (minified):     https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/eggs.min.json
Raids (minified):    https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/raids.min.json
Research (minified):  https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/research.min.json
Rocket Lineups (minified):  https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/rocketLineups.min.json
Events (minified):   https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json
```

## Combined Data

**What it contains:** A single JSON file containing all Pokémon GO data from all categories in one convenient endpoint.
**Data structure:** Object with five properties (events, raids, research, eggs, rocketLineups)

### Combined Object Schema
```typescript
{
  events: Array<EventObject>,           // All events data
  raids: Array<RaidObject>,             // All raid bosses data
  research: ResearchObject,             // Research tasks and seasonal info
  eggs: Array<EggObject>,               // All egg hatches data
  rocketLineups: Array<RocketObject>    // Team GO Rocket lineups data
}
```

### Usage Example
```javascript
// Fetch all Pokémon GO data at once
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/combined.json')
  .then(response => response.json())
  .then(data => {
    console.log('Events:', data.events);
    console.log('Current raids:', data.raids);
    console.log('Field research:', data.research);
    console.log('Egg hatches:', data.eggs);
    console.log('Rocket lineups:', data.rocketLineups);
  });
```

## Eggs Data

**What it contains:** Information about which Pokémon can hatch from different egg types, including rarity, CP ranges, and special flags.
**Data structure:** Array of Pokémon objects

### Pokémon Object Schema
```typescript
{
  name: string,                    // Pokémon name (e.g., "Bulbasaur")
  eggType: string,                 // Egg distance (e.g., "1 km", "2 km", "5 km", "7 km", "10 km", "12 km")
  isAdventureSync: boolean,        // Available from Adventure Sync rewards
  image: string,                   // URL to Pokémon icon
  canBeShiny: boolean,             // Can hatch as shiny
  combatPower: {
    min: number,                   // Minimum hatch CP
    max: number                    // Maximum hatch CP
  },
  isRegional: boolean,             // Region-exclusive Pokémon
  isGiftExchange: boolean,         // Available from Gift Exchange eggs
  rarity: number,                  // Numeric rarity (1-5)
  rarityTier: string              // Human-readable tier ("Very Rare", "Rare", etc.)
}
```

### Rarity Values
- **5** = Ultra Rare
- **4** = Very Rare
- **3** = Uncommon
- **2** = Common
- **1** = Very Common

### Example

```json
{
  "name": "Bulbasaur",
  "eggType": "1 km",
  "isAdventureSync": false,
  "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm1.icon.png",
  "canBeShiny": true,
  "combatPower": {
    "min": 637,
    "max": 637
  },
  "isRegional": false,
  "isGiftExchange": false,
  "rarity": 4,
  "rarityTier": "Very Rare"
}
```

### Key Use Cases
- Filter by egg type to show available hatches
- Identify shiny-eligible Pokémon (`canBeShiny: true`)
- Find Adventure Sync rewards (`isAdventureSync: true`)
- Locate regional exclusives (`isRegional: true`)
- Sort by rarity for hatch prioritization

## Raids Data

**What it contains:** Current raid boss information across all tiers, including CP ranges, types, weather boosts, and shiny availability.
**Data structure:** Array of raid boss objects

### Raid Boss Object Schema

```typescript
{
  name: string,                    // Raid boss name
  tier: string,                    // "Tier 1", "Tier 3", "Tier 5", "Mega", "Mega Legendary"
  canBeShiny: boolean,             // Shiny available from this raid
  types: [                         // Array of Pokémon types
    {
      name: string,                // Type name (e.g., "fire", "water", "dragon")
      image: string                // URL to type icon
    }
  ],
  combatPower: {
    normal: {
      min: number,                 // Min CP (non-boosted)
      max: number                  // Max CP (non-boosted)
    },
    boosted: {
      min: number,                 // Min CP (weather boosted)
      max: number                  // Max CP (weather boosted)
    }
  },
  boostedWeather: [                // Weather conditions that boost this Pokémon
    {
      name: string,                // Weather name (e.g., "sunny", "rainy", "cloudy")
      image: string                // URL to weather icon
    }
  ],
  image: string                    // URL to Pokémon icon
}
```

### Raid Tiers

- **Tier 1** - 1-star (easiest, soloable)
- **Tier 3** - 3-star (moderate, may need 2-3 players)
- **Tier 5** - 5-star (Legendary, requires group)
- **Mega** - Mega Evolution raids
- **Mega Legendary** - Mega Legendary raids

### Weather Conditions

- sunny / clear
- partly cloudy
- cloudy
- rainy
- windy
- snow
- fog

### Example

```json
{
  "name": "Geodude",
  "tier": "Tier 1",
  "canBeShiny": true,
  "types": [
    {
      "name": "rock",
      "image": "https://leekduck.com/assets/img/types/rock.png"
    },
    {
      "name": "ground",
      "image": "https://leekduck.com/assets/img/types/ground.png"
    }
  ],
  "combatPower": {
    "normal": {
      "min": 688,
      "max": 739
    },
    "boosted": {
      "min": 860,
      "max": 923
    }
  },
  "boostedWeather": [
    {
      "name": "partly cloudy",
      "image": "https://leekduck.com/assets/img/weather/partlycloudy.png"
    },
    {
      "name": "sunny",
      "image": "https://leekduck.com/assets/img/weather/sunny.png"
    }
  ],
  "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pm74.icon.png"
}
```

### Key Use Cases

- Filter by tier (`tier === "Tier 5"` for Legendaries)
- Check weather boost eligibility
- Verify CP is within expected range
- Build type-effective counter teams
- Track shiny-eligible raid bosses

## Research Data

**What it contains:** Current Field Research tasks with rewards, plus seasonal breakthrough and Spinda pattern information.
**Data structure:** Object containing `seasonalInfo` and `tasks` array

### Root Object Schema
```typescript
{
  seasonalInfo: {
    breakthroughPokemon: string[],  // Research Breakthrough encounter names
    spindaPatterns: number[],       // Available Spinda pattern numbers
    season: string | null           // Current season name or null
  },
  tasks: Task[]                     // Array of field research tasks
}
```

### Task Object Schema

```typescript
{
  text: string,                     // Task description (e.g., "Catch 5 Pokémon")
  type?: string,                    // Task category (e.g., "catch", "throw", "battle")
  rewards: Reward[]                 // Array of possible rewards
}
```

### Reward Object Schema

**Encounter Rewards:**

```typescript
{
  type: "encounter",
  name: string,                     // Pokémon name
  image: string,                    // URL to Pokémon icon
  canBeShiny: boolean,              // Shiny eligible
  combatPower: {
    min: number,                    // Min CP (level 15)
    max: number                     // Max CP (level 15)
  }
}
```

**Item Rewards:**

```typescript
{
  type: "item",
  name: string,                     // Item name with quantity (e.g., "×10")
  image: string,                    // URL to item icon
  quantity: number                  // Number of items
}
```

### Task Types

Common task categories:
- `catch` - Catching Pokémon
- `throw` - Making throws (Nice, Great, Excellent)
- `battle` - Raids, gyms, GO Battle League
- `buddy` - Buddy interactions
- `evolve` - Evolving Pokémon
- `power` - Powering up Pokémon
- `hatch` - Hatching eggs
- `photo` - Taking snapshots
- `send` - Sending gifts

### Example

```json
{
  "seasonalInfo": {
    "breakthroughPokemon": ["Galarian Mr"],
    "spindaPatterns": [6, 7],
    "season": null
  },
  "tasks": [
    {
      "text": "Catch 5 different species of Pokémon",
      "rewards": [
        {
          "type": "encounter",
          "name": "Nacli",
          "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm932.icon.png",
          "canBeShiny": false,
          "combatPower": {
            "min": 381,
            "max": 414
          }
        }
      ]
    },
    {
      "text": "Catch 10 Pokémon",
      "type": "catch",
      "rewards": [
        {
          "type": "item",
          "name": "×200",
          "image": "https://cdn.leekduck.com/assets/img/items/Stardust.png",
          "quantity": 200
        }
      ]
    }
  ]
}
```

### Key Use Cases

- Filter tasks by reward type (`reward.type === "encounter"` or `"item"`)
- Find shiny-eligible encounters (`canBeShiny: true`)
- Identify high-value tasks (Rare Candy, Stardust, rare Pokémon)
- Check current Spinda patterns available
- View Research Breakthrough rewards

## Rocket Lineups Data

**What it contains:** Team GO Rocket encounter information including Giovanni, Leaders (Cliff, Arlo, Sierra), and type-specialized Grunts with their possible Pokémon lineups.
**Data structure:** Array of Rocket member objects

### Rocket Member Object Schema

```typescript
{
  name: string,                     // Member name (e.g., "Giovanni", "Fire-type Male Grunt")
  title: string,                    // "Team GO Rocket Boss" | "Team GO Rocket Leader" | "Team GO Rocket Grunt"
  type: string,                     // Type specialization for grunts (e.g., "fire", "water") or "" for leaders
  gender: "Male" | "Female",        // Gender
  firstPokemon: Pokemon[],          // Possible Pokémon in slot 1
  secondPokemon: Pokemon[],         // Possible Pokémon in slot 2
  thirdPokemon: Pokemon[]           // Possible Pokémon in slot 3
}
```

### Pokémon Object Schema

```typescript
{
  name: string,                     // Pokémon name
  image: string,                    // URL to Pokémon icon
  types: string[],                  // Array of type strings (e.g., ["fire", "flying"])
  isEncounter: boolean,             // Can be caught after defeating Rocket member
  canBeShiny: boolean               // Can be shiny when encountered
}
```

### Member Hierarchy

1. **Giovanni** - Team GO Rocket Boss (requires Super Rocket Radar)
2. **Leaders** - Cliff, Arlo, Sierra (require Rocket Radar)
3. **Grunts** - Type-specialized members (common at invaded PokéStops)

### Grunt Types

- normal, fire, water, grass, electric, ice, fighting, poison, ground, flying, psychic, bug, rock, ghost, dragon, dark, steel, fairy

### Example

```json
{
  "name": "Giovanni",
  "title": "Team GO Rocket Boss",
  "type": "",
  "gender": "Male",
  "firstPokemon": [
    {
      "name": "Persian",
      "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm53.icon.png",
      "types": ["normal"],
      "isEncounter": false,
      "canBeShiny": false
    }
  ],
  "secondPokemon": [
    {
      "name": "Kangaskhan",
      "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm115.icon.png",
      "types": ["normal"],
      "isEncounter": false,
      "canBeShiny": false
    }
  ],
  "thirdPokemon": [
    {
      "name": "Tornadus (Incarnate)",
      "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm641.fINCARNATE.icon.png",
      "types": ["flying"],
      "isEncounter": true,
      "canBeShiny": false
    }
  ]
}
```

### Key Use Cases

- Prepare counter teams based on member type
- Identify catchable Shadow Pokémon (`isEncounter: true`)
- Track shiny Shadow Pokémon availability
- Filter by member title (Boss, Leader, Grunt)
- Build type-effective counters for battles

---

## Events Data

**What it contains:** Current and upcoming Pokémon GO events with detailed event-specific information including spawns, bonuses, raids, and special research.

**Data structure:** Array of event objects

### Base Event Object Schema

All events include these fields:

```typescript
{
  eventID: string,                  // Unique event identifier
  name: string,                     // Display name
  eventType: string,                // Event category (see Event Types below)
  heading: string,                  // Category heading
  link: string,                     // URL to LeekDuck event page
  image: string,                    // Event banner image URL
  start: string,                    // ISO 8601 start date/time
  end: string,                      // ISO 8601 end date/time
  timezone: string | null,          // "Local Time" | "PST" | "PDT" | "EST" | "EDT" | "UTC" | null
  extraData?: ExtraData             // Event-specific data (optional)
}
```

### Event Types

- `community-day` - Monthly Community Day events
- `pokemon-spotlight-hour` - Weekly 1-hour featured Pokémon
- `raid-battles` - Raid events and boss rotations
- `raid-hour` - Weekly 1-hour raid events
- `research-day` - Special research task events
- `research-breakthrough` - Breakthrough reward rotations
- `event` - General/seasonal events
- `go-battle-league` - PvP seasons and cups
- `city-safari` - Location-specific ticketed events
- `max-battles` - Max Battle events
- `max-mondays` - Weekly Max Battle events
- `pokestop-showcase` - PokéStop Showcase events

### Extra Data Structures

#### Generic Data (All Events)

```typescript
extraData: {
  generic: {
    hasSpawns: boolean,             // Event features increased spawns
    hasFieldResearchTasks: boolean  // Event has special field research
  }
}
```

#### Community Day Extra Data

```typescript
extraData: {
  communityday: {
    spawns: [
      {
        name: string,               // Featured Pokémon name
        image: string               // Pokémon icon URL
      }
    ],
    bonuses: [
      {
        text: string,               // Bonus description
        image: string               // Bonus icon URL
      }
    ],
    bonusDisclaimers: string[],     // Array of disclaimer texts
    shinies: [
      {
        name: string,               // Pokémon name
        image: string               // Shiny icon URL
      }
    ],
    specialresearch: [
      {
        name: string,               // Research name (e.g., "Community Day (1/5)")
        step: number,               // Step number
        tasks: [
          {
            text: string,           // Task description
            reward: {
              text: string,         // Reward text
              image: string         // Reward icon URL
            }
          }
        ],
        rewards: [
          {
            text: string,           // Completion reward text
            image: string           // Reward icon URL
          }
        ]
      }
    ]
  }
}
```

#### Spotlight Hour Extra Data

```typescript
extraData: {
  spotlight: {
    featuredPokemon: string,        // Featured Pokémon name
    bonusText: string,              // Active bonus description
    canBeShiny: boolean,            // Featured Pokémon can be shiny
    evolutionFamily: string[]       // Evolution line (e.g., ["Bulbasaur", "Ivysaur", "Venusaur"])
  }
}
```

#### Raid Battles Extra Data

```typescript
extraData: {
  raidbattles: {
    bosses: string[],               // Array of raid boss names
    shinies: string[]               // Array of shiny-eligible Pokémon names
  }
}
```

#### Research Breakthrough Extra Data

```typescript
extraData: {
  breakthrough: {
    pokemon: [
      {
        name: string,               // Breakthrough encounter name
        image: string,              // Pokémon icon URL
        canBeShiny: boolean         // Shiny eligible
      }
    ]
  }
}
```

#### Promo Codes (Research Events)

```typescript
extraData: {
  promocodes: string[]              // Array of redeemable promo codes
}
```

### Example

```json
{
  "eventID": "december-communityday2025",
  "name": "December Community Day 2025",
  "eventType": "community-day",
  "heading": "Community Day",
  "link": "https://leekduck.com/events/december-communityday2025/",
  "image": "https://cdn.leekduck.com/assets/img/events/article-images/2025/2025-12-06-december-communityday2025/december-2025-community-day.jpg",
  "start": "2025-12-06T14:00:00.000",
  "end": "2025-12-07T17:00:00.000",
  "timezone": "Local Time",
  "extraData": {
    "generic": {
      "hasSpawns": true,
      "hasFieldResearchTasks": false
    },
    "communityday": {
      "spawns": [
        {
          "name": "Vanillite",
          "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_582_00.png"
        }
      ],
      "bonuses": [
        {
          "text": "2x XP for catching Pokémon",
          "image": "https://cdn.leekduck.com/assets/img/events/bonuses/xp.png"
        }
      ],
      "bonusDisclaimers": [],
      "shinies": [
        {
          "name": "Vanillite",
          "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_582_00_shiny.png"
        }
      ],
      "specialresearch": []
    }
  }
}
```

### Key Use Cases

- Filter events by type (`eventType === "community-day"`)
- Find active events (compare current time to `start` and `end`)
- Display upcoming events (filter by future `start` dates)
- Extract Community Day spawns and bonuses
- Show Spotlight Hour featured Pokémon
- List current raid bosses from raid events
- Display promo codes from research events
- Handle timezone conversions based on `timezone` field

---

## Common Patterns

### Filtering Active vs Upcoming

```javascript
const now = new Date();
const active = items.filter(item => {
  const start = new Date(item.start);
  const end = new Date(item.end);
  return start <= now && now <= end;
});

const upcoming = items.filter(item => {
  const start = new Date(item.start);
  return start > now;
});
```

### Checking Shiny Eligibility

All datasets use `canBeShiny: boolean` to indicate shiny availability:

```javascript
// Eggs
const shinyEggs = eggs.filter(egg => egg.canBeShiny);

// Raids
const shinyRaids = raids.filter(raid => raid.canBeShiny);

// Research
const shinyResearch = research.tasks.filter(task =>
  task.rewards.some(r => r.type === 'encounter' && r.canBeShiny)
);

// Rocket Lineups
const shinyShadows = lineups.flatMap(member =>
  [...member.firstPokemon, ...member.secondPokemon, ...member.thirdPokemon]
    .filter(p => p.isEncounter && p.canBeShiny)
);
```

### Type-Based Filtering

```javascript
// Find Pokémon by type in raids
const dragonRaids = raids.filter(raid =>
  raid.types.some(t => t.name === 'dragon')
);

// Find Rocket members by type
const fireGrunts = lineups.filter(member =>
  member.type === 'fire'
);
```

### Reward Type Filtering

```javascript
// Research: Find encounter vs item rewards
const encounterTasks = research.tasks.filter(task =>
  task.rewards.some(r => r.type === 'encounter')
);

const itemTasks = research.tasks.filter(task =>
  task.rewards.some(r => r.type === 'item')
);

// Find tasks that reward specific items
const rareCandyTasks = research.tasks.filter(task =>
  task.rewards.some(r =>
    r.type === 'item' && r.image.includes('Rare%20Candy')
  )
);
```

### CP Range Validation

```javascript
// Check if caught Pokémon CP is within expected range
function isValidCP(pokemon, cp, isWeatherBoosted = false) {
  // For raids
  const range = isWeatherBoosted 
    ? pokemon.combatPower.boosted 
    : pokemon.combatPower.normal;
  
  // For eggs/research
  // const range = pokemon.combatPower;
  
  return cp >= range.min && cp <= range.max;
}
```

### Grouping by Category

```javascript
// Group by any categorical field
function groupBy(array, key) {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) result[group] = [];
    result[group].push(item);
    return result;
  }, {});
}

// Usage examples
const eggsByType = groupBy(eggs, 'eggType');
const raidsByTier = groupBy(raids, 'tier');
const eventsByType = groupBy(events, 'eventType');
const tasksByType = groupBy(research.tasks, 'type');
```

## Notes and Best Practices

### Date/Time Handling

- Event dates use ISO 8601 format without timezone indicators
- The `timezone` field indicates how to interpret the date/time
- **"Local Time"** means the event occurs at that time in every timezone worldwide
- Fixed timezones (PST, EDT, etc.) mean the event occurs at that specific time globally

### Boolean Flags

Common boolean flags across datasets:
- `canBeShiny` - Indicates shiny availability
- `isEncounter` - Indicates catchable encounters (Rocket Lineups)
- `isAdventureSync` - Adventure Sync eligibility (Eggs)
- `isRegional` - Regional exclusivity (Eggs)
- `hasSpawns` / `hasFieldResearchTasks` - Event features (Events)

### Optional Fields

- The `type` field in Research tasks is optional and may not be present on all tasks
- The `extraData` field in Events is optional and only present after detail scraping
- Check for field existence before accessing nested properties

### Array Handling

Many rewards and options allow multiple possibilities:
- Research tasks can have multiple possible rewards (one is selected randomly)
- Rocket members have multiple possible Pokémon per slot (one appears in each battle)
- Events can have multiple spawns, bonuses, shinies, etc.

### Error Handling

When consuming this data:
- Handle missing optional fields gracefully
- Validate date parsing before comparisons
- Check array lengths before accessing elements
- Handle image loading failures for external URLs
