====================<COMBINED_API_DOCS>====================
<events>
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
</events>
<raids>
# Raids Data Documentation

## Overview

The Raids endpoint provides current raid boss information across all tiers in Pokémon GO, including CP ranges, type information, weather boosts, and shiny availability.

## Accessing the Data

- **Formatted:** [raids.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/raids.json)
- **Minified:** [raids.min.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/raids.min.json)

## Data Structure

The endpoint returns an **array** of raid boss objects, where each object represents a Pokémon currently available in raids.

### Raid Boss Object

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Name of the raid boss Pokémon |
| `tier` | string | Raid tier (e.g., "Tier 1", "Tier 3", "Tier 5", "Mega", "Mega Legendary") |
| `canBeShiny` | boolean | Whether the raid boss can be encountered as shiny |
| `types` | array | Array of type objects for the Pokémon |
| `types[].name` | string | Type name (e.g., "fire", "water", "psychic") |
| `types[].image` | string | URL to the type icon image |
| `combatPower` | object | CP ranges for catching the raid boss |
| `combatPower.normal` | object | CP range under normal weather |
| `combatPower.normal.min` | number | Minimum CP (normal) |
| `combatPower.normal.max` | number | Maximum CP (normal) |
| `combatPower.boosted` | object | CP range when weather boosted |
| `combatPower.boosted.min` | number | Minimum CP (boosted) |
| `combatPower.boosted.max` | number | Maximum CP (boosted) |
| `boostedWeather` | array | Array of weather conditions that boost this Pokémon |
| `boostedWeather[].name` | string | Weather condition name |
| `boostedWeather[].image` | string | URL to the weather icon image |
| `image` | string | URL to the Pokémon's icon image |

### Raid Tiers

- **Tier 1** - 1-star raids (easiest, soloable)
- **Tier 3** - 3-star raids (moderate difficulty)
- **Tier 5** - 5-star raids (Legendary Pokémon, requires group)
- **Mega** - Mega Evolution raids
- **Mega Legendary** - Mega Evolution of Legendary Pokémon

### Weather Conditions

Weather boosts increase the CP of caught raid bosses and make them more powerful:

- **Sunny** / **Clear**
- **Partly Cloudy**
- **Cloudy**
- **Rainy**
- **Windy**
- **Snow**
- **Fog**

## Example Data

```json
[
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
]
```

## Usage Examples

### JavaScript

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/raids.min.json')
  .then(response => response.json())
  .then(raids => {
    // Get all Tier 5 (Legendary) raids
    const legendaryRaids = raids.filter(raid => raid.tier === 'Tier 5');
    
    // Find shiny-eligible raid bosses
    const shinyRaids = raids.filter(raid => raid.canBeShiny);
    
    // Get raids boosted by rainy weather
    const rainyBoost = raids.filter(raid =>
      raid.boostedWeather.some(w => w.name === 'rainy')
    );
    
    // Check if a specific Pokémon's CP is weather boosted
    function isWeatherBoosted(pokemon, cp) {
      const raid = raids.find(r => r.name === pokemon);
      if (!raid) return false;
      return cp >= raid.combatPower.boosted.min;
    }
  });
```

### Python

```python
import requests

response = requests.get('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/raids.min.json')
raids = response.json()

# Group raids by tier
raids_by_tier = {}
for raid in raids:
    tier = raid['tier']
    if tier not in raids_by_tier:
        raids_by_tier[tier] = []
    raids_by_tier[tier].append(raid)

# Find raids with multiple types
multi_type_raids = [raid for raid in raids if len(raid['types']) > 1]

# Get all Dragon-type raid bosses
dragon_raids = [
    raid for raid in raids 
    if any(t['name'] == 'dragon' for t in raid['types'])
]

# Calculate weather boost advantage
def get_boost_advantage(raid):
    normal_max = raid['combatPower']['normal']['max']
    boosted_max = raid['combatPower']['boosted']['max']
    return boosted_max - normal_max
```

## Common Use Cases

1. **Raid Planning** - Help players choose which raids to participate in
2. **Shiny Hunting** - Identify shiny-eligible raid bosses
3. **Weather Optimization** - Show which raids are currently weather boosted
4. **Type Counters** - Display raid boss types to help players build counter teams
5. **CP Verification** - Check if caught raid boss CP is within expected range
6. **Tier Filtering** - Show soloable (Tier 1) vs group raids (Tier 5)
7. **Team Building** - Help players prepare counters based on raid boss types

## Notes

- Raid boss rotation changes regularly based on events and monthly cycles
- CP ranges are for level 20 Pokémon (25 when weather boosted)
- Weather boost increases catch CP by approximately 25%
- Tier 5 raids almost always feature Legendary or Mythical Pokémon
- Mega raids require Mega Energy for the first evolution
- Some raid bosses appear temporarily during special events
- Shiny rates for raids are typically higher than wild encounters (approximately 1/20 for Legendaries)
</raids>
<research>
# Research Data Documentation

## Overview

The Research endpoint provides information about current Field Research tasks, their rewards, and seasonal breakthrough information for Pokémon GO.

## Accessing the Data

- **Formatted:** [research.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/research.json)
- **Minified:** [research.min.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/research.min.json)

## Data Structure

The endpoint returns an **object** containing seasonal information and an array of research tasks.

### Root Object

| Field | Type | Description |
|-------|------|-------------|
| `seasonalInfo` | object | Current season metadata |
| `tasks` | array | Array of field research task objects |

### Seasonal Info Object

| Field | Type | Description |
|-------|------|-------------|
| `breakthroughPokemon` | array | List of possible Research Breakthrough encounter Pokémon names |
| `spindaPatterns` | array | Array of currently available Spinda pattern numbers |
| `season` | string \| null | Current season name (or null if no season) |

### Task Object

| Field | Type | Description |
|-------|------|-------------|
| `text` | string | The task description (e.g., "Catch 5 Pokémon") |
| `type` | string | Task category (e.g., "catch", "throw", "battle") |
| `rewards` | array | Array of possible rewards for this task |

### Reward Object

Rewards can be either **encounters** or **items**.

#### Encounter Reward

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | Always `"encounter"` for Pokémon rewards |
| `name` | string | Pokémon name |
| `image` | string | URL to the Pokémon's icon image |
| `canBeShiny` | boolean | Whether the encounter can be shiny |
| `combatPower` | object | CP range for the encounter |
| `combatPower.min` | number | Minimum CP |
| `combatPower.max` | number | Maximum CP |

#### Item Reward

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | Always `"item"` for item rewards |
| `name` | string | Item name with quantity (e.g., "×10") |
| `image` | string | URL to the item icon image |
| `quantity` | number | Number of items rewarded |

## Example Data

```json
{
    "seasonalInfo": {
        "breakthroughPokemon": [
            "Galarian Mr"
        ],
        "spindaPatterns": [
            6,
            7
        ],
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
                },
                {
                    "type": "item",
                    "name": "×3",
                    "image": "https://cdn.leekduck.com/assets/img/items/Rare%20Candy.png",
                    "quantity": 3
                }
            ]
        }
    ]
}
```

## Usage Examples

### JavaScript

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/research.min.json')
  .then(response => response.json())
  .then(data => {
    // Get current breakthrough Pokémon
    const breakthroughMons = data.seasonalInfo.breakthroughPokemon;
    
    // Find all tasks that reward encounters
    const encounterTasks = data.tasks.filter(task =>
      task.rewards.some(reward => reward.type === 'encounter')
    );
    
    // Find tasks with shiny-eligible encounters
    const shinyTasks = data.tasks.filter(task =>
      task.rewards.some(reward => 
        reward.type === 'encounter' && reward.canBeShiny
      )
    );
    
    // Get all catch-type tasks
    const catchTasks = data.tasks.filter(task => task.type === 'catch');
    
    // Find tasks that reward Rare Candy
    const rareCandyTasks = data.tasks.filter(task =>
      task.rewards.some(reward =>
        reward.type === 'item' && reward.name.includes('Rare Candy')
      )
    );
  });
```

### Python

```python
import requests

response = requests.get('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/research.min.json')
data = response.json()

# Get seasonal info
season = data['seasonalInfo']['season']
spinda_patterns = data['seasonalInfo']['spindaPatterns']

# Group tasks by type
tasks_by_type = {}
for task in data['tasks']:
    task_type = task.get('type', 'unknown')
    if task_type not in tasks_by_type:
        tasks_by_type[task_type] = []
    tasks_by_type[task_type].append(task)

# Find all unique encounter Pokémon from tasks
encounters = set()
for task in data['tasks']:
    for reward in task['rewards']:
        if reward['type'] == 'encounter':
            encounters.add(reward['name'])

# Get tasks that reward a specific Pokémon
def get_tasks_for_pokemon(pokemon_name):
    matching_tasks = []
    for task in data['tasks']:
        for reward in task['rewards']:
            if reward.get('type') == 'encounter' and reward['name'] == pokemon_name:
                matching_tasks.append(task['text'])
    return matching_tasks

# Calculate best tasks for Stardust
def get_stardust_tasks():
    stardust_tasks = []
    for task in data['tasks']:
        for reward in task['rewards']:
            if reward.get('type') == 'item' and 'Stardust' in reward.get('image', ''):
                stardust_tasks.append({
                    'task': task['text'],
                    'amount': reward['quantity']
                })
    return sorted(stardust_tasks, key=lambda x: x['amount'], reverse=True)
```

## Common Use Cases

1. **Task Prioritization** - Help players choose which tasks to keep based on desired rewards
2. **Shiny Hunting** - Identify tasks that can reward shiny Pokémon
3. **Stardust Farming** - Find tasks that reward the most Stardust
4. **Rare Pokémon** - Track which rare Pokémon are available through research
5. **Spinda Collection** - Display currently available Spinda patterns
6. **Breakthrough Planning** - Show what Pokémon players can get from Research Breakthrough
7. **Task Type Filtering** - Filter by catch, throw, battle, or other task types
8. **Item Farming** - Identify tasks that reward specific items (Rare Candy, Golden Razz, etc.)

## Task Type Categories

Common task types include:

- `catch` - Catching Pokémon (general or specific types)
- `throw` - Making various types of throws (Nice, Great, Excellent, Curveball)
- `battle` - Battling in raids, gyms, or GO Battle League
- `buddy` - Buddy-related tasks (hearts, walks, photos)
- `evolve` - Evolving Pokémon
- `power` - Powering up Pokémon
- `hatch` - Hatching eggs
- `photo` - Taking snapshots
- `send` - Sending gifts

## Notes

- Field Research tasks rotate daily at midnight local time
- Some tasks have multiple possible rewards (spin the wheel mechanic)
- Research Breakthrough requires completing 7 Field Research tasks (one per day)
- Breakthrough Pokémon change monthly
- Spinda patterns rotate periodically
- CP values for encounter rewards are for level 15 Pokémon
- Some tasks only appear during specific events
- Tasks with the same text can have different rewards during different events
- Research tasks don't require you to catch or complete on the same day you receive them
</research>

<rocket>
# Rocket Lineups Data Documentation

## Overview

The Rocket Lineups endpoint provides detailed information about Team GO Rocket encounters, including Giovanni, Leaders, and Grunts. It shows possible Pokémon lineups, types, and which Pokémon can be encountered as rewards.

## Accessing the Data

- **Formatted:** [rocketLineups.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/rocketLineups.json)
- **Minified:** [rocketLineups.min.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/rocketLineups.min.json)

## Data Structure

The endpoint returns an **array** of Rocket member objects, ordered by importance (Giovanni → Leaders → Grunts).

### Rocket Member Object

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Name of the Rocket member (e.g., "Giovanni", "Cliff", "Fire-type Male Grunt") |
| `title` | string | Title/rank ("Team GO Rocket Boss", "Team GO Rocket Leader", "Team GO Rocket Grunt") |
| `type` | string | Type specialization for grunts (e.g., "fire", "water", "normal") or empty string for leaders |
| `gender` | string | Gender ("Male", "Female") |
| `firstPokemon` | array | Array of possible Pokémon in first battle slot |
| `secondPokemon` | array | Array of possible Pokémon in second battle slot |
| `thirdPokemon` | array | Array of possible Pokémon in third battle slot |

### Pokémon Object

Each Pokémon in the lineup has the following structure:

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Pokémon name |
| `image` | string | URL to the Pokémon's icon image |
| `types` | array | Array of type strings (e.g., `["fire"]`, `["water", "ground"]`) |
| `isEncounter` | boolean | Whether this Pokémon can be caught as a reward after defeating the Rocket member |
| `canBeShiny` | boolean | Whether this Pokémon can be shiny when encountered |

## Rocket Member Hierarchy

1. **Giovanni** - Team GO Rocket Boss (requires Super Rocket Radar)
2. **Leaders** - Cliff, Arlo, Sierra (require Rocket Radars)
3. **Grunts** - Type-specialized members (common encounters at PokéStops)

## Example Data

```json
[
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
    },
    {
        "name": "Fire-type Male Grunt",
        "title": "Team GO Rocket Grunt",
        "type": "fire",
        "gender": "Male",
        "firstPokemon": [
            {
                "name": "Charmander",
                "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm4.icon.png",
                "types": ["fire"],
                "isEncounter": true,
                "canBeShiny": false
            }
        ],
        "secondPokemon": [
            {
                "name": "Charmeleon",
                "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm5.icon.png",
                "types": ["fire"],
                "isEncounter": false,
                "canBeShiny": false
            }
        ],
        "thirdPokemon": [
            {
                "name": "Charizard",
                "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm6.icon.png",
                "types": ["fire", "flying"],
                "isEncounter": false,
                "canBeShiny": false
            }
        ]
    }
]
```

## Usage Examples

### JavaScript

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/rocketLineups.min.json')
  .then(response => response.json())
  .then(lineups => {
    // Get Giovanni's lineup
    const giovanni = lineups.find(member => member.name === 'Giovanni');
    
    // Get all Leader lineups
    const leaders = lineups.filter(member => 
      member.title === 'Team GO Rocket Leader'
    );
    
    // Find grunts by type
    const fireGrunts = lineups.filter(member =>
      member.type === 'fire'
    );
    
    // Get all possible encounter rewards
    const encounters = lineups.flatMap(member =>
      [...member.firstPokemon, ...member.secondPokemon, ...member.thirdPokemon]
        .filter(pokemon => pokemon.isEncounter)
    );
    
    // Find shiny-eligible encounters
    const shinyEncounters = lineups.flatMap(member => {
      const allPokemon = [
        ...member.firstPokemon,
        ...member.secondPokemon,
        ...member.thirdPokemon
      ];
      return allPokemon.filter(p => p.isEncounter && p.canBeShiny);
    });
    
    // Get counters for a specific member
    function getCounters(memberName) {
      const member = lineups.find(m => m.name === memberName);
      if (!member) return null;
      
      const types = new Set();
      [
        ...member.firstPokemon,
        ...member.secondPokemon,
        ...member.thirdPokemon
      ].forEach(pokemon => {
        pokemon.types.forEach(type => types.add(type));
      });
      
      return Array.from(types);
    }
  });
```

### Python

```python
import requests

response = requests.get('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/rocketLineups.min.json')
lineups = response.json()

# Get all grunt types
grunt_types = set()
for member in lineups:
    if member['title'] == 'Team GO Rocket Grunt' and member['type']:
        grunt_types.add(member['type'])

# Find all Leader encounters
leader_encounters = []
for member in lineups:
    if member['title'] == 'Team GO Rocket Leader':
        # First Pokémon is usually the encounter reward for Leaders
        for pokemon in member['firstPokemon']:
            if pokemon['isEncounter']:
                leader_encounters.append({
                    'leader': member['name'],
                    'pokemon': pokemon['name'],
                    'can_be_shiny': pokemon['canBeShiny']
                })

# Get possible lineups for a specific member
def get_possible_lineups(member_name):
    member = next((m for m in lineups if m['name'] == member_name), None)
    if not member:
        return None
    
    from itertools import product
    
    first = [p['name'] for p in member['firstPokemon']]
    second = [p['name'] for p in member['secondPokemon']]
    third = [p['name'] for p in member['thirdPokemon']]
    
    return list(product(first, second, third))

# Find which grunts use a specific Pokémon
def find_grunts_with_pokemon(pokemon_name):
    results = []
    for member in lineups:
        if member['title'] == 'Team GO Rocket Grunt':
            all_pokemon = (
                member['firstPokemon'] + 
                member['secondPokemon'] + 
                member['thirdPokemon']
            )
            if any(p['name'] == pokemon_name for p in all_pokemon):
                results.append(member['name'])
    return results

# Get best counter types for a member
def get_best_counters(member_name):
    member = next((m for m in lineups if m['name'] == member_name), None)
    if not member:
        return None
    
    # Count type occurrences across all slots
    type_counts = {}
    all_pokemon = (
        member['firstPokemon'] + 
        member['secondPokemon'] + 
        member['thirdPokemon']
    )
    
    for pokemon in all_pokemon:
        for poke_type in pokemon['types']:
            type_counts[poke_type] = type_counts.get(poke_type, 0) + 1
    
    return sorted(type_counts.items(), key=lambda x: x[1], reverse=True)
```

## Common Use Cases

1. **Battle Preparation** - Show players what Pokémon to expect before battle
2. **Counter Team Building** - Help players build effective counter teams based on types
3. **Encounter Planning** - Identify which Shadow Pokémon can be caught
4. **Shiny Hunting** - Track which Shadow Pokémon can be shiny
5. **Lineup Prediction** - Show all possible lineup combinations for a member
6. **Leader Tracking** - Display current Leader lineups for Rocket Radar planning
7. **Type Filtering** - Find grunts by their type specialization
8. **Shadow Pokédex Completion** - Track which Shadow Pokémon are currently available

## Battle Mechanics

- **First Slot** - Always the first Pokémon encountered; for Leaders, this is usually the catchable reward
- **Second Slot** - Random selection from available options
- **Third Slot** - Random selection from available options
- **Shields** - Grunts have 0 shields, Leaders have 2, Giovanni has 2
- **Encounter Reward** - Only Pokémon with `isEncounter: true` can be caught after victory

## Grunt Types

Common grunt types include:

- **Normal** - Normal-type Pokémon
- **Fire** - Fire-type Pokémon
- **Water** - Water-type Pokémon
- **Grass** - Grass-type Pokémon
- **Electric** - Electric-type Pokémon
- **Ice** - Ice-type Pokémon
- **Fighting** - Fighting-type Pokémon
- **Poison** - Poison-type Pokémon
- **Ground** - Ground-type Pokémon
- **Flying** - Flying-type Pokémon
- **Psychic** - Psychic-type Pokémon
- **Bug** - Bug-type Pokémon
- **Rock** - Rock-type Pokémon
- **Ghost** - Ghost-type Pokémon
- **Dragon** - Dragon-type Pokémon
- **Dark** - Dark-type Pokémon
- **Steel** - Steel-type Pokémon
- **Fairy** - Fairy-type Pokémon

## Notes

- Giovanni's lineup rotates approximately every month
- Leader lineups (Cliff, Arlo, Sierra) rotate more frequently
- Grunt lineups are relatively stable but can change during events
- Shadow Pokémon have reduced IVs but gain a damage boost
- Purifying Shadow Pokémon increases their IVs
- Giovanni requires a Super Rocket Radar (from Special Research)
- Leaders require a Rocket Radar (assembled from 6 Mysterious Components)
- Only one Pokémon from the lineup can be caught per encounter
- Female and Male grunt variants of the same type have identical lineups
- Shiny Shadow Pokémon are extremely rare and highly sought after
</rocket>
<eggs>
# Eggs Data Documentation

## Overview

The Eggs endpoint provides detailed information about which Pokémon can hatch from different egg types in Pokémon GO, including rarity, CP ranges, and special flags.

## Accessing the Data

- **Formatted:** [eggs.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/eggs.json)
- **Minified:** [eggs.min.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/eggs.min.json)

## Data Structure

The endpoint returns an **array** of Pokémon objects, where each object represents a Pokémon that can hatch from an egg.

### Pokémon Object

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Name of the Pokémon |
| `eggType` | string | Type of egg (e.g., "1 km", "2 km", "5 km", "7 km", "10 km", "12 km") |
| `isAdventureSync` | boolean | Whether this Pokémon is available from Adventure Sync rewards |
| `image` | string | URL to the Pokémon's icon image |
| `canBeShiny` | boolean | Whether the Pokémon can be shiny when hatched |
| `combatPower` | object | CP range for hatched Pokémon |
| `combatPower.min` | number | Minimum CP when hatched |
| `combatPower.max` | number | Maximum CP when hatched |
| `isRegional` | boolean | Whether the Pokémon is region-exclusive |
| `isGiftExchange` | boolean | Whether the Pokémon is available from Gift Exchange eggs |
| `rarity` | number | Numeric rarity value (1-5 scale) |
| `rarityTier` | string | Human-readable rarity tier (e.g., "Very Rare", "Rare", "Common") |

### Rarity Scale

- **5** - Ultra Rare
- **4** - Very Rare
- **3** - Uncommon
- **2** - Common
- **1** - Very Common

## Example Data

```json
[
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
]
```

## Usage Examples

### JavaScript

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/eggs.min.json')
  .then(response => response.json())
  .then(eggs => {
    // Find all shiny-eligible Pokémon from 10 km eggs
    const shiny10km = eggs.filter(egg => 
      egg.eggType === '10 km' && egg.canBeShiny
    );
    
    // Get Adventure Sync rewards
    const adventureSync = eggs.filter(egg => egg.isAdventureSync);
    
    // Find ultra rare hatches
    const ultraRare = eggs.filter(egg => egg.rarity === 5);
  });
```

### Python

```python
import requests

response = requests.get('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/eggs.min.json')
eggs = response.json()

# Group by egg type
egg_types = {}
for egg in eggs:
    egg_type = egg['eggType']
    if egg_type not in egg_types:
        egg_types[egg_type] = []
    egg_types[egg_type].append(egg['name'])

# Find regional exclusives
regionals = [egg for egg in eggs if egg['isRegional']]

# Check if specific Pokémon can hatch shiny
def can_hatch_shiny(pokemon_name):
    for egg in eggs:
        if egg['name'] == pokemon_name:
            return egg['canBeShiny']
    return False
```

## Common Use Cases

1. **Egg Type Filtering** - Show players which Pokémon hatch from specific egg distances
2. **Shiny Hunting** - Identify which hatches can be shiny
3. **Adventure Sync Rewards** - Display available Adventure Sync egg rewards
4. **Rarity Tracking** - Help players prioritize rare hatches
5. **Regional Awareness** - Identify region-exclusive Pokémon in eggs
6. **CP Planning** - Show expected CP ranges for hatch planning

## Notes

- CP values represent the range for hatched Pokémon at trainer level 20
- Egg pools are updated regularly as Niantic rotates available Pokémon
- Regional Pokémon may only appear in eggs obtained from their respective regions
- Gift Exchange eggs (7 km) often contain different Pokémon than other egg types
- Adventure Sync rewards typically offer rarer Pokémon and longer egg distances
</eggs>


====================</COMBINES_API_DOCS>====================
