# Events Data Documentation

## Overview

The Events endpoint provides comprehensive information about current and upcoming Pokémon GO events, including Community Days, Raid Battles, Spotlight Hours, GO Battle League seasons, and special events.

## Accessing the Data

- **Minified:** [events.min.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json)

## Data Structure

The endpoint returns an **array** of event objects, where each object represents a current or upcoming event in Pokémon GO.

### Event Object

| Field | Type | Description |
|-------|------|-------------|
| `eventID` | string | Unique identifier for the event |
| `name` | string | Full display name of the event |
| `eventType` | string | Type of event (see Event Types below) |
| `heading` | string | Category heading for display purposes |
| `link` | string (uri) | URL to detailed event information on LeekDuck |
| `image` | string (uri) | URL to event banner/promotional image |
| `start` | string (date-time) | Event start time in ISO 8601 format |
| `end` | string (date-time) | Event end time in ISO 8601 format |
| `timezone` | string \| null | Timezone information ("Local Time" for local events, null for UTC) |
| `extraData` | object \| null | Event-specific additional data (varies by event type) |

### Event Types

The following event types are available:

| Event Type | Description |
|------------|-------------|
| `community-day` | Monthly Community Day events featuring specific Pokémon |
| `pokemon-spotlight-hour` | Weekly one-hour events featuring a specific Pokémon |
| `raid-battles` | Raid boss rotation events |
| `raid-hour` | Weekly one-hour raid events |
| `raid-day` | Special all-day raid events |
| `go-battle-league` | PvP league rotations and seasons |
| `max-mondays` | Weekly Max Monday events |
| `max-battles` | Max Battle special events |
| `pokestop-showcase` | PokéStop Showcase competitions |
| `city-safari` | Location-specific City Safari events |
| `pokemon-go-tour` | Large-scale GO Tour events |
| `research-day` | Special research task events |
| `event` | General in-game events |
| `go-pass` | GO Pass subscription periods |
| `research` | Special or Masterwork research availability |
| `season` | Game seasons (3-month periods) |

## Extra Data Structures

The `extraData` field varies based on event type and may contain event-specific information.

### Community Day Extra Data

```json
{
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
    "bonusDisclaimers": ["Disclaimer text"],
    "shinies": [
      {
        "name": "Vanillite",
        "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_582_00_shiny.png"
      }
    ],
    "specialresearch": [
      {
        "name": "December Community Day 2025 (1/5)",
        "step": 1,
        "tasks": [
          {
            "text": "Catch 25 Pokémon",
            "reward": {
              "text": "Karrablast",
              "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pokemon_icon_588_00.png"
            }
          }
        ],
        "rewards": [
          {
            "text": "×2025",
            "image": "https://cdn.leekduck.com/assets/img/items/Stardust.png"
          }
        ]
      }
    ]
  },
  "generic": {
    "hasSpawns": true,
    "hasFieldResearchTasks": true
  }
}
```

### Raid Battles Extra Data

```json
{
  "raidbattles": {
    "bosses": [
      {
        "name": "Kyurem",
        "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_646_11.png",
        "canBeShiny": true
      }
    ],
    "shinies": [
      {
        "name": "Kyurem",
        "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_646_11_shiny.png"
      }
    ]
  },
  "generic": {
    "hasSpawns": false,
    "hasFieldResearchTasks": false
  }
}
```

### Spotlight Hour Extra Data

```json
{
  "spotlight": {
    "name": "Shieldon",
    "canBeShiny": true,
    "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_410_00.png",
    "bonus": "2× Catch XP",
    "list": [
      {
        "name": "Shieldon",
        "canBeShiny": true,
        "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_410_00.png"
      }
    ]
  },
  "generic": {
    "hasSpawns": true,
    "hasFieldResearchTasks": false
  }
}
```

### Generic Extra Data

Most events include a `generic` object with flags:

| Field | Type | Description |
|-------|------|-------------|
| `hasSpawns` | boolean | Whether the event features special wild Pokémon spawns |
| `hasFieldResearchTasks` | boolean | Whether the event includes special field research tasks |

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "title": "Pokémon GO Events",
  "description": "Array of current and upcoming Pokémon GO events",
  "items": {
    "type": "object",
    "required": ["eventID", "name", "eventType", "heading", "link", "image", "start", "end", "timezone", "extraData"],
    "properties": {
      "eventID": {
        "type": "string",
        "description": "Unique identifier for the event"
      },
      "name": {
        "type": "string",
        "description": "Full name of the event"
      },
      "eventType": {
        "type": "string",
        "enum": [
          "community-day",
          "pokestop-showcase",
          "max-mondays",
          "event",
          "go-battle-league",
          "pokemon-spotlight-hour",
          "raid-hour",
          "raid-battles",
          "city-safari",
          "max-battles",
          "research-day",
          "raid-day",
          "go-pass",
          "pokemon-go-tour",
          "research",
          "season"
        ],
        "description": "Type of event"
      },
      "heading": {
        "type": "string",
        "description": "Display heading for the event"
      },
      "link": {
        "type": "string",
        "format": "uri",
        "description": "URL link to event details"
      },
      "image": {
        "type": "string",
        "format": "uri",
        "description": "URL to event image"
      },
      "start": {
        "type": "string",
        "format": "date-time",
        "description": "Event start time in ISO 8601 format"
      },
      "end": {
        "type": "string",
        "format": "date-time",
        "description": "Event end time in ISO 8601 format"
      },
      "timezone": {
        "type": ["string", "null"],
        "description": "Timezone information (null for UTC)"
      },
      "extraData": {
        "type": ["object", "null"],
        "description": "Additional event-specific data"
      }
    }
  }
}
```

## Example Data

```json
[
  {
    "eventID": "pokemonspotlighthour2025-12-09",
    "name": "Shieldon Spotlight Hour",
    "eventType": "pokemon-spotlight-hour",
    "heading": "Pokémon Spotlight Hour",
    "link": "https://leekduck.com/events/pokemonspotlighthour2025-12-09/",
    "image": "https://cdn.leekduck.com/assets/img/events/pokemonspotlighthour.jpg",
    "start": "2025-12-09T18:00:00.000",
    "end": "2025-12-09T19:00:00.000",
    "timezone": "Local Time",
    "extraData": {
      "spotlight": {
        "name": "Shieldon",
        "canBeShiny": true,
        "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_410_00.png",
        "bonus": "2× Catch XP",
        "list": [
          {
            "name": "Shieldon",
            "canBeShiny": true,
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_410_00.png"
          }
        ]
      },
      "generic": {
        "hasSpawns": true,
        "hasFieldResearchTasks": false
      }
    }
  },
  {
    "eventID": "kyurem-in-5-star-raid-battles-december-2025",
    "name": "Kyurem in 5-star Raid Battles",
    "eventType": "raid-battles",
    "heading": "Raid Battles",
    "link": "https://leekduck.com/events/kyurem-in-5-star-raid-battles-december-2025/",
    "image": "https://cdn.leekduck.com/assets/img/events/kyurem.jpg",
    "start": "2025-12-04T10:00:00.000",
    "end": "2025-12-13T10:00:00.000",
    "timezone": "Local Time",
    "extraData": {
      "raidbattles": {
        "bosses": [
          {
            "name": "Kyurem",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_646_11.png",
            "canBeShiny": true
          }
        ],
        "shinies": [
          {
            "name": "Kyurem",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_646_11_shiny.png"
          }
        ]
      },
      "generic": {
        "hasSpawns": false,
        "hasFieldResearchTasks": false
      }
    }
  }
]
```

## Usage Examples

### Fetching Events Data

```javascript
// Fetch events data
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json')
  .then(response => response.json())
  .then(events => {
    console.log(`Total events: ${events.length}`);
  })
  .catch(error => console.error('Error fetching events:', error));
```

### Get Active Events

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json')
  .then(response => response.json())
  .then(events => {
    const now = new Date();
  
    const activeEvents = events.filter(event => {
      const start = new Date(event.start);
      const end = new Date(event.end);
      return now >= start && now <= end;
    });

    console.log(`${activeEvents.length} active events:`);
    activeEvents.forEach(event => {
      console.log(`- ${event.name} (${event.eventType})`);
    });
  });
```

### Filter Events by Type

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json')
  .then(response => response.json())
  .then(events => {
    // Get all Community Day events
    const communityDays = events.filter(e => e.eventType === 'community-day');
  
    // Get all Spotlight Hours
    const spotlightHours = events.filter(e => e.eventType === 'pokemon-spotlight-hour');
  
    // Get all Raid Battle events
    const raidEvents = events.filter(e => e.eventType === 'raid-battles');

    console.log(`Community Days: ${communityDays.length}`);
    console.log(`Spotlight Hours: ${spotlightHours.length}`);
    console.log(`Raid Events: ${raidEvents.length}`);
  });
```

### Get Upcoming Events

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json')
  .then(response => response.json())
  .then(events => {
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));

    const upcomingEvents = events
      .filter(event => {
        const start = new Date(event.start);
        return start >= now && start <= sevenDaysFromNow;
      })
      .sort((a, b) => new Date(a.start) - new Date(b.start));

    console.log('Events in the next 7 days:');
    upcomingEvents.forEach(event => {
      const startDate = new Date(event.start).toLocaleString();
      console.log(`${event.name} - ${startDate}`);
    });
  });
```

### Working with Community Day Data

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json')
  .then(response => response.json())
  .then(events => {
    // Find the next Community Day
    const now = new Date();
    const nextCD = events
      .filter(e => e.eventType === 'community-day' && new Date(e.start) > now)
      .sort((a, b) => new Date(a.start) - new Date(b.start))[0];

    if (nextCD && nextCD.extraData?.communityday) {
      const cdData = nextCD.extraData.communityday;
    
      console.log(`Next Community Day: ${nextCD.name}`);
      console.log(`Start: ${new Date(nextCD.start).toLocaleString()}`);
      console.log(`Featured Pokémon: ${cdData.spawns.length}`);
      console.log(`Bonuses: ${cdData.bonuses.length}`);
      console.log(`Shiny forms available: ${cdData.shinies.length}`);
    
      // List featured Pokémon
      console.log('\nFeatured Pokémon:');
      cdData.spawns.forEach(spawn => {
        console.log(`  - ${spawn.name}`);
      });
    
      // List bonuses
      console.log('\nActive Bonuses:');
      cdData.bonuses.forEach(bonus => {
        console.log(`  - ${bonus.text}`);
      });
    }
  });
```

### Get Current Raid Bosses

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json')
  .then(response => response.json())
  .then(events => {
    const now = new Date();

    const activeRaids = events.filter(event => {
      if (event.eventType !== 'raid-battles') return false;
      const start = new Date(event.start);
      const end = new Date(event.end);
      return now >= start && now <= end;
    });

    console.log('Current Raid Bosses:');
    activeRaids.forEach(raid => {
      if (raid.extraData?.raidbattles?.bosses) {
        console.log(`\n${raid.name}:`);
        raid.extraData.raidbattles.bosses.forEach(boss => {
          console.log(`  - ${boss.name} (Shiny: ${boss.canBeShiny ? 'Yes' : 'No'})`);
        });
        const endDate = new Date(raid.end).toLocaleDateString();
        console.log(`  Ends: ${endDate}`);
      }
    });
  });
```

### Get This Week's Spotlight Hour

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json')
  .then(response => response.json())
  .then(events => {
    const now = new Date();
    const oneWeekFromNow = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));

    const spotlightHours = events.filter(event => {
      if (event.eventType !== 'pokemon-spotlight-hour') return false;
      const start = new Date(event.start);
      return start >= now && start <= oneWeekFromNow;
    });

    spotlightHours.forEach(event => {
      if (event.extraData?.spotlight) {
        const spotlight = event.extraData.spotlight;
        console.log(`\n${event.name}`);
        console.log(`Time: ${new Date(event.start).toLocaleString()}`);
        console.log(`Featured: ${spotlight.name}`);
        console.log(`Bonus: ${spotlight.bonus}`);
        console.log(`Can be shiny: ${spotlight.canBeShiny ? 'Yes' : 'No'}`);
      }
    });
  });
```

### Create Event Calendar

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json')
  .then(response => response.json())
  .then(events => {
    // Group events by date
    const calendar = {};

    events.forEach(event => {
      const date = new Date(event.start).toISOString().split('T')[0];
    
      if (!calendar[date]) {
        calendar[date] = [];
      }
    
      calendar[date].push({
        name: event.name,
        type: event.eventType,
        start: event.start,
        end: event.end,
        timezone: event.timezone
      });
    });

    // Display today's events
    const today = new Date().toISOString().split('T')[0];
    if (calendar[today]) {
      console.log(`Events today (${today}):`);
      calendar[today].forEach(event => {
        console.log(`  - ${event.name} (${event.type})`);
      });
    }
  });
```

### Filter by Date Range

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json')
  .then(response => response.json())
  .then(events => {
    function getEventsByDateRange(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      return events.filter(event => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
      
        // Event overlaps with date range
        return eventStart <= end && eventEnd >= start;
      });
    }

    // Get all December 2025 events
    const decemberEvents = getEventsByDateRange('2025-12-01', '2025-12-31');
  
    console.log(`December 2025: ${decemberEvents.length} events`);
    decemberEvents.forEach(event => {
      console.log(`- ${event.name}`);
    });
  });
```

### Find Events with Special Spawns

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json')
  .then(response => response.json())
  .then(events => {
    const spawnEvents = events.filter(event =>
      event.extraData?.generic?.hasSpawns === true
    );

    console.log(`${spawnEvents.length} events with special spawns:`);
    spawnEvents.forEach(event => {
      const start = new Date(event.start).toLocaleDateString();
      console.log(`- ${event.name} (${start})`);
    });
  });
```

### Calculate Event Duration

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json')
  .then(response => response.json())
  .then(events => {
    function formatDuration(event) {
      const start = new Date(event.start);
      const end = new Date(event.end);
      const durationMs = end - start;

      const hours = Math.floor(durationMs / (1000 * 60 * 60));
      const days = Math.floor(hours / 24);

      if (days > 0) {
        const remainingHours = hours % 24;
        return remainingHours > 0
          ? `${days}d ${remainingHours}h`
          : `${days}d`;
      }
      return `${hours}h`;
    }

    // Show duration for all active events
    const now = new Date();
    const activeEvents = events.filter(e =>
      new Date(e.start) <= now && new Date(e.end) >= now
    );

    console.log('Active Event Durations:');
    activeEvents.forEach(event => {
      console.log(`${event.name}: ${formatDuration(event)}`);
    });
  });
```

### Search Events

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json')
  .then(response => response.json())
  .then(events => {
    function searchEvents(keyword) {
      const searchTerm = keyword.toLowerCase();

      return events.filter(event =>
        event.name.toLowerCase().includes(searchTerm) ||
        event.eventType.toLowerCase().includes(searchTerm) ||
        event.heading.toLowerCase().includes(searchTerm)
      );
    }

    // Search for Kyurem-related events
    const kyuremEvents = searchEvents('kyurem');
    console.log('Kyurem events:', kyuremEvents.map(e => e.name));

    // Search for raid events
    const raidEvents = searchEvents('raid');
    console.log(`\nFound ${raidEvents.length} raid-related events`);
  });
```

### Get Events by Timezone

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json')
  .then(response => response.json())
  .then(events => {
    // Separate local time vs UTC events
    const localTimeEvents = events.filter(e => e.timezone === 'Local Time');
    const utcEvents = events.filter(e => e.timezone === null);

    console.log(`Local time events: ${localTimeEvents.length}`);
    console.log(`UTC events: ${utcEvents.length}`);

    // UTC events are often global events or GO Battle League
    console.log('\nUTC Events:');
    utcEvents.slice(0, 5).forEach(event => {
      console.log(`- ${event.name} (${event.eventType})`);
    });
  });
```

### Find Overlapping Events

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json')
  .then(response => response.json())
  .then(events => {
    function findOverlappingEvents(targetEvent) {
      const targetStart = new Date(targetEvent.start);
      const targetEnd = new Date(targetEvent.end);

      return events.filter(event => {
        if (event.eventID === targetEvent.eventID) return false;
      
        const start = new Date(event.start);
        const end = new Date(event.end);
      
        return start < targetEnd && end > targetStart;
      });
    }

    // Find events overlapping with Community Day
    const communityDay = events.find(e =>
      e.eventType === 'community-day' &&
      new Date(e.start) > new Date()
    );

    if (communityDay) {
      const overlapping = findOverlappingEvents(communityDay);
      console.log(`Events during ${communityDay.name}:`);
      overlapping.forEach(event => {
        console.log(`- ${event.name}`);
      });
    }
  });
```

### Export Events to CSV

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json')
  .then(response => response.json())
  .then(events => {
    function eventsToCSV(events) {
      const headers = ['Event ID', 'Name', 'Type', 'Start', 'End', 'Timezone'];
      const rows = events.map(event => [
        event.eventID,
        event.name,
        event.eventType,
        event.start,
        event.end,
        event.timezone || 'UTC'
      ]);

      return [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');
    }

    const csv = eventsToCSV(events);
    console.log(csv);
  
    // To download as file:
    // const blob = new Blob([csv], { type: 'text/csv' });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'pokemon-go-events.csv';
    // a.click();
  });
```

## Common Use Cases

1. **Event Calendar** - Display upcoming events in a calendar format
2. **Event Notifications** - Send reminders before events start
3. **Raid Planning** - Coordinate raid groups based on current raid bosses
4. **Shiny Tracking** - Track which shinies are available during events
5. **Bonus Optimization** - Show active XP, Stardust, and Candy bonuses
6. **Community Day Prep** - Display featured Pokémon, bonuses, and special moves
7. **GO Battle League Tracker** - Track current league rotations and cup restrictions
8. **Event Overlap Detection** - Find which events are running simultaneously
9. **Spotlight Hour Planner** - Plan weekly Spotlight Hour participation
10. **Season Information** - Display current season details and duration

## Notes

- Events are sourced from LeekDuck, a trusted Pokémon GO community resource
- Event times use ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sss)
- `timezone` field indicates if times are local ("Local Time") or UTC (null)
- `extraData` structure varies by event type - always check if it exists before accessing
- Community Days typically run 2-5 PM local time on specific dates
- Spotlight Hours occur every Tuesday at 6:00 PM local time
- Raid Hours occur every Wednesday at 6:00 PM local time
- Events may be added, modified, or cancelled by Niantic with short notice
- Some events are location-specific (City Safari, GO Tour in-person events)
- Event images and links point to LeekDuck's CDN and website
- GO Battle League events use UTC timezone as they rotate globally at the same time
- Not all events include `extraData` - some events only provide basic information
- Special research availability periods are tracked as `research` type events
- Seasons typically last 3 months and define spawn pools, eggs, and research rewards

## Error Handling

```javascript
// Safe event data access
function safeGetEvent(events, eventID) {
  try {
    const event = events.find(e => e.eventID === eventID);
    if (!event) {
      throw new Error(`Event not found: ${eventID}`);
    }
    return event;
  } catch (error) {
    console.error('Error fetching event:', error.message);
    return null;
  }
}

// Safe date parsing
function safeParseDate(dateString) {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    return date;
  } catch (error) {
    console.error('Error parsing date:', error.message);
    return null;
  }
}

// Safe extra data access
function safeGetExtraData(event, path) {
  try {
    const keys = path.split('.');
    let value = event.extraData;
  
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return null;
      }
    }
  
    return value;
  } catch (error) {
    console.error('Error accessing extra data:', error.message);
    return null;
  }
}

// Example usage
const spawns = safeGetExtraData(event, 'communityday.spawns');
if (spawns) {
  console.log(`Found ${spawns.length} featured Pokémon`);
}
```