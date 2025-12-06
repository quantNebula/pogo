# Events Data Documentation

## Overview

The Events endpoint provides comprehensive information about current and upcoming Pokémon GO events, including detailed event-specific data for Community Days, Raid Battles, Spotlight Hours, and more.

## Accessing the Data

- **Formatted:** [events.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.json)
- **Minified:** [events.min.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json)

## Data Structure

The endpoint returns an **array** of event objects, where each object represents a current or upcoming event.

### Base Event Object

All events contain these base fields:

| Field | Type | Description |
|-------|------|-------------|
| `eventID` | string | Unique identifier for the event |
| `name` | string | Display name of the event |
| `eventType` | string | Type of event (see Event Types section) |
| `heading` | string | Category heading for the event |
| `link` | string | URL to detailed event information on LeekDuck |
| `image` | string | URL to the event banner image |
| `start` | string | ISO 8601 date string for event start time |
| `end` | string | ISO 8601 date string for event end time |
| `timezone` | string \| null | Timezone indicator ("Local Time", "PST", "PDT", "EST", "EDT", "UTC", or null) |
| `extraData` | object \| undefined | Additional event-specific data (structure varies by event type) |

### Event Types

Common event types include:

- `community-day` - Monthly Community Day events
- `pokemon-spotlight-hour` - Weekly one-hour events featuring a specific Pokémon
- `raid-battles` - Special raid events or raid boss rotations
- `raid-hour` - Weekly one-hour raid events
- `research-day` - Special research task events
- `research-breakthrough` - Research Breakthrough reward rotations
- `event` - General events (seasonal, themed, etc.)
- `go-battle-league` - GO Battle League seasons and special cups
- `city-safari` - Location-specific ticketed events
- `max-battles` - Max Battle events
- `max-mondays` - Weekly Max Battle events
- `pokestop-showcase` - PokéStop Showcase events

### Extra Data Structures

The `extraData` object contains event-type-specific information. All events include a `generic` object with basic flags.

#### Generic Data (All Events)

```json
"extraData": {
    "generic": {
        "hasSpawns": boolean,
        "hasFieldResearchTasks": boolean
    }
}
```

#### Community Day Extra Data

```json
"extraData": {
    "communityday": {
        "spawns": [
            {
                "name": "Pokémon name",
                "image": "URL to Pokémon icon"
            }
        ],
        "bonuses": [
            {
                "text": "Bonus description",
                "image": "URL to bonus icon"
            }
        ],
        "bonusDisclaimers": ["Disclaimer text"],
        "shinies": [
            {
                "name": "Pokémon name",
                "image": "URL to shiny Pokémon icon"
            }
        ],
        "specialresearch": [
            {
                "name": "Research name (step/total)",
                "step": 1,
                "tasks": [
                    {
                        "text": "Task description",
                        "reward": {
                            "text": "Reward name",
                            "image": "URL to reward icon"
                        }
                    }
                ],
                "rewards": [
                    {
                        "text": "Reward name or quantity",
                        "image": "URL to reward icon"
                    }
                ]
            }
        ]
    }
}
```

#### Spotlight Hour Extra Data

```json
"extraData": {
    "spotlight": {
        "featuredPokemon": "Pokémon name",
        "bonusText": "Bonus description",
        "canBeShiny": boolean,
        "evolutionFamily": ["Pokémon1", "Pokémon2", "Pokémon3"]
    }
}
```

#### Raid Battles Extra Data

```json
"extraData": {
    "raidbattles": {
        "bosses": ["Boss1", "Boss2"],
        "shinies": ["Pokémon1", "Pokémon2"]
    }
}
```

#### Research Breakthrough Extra Data

```json
"extraData": {
    "breakthrough": {
        "pokemon": [
            {
                "name": "Pokémon name",
                "image": "URL to Pokémon icon",
                "canBeShiny": boolean
            }
        ]
    }
}
```

#### Promo Codes (Research Events)

```json
"extraData": {
    "promocodes": ["CODE1", "CODE2"]
}
```

## Example Data

```json
[
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
                "bonusDisclaimers": ["Disclaimers..."],
                "shinies": [
                    {
                        "name": "Vanillite",
                        "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_582_00_shiny.png"
                    }
                ],
                "specialresearch": []
            }
        }
    },
    {
        "eventID": "quaxly-spotlight-hour-december-2025",
        "name": "Quaxly Spotlight Hour",
        "eventType": "pokemon-spotlight-hour",
        "heading": "Pokémon Spotlight Hour",
        "link": "https://leekduck.com/events/quaxly-spotlight-hour-december-2025/",
        "image": "https://cdn.leekduck.com/assets/img/events/pokemonspotlighthours.jpg",
        "start": "2025-12-10T18:00:00.000",
        "end": "2025-12-10T19:00:00.000",
        "timezone": "Local Time",
        "extraData": {
            "generic": {
                "hasSpawns": false,
                "hasFieldResearchTasks": false
            },
            "spotlight": {
                "featuredPokemon": "Quaxly",
                "bonusText": "2× Stardust for catching Pokémon",
                "canBeShiny": true,
                "evolutionFamily": ["Quaxly", "Quaxwell", "Quaquaval"]
            }
        }
    }
]
```

## Usage Examples

### JavaScript

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json')
  .then(response => response.json())
  .then(events => {
    // Get current events (happening now)
    const now = new Date();
    const currentEvents = events.filter(event => {
      const start = new Date(event.start);
      const end = new Date(event.end);
      return start <= now && now <= end;
    });
    
    // Get upcoming Community Days
    const communityDays = events.filter(event =>
      event.eventType === 'community-day' && new Date(event.start) > now
    );
    
    // Get today's Spotlight Hour
    const today = now.toISOString().split('T')[0];
    const spotlightHour = events.find(event =>
      event.eventType === 'pokemon-spotlight-hour' &&
      event.start.startsWith(today)
    );
    
    // Find events with spawns
    const spawnEvents = events.filter(event =>
      event.extraData?.generic?.hasSpawns === true
    );
    
    // Get events with promo codes
    const promoEvents = events.filter(event =>
      event.extraData?.promocodes && event.extraData.promocodes.length > 0
    );
    
    // Extract all shiny Pokémon from Community Days
    const cdShinies = events
      .filter(e => e.eventType === 'community-day')
      .flatMap(e => e.extraData?.communityday?.shinies || []);
  });
```

### Python

```python
import requests
from datetime import datetime, timezone

response = requests.get('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json')
events = response.json()

# Parse and sort events by start time
for event in events:
    event['start_dt'] = datetime.fromisoformat(event['start'].replace('Z', '+00:00'))
    event['end_dt'] = datetime.fromisoformat(event['end'].replace('Z', '+00:00'))

events_sorted = sorted(events, key=lambda x: x['start_dt'])

# Get active events
now = datetime.now(timezone.utc)
active_events = [
    event for event in events
    if event['start_dt'] <= now <= event['end_dt']
]

# Group events by type
events_by_type = {}
for event in events:
    event_type = event['eventType']
    if event_type not in events_by_type:
        events_by_type[event_type] = []
    events_by_type[event_type].append(event)

# Get next week's events
from datetime import timedelta
next_week = now + timedelta(days=7)
upcoming_week = [
    event for event in events
    if now <= event['start_dt'] <= next_week
]

# Extract all raid bosses from raid battle events
raid_bosses = set()
for event in events:
    if event['eventType'] == 'raid-battles':
        bosses = event.get('extraData', {}).get('raidbattles', {}).get('bosses', [])
        raid_bosses.update(bosses)

# Find events with special research
special_research_events = []
for event in events:
    if 'communityday' in event.get('extraData', {}):
        sr = event['extraData']['communityday'].get('specialresearch', [])
        if sr:
            special_research_events.append({
                'name': event['name'],
                'research': sr
            })

# Get all bonuses from active Community Days
cd_bonuses = []
for event in active_events:
    if event['eventType'] == 'community-day':
        bonuses = event.get('extraData', {}).get('communityday', {}).get('bonuses', [])
        cd_bonuses.extend([b['text'] for b in bonuses])

# Check if a specific Pokémon is featured in any event
def find_pokemon_events(pokemon_name):
    matching_events = []
    for event in events:
        extra = event.get('extraData', {})
        
        # Check Community Day spawns
        if 'communityday' in extra:
            spawns = extra['communityday'].get('spawns', [])
            if any(s['name'] == pokemon_name for s in spawns):
                matching_events.append(event)
        
        # Check Spotlight Hour
        if 'spotlight' in extra:
            if extra['spotlight'].get('featuredPokemon') == pokemon_name:
                matching_events.append(event)
    
    return matching_events
```

## Common Use Cases

1. **Event Calendar** - Display all current and upcoming events
2. **Active Event Tracking** - Show what's happening right now
3. **Community Day Planning** - Help players prepare for Community Days with spawn lists and bonuses
4. **Shiny Tracking** - Identify which Pokémon can be shiny during events
5. **Bonus Notifications** - Alert players about active bonuses (2x XP, 2x Stardust, etc.)
6. **Raid Planning** - Show current raid bosses and schedules
7. **Spotlight Hour Reminders** - Notify players of weekly Spotlight Hours
8. **Promo Code Distribution** - Share active promo codes from research events
9. **Research Planning** - Display special research tasks and rewards
10. **Timezone Handling** - Account for local time vs fixed timezone events

## Timezone Values

- **"Local Time"** - Event times are in the player's local timezone
- **"PST"** / **"PDT"** - Pacific Time (UTC-8 / UTC-7)
- **"EST"** / **"EDT"** - Eastern Time (UTC-5 / UTC-4)
- **"UTC"** - Coordinated Universal Time
- **null** - No specific timezone information available

## Notes

- Event times use ISO 8601 format without timezone indicators (times are as specified in the `timezone` field)
- Most events use "Local Time" meaning they start/end at the same local time worldwide
- Some global events use fixed timezones (usually Pacific Time)
- Events are updated regularly as Niantic announces new content
- The `extraData` field is only populated by the detailed scraping process
- Not all events have `extraData` - check for existence before accessing nested properties
- Community Day events typically run for 3 hours (2 PM - 5 PM local time)
- Spotlight Hour events are always 1 hour (6 PM - 7 PM local time)
- Raid Hour events are 1 hour (6 PM - 7 PM local time)
- Event data includes both currently running and future announced events
- Past events are not included in the data
