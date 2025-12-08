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
{"communityday":{"spawns":[{"name":"Vanillite","image":"https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_582_00.png"}],"bonuses":[{"text":"2x XP for catching Pokémon","image":"https://cdn.leekduck.com/assets/img/events/bonuses/xp.png"}],"bonusDisclaimers":["Disclaimer text"],"shinies":[{"name":"Vanillite","image":"https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_582_00_shiny.png"}],"specialresearch":[{"name":"December Community Day 2025 (1/5)","step":1,"tasks":[{"text":"Catch 25 Pokémon","reward":{"text":"Karrablast","image":"https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pokemon_icon_588_00.png"}}],"rewards":[{"text":"×2025","image":"https://cdn.leekduck.com/assets/img/items/Stardust.png"}]}]},"generic":{"hasSpawns":true,"hasFieldResearchTasks":true}}
```
### Raid Battles Extra Data
```json
{"raidbattles":{"bosses":[{"name":"Kyurem","image":"https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_646_11.png","canBeShiny":true}],"shinies":[{"name":"Kyurem","image":"https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_646_11_shiny.png"}]},"generic":{"hasSpawns":false,"hasFieldResearchTasks":false}}
```
### Spotlight Hour Extra Data
```json
{"spotlight":{"name":"Shieldon","canBeShiny":true,"image":"https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_410_00.png","bonus":"2× Catch XP","list":[{"name":"Shieldon","canBeShiny":true,"image":"https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_410_00.png"}]},"generic":{"hasSpawns":true,"hasFieldResearchTasks":false}}
```
### Generic Extra Data
Most events include a `generic` object with flags:
| Field | Type | Description |
|-------|------|-------------|
| `hasSpawns` | boolean | Whether the event features special wild Pokémon spawns |
| `hasFieldResearchTasks` | boolean | Whether the event includes special field research tasks |
## JSON Schema
```json
{"$schema":"http://json-schema.org/draft-07/schema#","type":"array","title":"Pokémon GO Events","description":"Array of current and upcoming Pokémon GO events","items":{"type":"object","required":["eventID","name","eventType","heading","link","image","start","end","timezone","extraData"],"properties":{"eventID":{"type":"string","description":"Unique identifier for the event"},"name":{"type":"string","description":"Full name of the event"},"eventType":{"type":"string","enum":["community-day","pokestop-showcase","max-mondays","event","go-battle-league","pokemon-spotlight-hour","raid-hour","raid-battles","city-safari","max-battles","research-day","raid-day","go-pass","pokemon-go-tour","research","season"],"description":"Type of event"},"heading":{"type":"string","description":"Display heading for the event"},"link":{"type":"string","format":"uri","description":"URL link to event details"},"image":{"type":"string","format":"uri","description":"URL to event image"},"start":{"type":"string","format":"date-time","description":"Event start time in ISO 8601 format"},"end":{"type":"string","format":"date-time","description":"Event end time in ISO 8601 format"},"timezone":{"type":["string","null"],"description":"Timezone information (null for UTC)"},"extraData":{"type":["object","null"],"description":"Additional event-specific data"}}}}
```
## Example Data
```json
[{"eventID":"pokemonspotlighthour2025-12-09","name":"Shieldon Spotlight Hour","eventType":"pokemon-spotlight-hour","heading":"Pokémon Spotlight Hour","link":"https://leekduck.com/events/pokemonspotlighthour2025-12-09/","image":"https://cdn.leekduck.com/assets/img/events/pokemonspotlighthour.jpg","start":"2025-12-09T18:00:00.000","end":"2025-12-09T19:00:00.000","timezone":"Local Time","extraData":{"spotlight":{"name":"Shieldon","canBeShiny":true,"image":"https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_410_00.png","bonus":"2× Catch XP","list":[{"name":"Shieldon","canBeShiny":true,"image":"https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_410_00.png"}]},"generic":{"hasSpawns":true,"hasFieldResearchTasks":false}}},{"eventID":"kyurem-in-5-star-raid-battles-december-2025","name":"Kyurem in 5-star Raid Battles","eventType":"raid-battles","heading":"Raid Battles","link":"https://leekduck.com/events/kyurem-in-5-star-raid-battles-december-2025/","image":"https://cdn.leekduck.com/assets/img/events/kyurem.jpg","start":"2025-12-04T10:00:00.000","end":"2025-12-13T10:00:00.000","timezone":"Local Time","extraData":{"raidbattles":{"bosses":[{"name":"Kyurem","image":"https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_646_11.png","canBeShiny":true}],"shinies":[{"name":"Kyurem","image":"https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_646_11_shiny.png"}]},"generic":{"hasSpawns":false,"hasFieldResearchTasks":false}}}]
```
## Usage Examples
### Fetching Events Data
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json').then(response=>response.json()).then(events=>{console.log(`Total events: ${events.length}`);}).catch(error=>console.error('Error fetching events:',error));
```
### Get Active Events
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json').then(response=>response.json()).then(events=>{const now=new Date();const activeEvents=events.filter(event=>{const start=new Date(event.start);const end=new Date(event.end);return now>=start&&now<=end;});console.log(`${activeEvents.length} active events:`);activeEvents.forEach(event=>{console.log(`- ${event.name} (${event.eventType})`);});});
```
### Filter Events by Type
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json').then(response=>response.json()).then(events=>{const communityDays=events.filter(e=>e.eventType==='community-day');const spotlightHours=events.filter(e=>e.eventType==='pokemon-spotlight-hour');const raidEvents=events.filter(e=>e.eventType==='raid-battles');console.log(`Community Days: ${communityDays.length}`);console.log(`Spotlight Hours: ${spotlightHours.length}`);console.log(`Raid Events: ${raidEvents.length}`);});
```
### Get Upcoming Events
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json').then(response=>response.json()).then(events=>{const now=new Date();const sevenDaysFromNow=new Date(now.getTime()+(7*24*60*60*1000));const upcomingEvents=events.filter(event=>{const start=new Date(event.start);return start>=now&&start<=sevenDaysFromNow;}).sort((a,b)=>new Date(a.start)-new Date(b.start));console.log('Events in the next 7 days:');upcomingEvents.forEach(event=>{const startDate=new Date(event.start).toLocaleString();console.log(`${event.name} - ${startDate}`);});});
```
### Working with Community Day Data
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json').then(response=>response.json()).then(events=>{const now=new Date();const nextCD=events.filter(e=>e.eventType==='community-day'&&new Date(e.start)>now).sort((a,b)=>new Date(a.start)-new Date(b.start))[0];if(nextCD&&nextCD.extraData?.communityday){const cdData=nextCD.extraData.communityday;console.log(`Next Community Day: ${nextCD.name}`);console.log(`Start: ${new Date(nextCD.start).toLocaleString()}`);console.log(`Featured Pokémon: ${cdData.spawns.length}`);console.log(`Bonuses: ${cdData.bonuses.length}`);console.log(`Shiny forms available: ${cdData.shinies.length}`);console.log('\nFeatured Pokémon:');cdData.spawns.forEach(spawn=>{console.log(`  - ${spawn.name}`);});console.log('\nActive Bonuses:');cdData.bonuses.forEach(bonus=>{console.log(`  - ${bonus.text}`);});}});
```
### Get Current Raid Bosses
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json').then(response=>response.json()).then(events=>{const now=new Date();const activeRaids=events.filter(event=>{if(event.eventType!=='raid-battles')return false;const start=new Date(event.start);const end=new Date(event.end);return now>=start&&now<=end;});console.log('Current Raid Bosses:');activeRaids.forEach(raid=>{if(raid.extraData?.raidbattles?.bosses){console.log(`\n${raid.name}:`);raid.extraData.raidbattles.bosses.forEach(boss=>{console.log(`  - ${boss.name} (Shiny: ${boss.canBeShiny?'Yes':'No'})`);});const endDate=new Date(raid.end).toLocaleDateString();console.log(`  Ends: ${endDate}`);}});});
```
### Get This Week's Spotlight Hour
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json').then(response=>response.json()).then(events=>{const now=new Date();const oneWeekFromNow=new Date(now.getTime()+(7*24*60*60*1000));const spotlightHours=events.filter(event=>{if(event.eventType!=='pokemon-spotlight-hour')return false;const start=new Date(event.start);return start>=now&&start<=oneWeekFromNow;});spotlightHours.forEach(event=>{if(event.extraData?.spotlight){const spotlight=event.extraData.spotlight;console.log(`\n${event.name}`);console.log(`Time: ${new Date(event.start).toLocaleString()}`);console.log(`Featured: ${spotlight.name}`);console.log(`Bonus: ${spotlight.bonus}`);console.log(`Can be shiny: ${spotlight.canBeShiny?'Yes':'No'}`);}});});
```
### Create Event Calendar
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json').then(response=>response.json()).then(events=>{const calendar={};events.forEach(event=>{const date=new Date(event.start).toISOString().split('T')[0];if(!calendar[date]){calendar[date]=[];}calendar[date].push({name:event.name,type:event.eventType,start:event.start,end:event.end,timezone:event.timezone});});const today=new Date().toISOString().split('T')[0];if(calendar[today]){console.log(`Events today (${today}):`);calendar[today].forEach(event=>{console.log(`  - ${event.name} (${event.type})`);})}});
```
### Filter by Date Range
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json').then(response=>response.json()).then(events=>{function getEventsByDateRange(startDate,endDate){const start=new Date(startDate);const end=new Date(endDate);return events.filter(event=>{const eventStart=new Date(event.start);const eventEnd=new Date(event.end);return eventStart<=end&&eventEnd>=start;});}const decemberEvents=getEventsByDateRange('2025-12-01','2025-12-31');console.log(`December 2025: ${decemberEvents.length} events`);decemberEvents.forEach(event=>{console.log(`- ${event.name}`);});});
```
### Find Events with Special Spawns
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json').then(response=>response.json()).then(events=>{const spawnEvents=events.filter(event=>event.extraData?.generic?.hasSpawns===true);console.log(`${spawnEvents.length} events with special spawns:`);spawnEvents.forEach(event=>{const start=new Date(event.start).toLocaleDateString();console.log(`- ${event.name} (${start})`);});});
```
### Calculate Event Duration
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json').then(response=>response.json()).then(events=>{function formatDuration(event){const start=new Date(event.start);const end=new Date(event.end);const durationMs=end-start;const hours=Math.floor(durationMs/(1000*60*60));const days=Math.floor(hours/24);if(days>0){const remainingHours=hours%24;return remainingHours>0?`${days}d ${remainingHours}h`:`${days}d`;}return `${hours}h`;}const now=new Date();const activeEvents=events.filter(e=>new Date(e.start)<=now&&new Date(e.end)>=now);console.log('Active Event Durations:');activeEvents.forEach(event=>{console.log(`${event.name}: ${formatDuration(event)}`);});});
```
### Search Events
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json').then(response=>response.json()).then(events=>{function searchEvents(keyword){const searchTerm=keyword.toLowerCase();return events.filter(event=>event.name.toLowerCase().includes(searchTerm)||event.eventType.toLowerCase().includes(searchTerm)||event.heading.toLowerCase().includes(searchTerm));}const kyuremEvents=searchEvents('kyurem');console.log('Kyurem events:',kyuremEvents.map(e=>e.name));const raidEvents=searchEvents('raid');console.log(`\nFound ${raidEvents.length} raid-related events`);});
```
### Get Events by Timezone
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json').then(response=>response.json()).then(events=>{const localTimeEvents=events.filter(e=>e.timezone==='Local Time');const utcEvents=events.filter(e=>e.timezone===null);console.log(`Local time events: ${localTimeEvents.length}`);console.log(`UTC events: ${utcEvents.length}`);console.log('\nUTC Events:');utcEvents.slice(0,5).forEach(event=>{console.log(`- ${event.name} (${event.eventType})`);});});
```
### Find Overlapping Events
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json').then(response=>response.json()).then(events=>{function findOverlappingEvents(targetEvent){const targetStart=new Date(targetEvent.start);const targetEnd=new Date(targetEvent.end);return events.filter(event=>{if(event.eventID===targetEvent.eventID)return false;const start=new Date(event.start);const end=new Date(event.end);return start<targetEnd&&end>targetStart;});}const communityDay=events.find(e=>e.eventType==='community-day'&&new Date(e.start)>new Date());if(communityDay){const overlapping=findOverlappingEvents(communityDay);console.log(`Events during ${communityDay.name}:`);overlapping.forEach(event=>{console.log(`- ${event.name}`);});}});
```
### Export Events to CSV
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/events.min.json').then(response=>response.json()).then(events=>{function eventsToCSV(events){const headers=['Event ID','Name','Type','Start','End','Timezone'];const rows=events.map(event=>[event.eventID,event.name,event.eventType,event.start,event.end,event.timezone||'UTC']);return[headers.join(','),...rows.map(row=>row.map(cell=>`"${cell}"`).join(','))].join('\n');}const csv=eventsToCSV(events);console.log(csv);});
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
function safeGetEvent(events,eventID){try{const event=events.find(e=>e.eventID===eventID);if(!event){throw new Error(`Event not found: ${eventID}`);}return event;}catch(error){console.error('Error fetching event:',error.message);return null;}}function safeParseDate(dateString){try{const date=new Date(dateString);if(isNaN(date.getTime())){throw new Error('Invalid date');}return date;}catch(error){console.error('Error parsing date:',error.message);return null;}}function safeGetExtraData(event,path){try{const keys=path.split('.');let value=event.extraData;for(const key of keys){if(value&&typeof value==='object'&&key in value){value=value[key];}else{return null;}}return value;}catch(error){console.error('Error accessing extra data:',error.message);return null;}}const spawns=safeGetExtraData(event,'communityday.spawns');if(spawns){console.log(`Found ${spawns.length} featured Pokémon`);}
```
# Research Data Documentation
## Overview
The Research endpoint provides information about current Field Research tasks, their rewards, and seasonal breakthrough information for Pokémon GO.
## Accessing the Data
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
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `text` | string | Yes | The task description (e.g., "Catch 5 Pokémon") |
| `type` | string | No | Task category (e.g., "catch", "throw", "battle") |
| `rewards` | array | Yes | Array of possible rewards for this task |
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
| `combatPower.min` | integer | Minimum CP |
| `combatPower.max` | integer | Maximum CP |
#### Item Reward
| Field | Type | Description |
|-------|------|-------------|
| `type` | string | Always `"item"` for item rewards |
| `name` | string | Item name with quantity (e.g., "×10") |
| `image` | string | URL to the item icon image |
| `quantity` | integer | Number of items rewarded |
## Task Type Categories
Available task types include:
- `catch` - Catching Pokémon (general or specific types)
- `throw` - Making various types of throws (Nice, Great, Excellent, Curveball)
- `battle` - Battling in raids, gyms, or GO Battle League
- `explore` - Exploration tasks (hatching eggs, spinning stops, walking distance)
- `training` - Powering up or evolving Pokémon, earning XP/Stardust
- `buddy` - Buddy-related tasks (hearts, candies, treats, photos)
- `rocket` - Team GO Rocket battles
- `sponsored` - Sponsored research tasks
- `ar` - AR scanning tasks
**Note:** Some tasks may not have a `type` field specified.
## Example Data
```json
{"seasonalInfo":{"breakthroughPokemon":["Galarian Mr"],"spindaPatterns":[6,7],"season":null},"tasks":[{"text":"Catch 5 different species of Pokémon","rewards":[{"type":"encounter","name":"Nacli","image":"https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm932.icon.png","canBeShiny":false,"combatPower":{"min":381,"max":414}}]},{"text":"Catch 10 Pokémon","type":"catch","rewards":[{"type":"item","name":"×200","image":"https://cdn.leekduck.com/assets/img/items/Stardust.png","quantity":200},{"type":"item","name":"×3","image":"https://cdn.leekduck.com/assets/img/items/Rare%20Candy.png","quantity":3}]}]}
```
## Usage Examples
### Basic Data Fetching
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/research.min.json').then(response=>response.json()).then(data=>{console.log('Current breakthrough:',data.seasonalInfo.breakthroughPokemon);console.log('Available Spinda patterns:',data.seasonalInfo.spindaPatterns);console.log('Total tasks:',data.tasks.length);});
```
### Finding Specific Rewards
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/research.min.json').then(response=>response.json()).then(data=>{const encounterTasks=data.tasks.filter(task=>task.rewards.some(reward=>reward.type==='encounter'));const shinyTasks=data.tasks.filter(task=>task.rewards.some(reward=>reward.type==='encounter'&&reward.canBeShiny));const rareCandyTasks=data.tasks.filter(task=>task.rewards.some(reward=>reward.type==='item'&&reward.name.includes('Rare Candy')));console.log(`Found ${shinyTasks.length} tasks with shiny encounters`);});
```
### Filtering by Task Type
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/research.min.json').then(response=>response.json()).then(data=>{const tasksByType=data.tasks.reduce((acc,task)=>{const type=task.type||'uncategorized';if(!acc[type])acc[type]=[];acc[type].push(task);return acc;},{});const catchTasks=tasksByType.catch||[];const throwTasks=tasksByType.throw||[];console.log(`Catch tasks: ${catchTasks.length}`);console.log(`Throw tasks: ${throwTasks.length}`);});
```
### Finding Tasks for Specific Pokémon
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/research.min.json').then(response=>response.json()).then(data=>{function getTasksForPokemon(pokemonName){return data.tasks.filter(task=>task.rewards.some(reward=>reward.type==='encounter'&&reward.name===pokemonName));}const dratiniTasks=getTasksForPokemon('Dratini');dratiniTasks.forEach(task=>{console.log(`Task: ${task.text}`);});});
```
### Analyzing Stardust Rewards
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/research.min.json').then(response=>response.json()).then(data=>{const stardustTasks=data.tasks.map(task=>{const stardustReward=task.rewards.find(reward=>reward.type==='item'&&reward.image.includes('Stardust'));return stardustReward?{task:task.text,amount:stardustReward.quantity,type:task.type}:null;}).filter(item=>item!==null).sort((a,b)=>b.amount-a.amount);console.log('Best Stardust tasks:');stardustTasks.slice(0,5).forEach(task=>{console.log(`${task.task}: ${task.amount} Stardust`);});});
```
### Building a Task Filter UI
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/research.min.json').then(response=>response.json()).then(data=>{const allEncounters=new Set();data.tasks.forEach(task=>{task.rewards.forEach(reward=>{if(reward.type==='encounter'){allEncounters.add(reward.name);}});});const taskTypes=[...new Set(data.tasks.map(task=>task.type).filter(type=>type!==undefined))];console.log('Available encounters:',Array.from(allEncounters).sort());console.log('Task types:',taskTypes.sort());});
```
### Checking for Rare Encounters
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/research.min.json').then(response=>response.json()).then(data=>{const rarePokemon=['Axew','Noibat','Gible','Deino','Jangmo-o'];rarePokemon.forEach(pokemon=>{const tasks=data.tasks.filter(task=>task.rewards.some(reward=>reward.type==='encounter'&&reward.name===pokemon));if(tasks.length>0){console.log(`\n${pokemon} found in ${tasks.length} task(s):`);tasks.forEach(task=>{const reward=task.rewards.find(r=>r.name===pokemon);console.log(`- ${task.text} (CP: ${reward.combatPower.min}-${reward.combatPower.max}, Shiny: ${reward.canBeShiny})`);});}});});
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
9. **CP Range Display** - Show expected CP ranges for encounter rewards
10. **Quest Tracker** - Build an app to track completed and available research tasks
## Notes
- Field Research tasks rotate daily at midnight local time
- Some tasks have multiple possible rewards (one reward is selected randomly when completing the task)
- Research Breakthrough requires completing 7 Field Research tasks (one stamp per day)
- Breakthrough Pokémon change monthly
- Spinda patterns rotate periodically (current patterns in `spindaPatterns` array)
- CP values for encounter rewards are for level 15 Pokémon (weather-boosted encounters are level 20)
- Some tasks only appear during specific events
- Tasks with the same text may have different rewards during different events
- Research tasks don't need to be completed on the same day they are received
- Players can hold up to 3 Field Research tasks at a time (up to 4 with certain conditions)
- Not all tasks have a `type` field - handle this appropriately in your code
## JSON Schema
The data conforms to the following JSON Schema structure:
- Root object contains `seasonalInfo` (object) and `tasks` (array)
- Each task has `text` (string, required), optional `type` (string), and `rewards` (array, required)
- Rewards are either encounter type (with `canBeShiny`, `combatPower`) or item type (with `quantity`)
- All rewards include `type`, `name`, and `image` fields
- Combat power objects include `min` and `max` integers
# Raids Data Documentation
## Overview
The Raids endpoint provides current raid boss information across all tiers in Pokémon GO, including CP ranges, type information, weather boosts, and shiny availability.
## Accessing the Data
- **Minified:** [raids.min.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/raids.min.json)
## Data Structure
The endpoint returns an **array** of raid boss objects, where each object represents a Pokémon currently available in raids.
### Raid Boss Object
| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Name of the raid boss Pokémon |
| `tier` | string | Raid tier (e.g., "Tier 1", "Tier 3", "Tier 5", "Mega", "Shadow Tier 1", "Shadow Tier 3", "Shadow Tier 5") |
| `canBeShiny` | boolean | Whether the raid boss can be encountered in its shiny form |
| `types` | array | Array of type objects for the Pokémon |
| `types[].name` | string | Type name (e.g., "rock", "ground", "normal") |
| `types[].image` | string (uri) | URL to the type icon image |
| `combatPower` | object | Combat power ranges for normal and boosted weather conditions |
| `combatPower.normal` | object | CP range under normal weather |
| `combatPower.normal.min` | integer | Minimum combat power in normal weather |
| `combatPower.normal.max` | integer | Maximum combat power in normal weather |
| `combatPower.boosted` | object | CP range when weather boosted |
| `combatPower.boosted.min` | integer | Minimum combat power in boosted weather |
| `combatPower.boosted.max` | integer | Maximum combat power in boosted weather |
| `boostedWeather` | array | Array of weather conditions that boost this Pokémon |
| `boostedWeather[].name` | string | Weather condition name (e.g., "sunny", "rainy", "windy") |
| `boostedWeather[].image` | string (uri) | URL to the weather icon image |
| `image` | string (uri) | URL to the Pokémon's icon image |
### Raid Tiers
- **Tier 1** - 1-star raids (easiest, soloable)
- **Tier 3** - 3-star raids (moderate difficulty)
- **Tier 5** - 5-star raids (Legendary Pokémon, requires group)
- **Mega** - Mega Evolution raids
- **Shadow Tier 1** - 1-star Shadow raids (Team GO Rocket)
- **Shadow Tier 3** - 3-star Shadow raids (Team GO Rocket)
- **Shadow Tier 5** - 5-star Shadow raids (Team GO Rocket)
### Weather Conditions
Weather boosts increase the CP of caught raid bosses and make them more powerful:
- **sunny** / **clear**
- **partly cloudy**
- **cloudy**
- **rainy**
- **windy**
- **snow**
- **fog**
## JSON Schema
```json
{"$schema":"http://json-schema.org/draft-07/schema#","type":"array","items":{"type":"object","properties":{"name":{"type":"string","description":"The name of the Pokémon"},"tier":{"type":"string","description":"The raid tier (e.g., 'Tier 1', 'Tier 3', 'Tier 5', 'Mega', 'Shadow Tier 1')"},"canBeShiny":{"type":"boolean","description":"Whether the Pokémon can be encountered in its shiny form"},"types":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string","description":"The type name (e.g., 'rock', 'ground', 'normal')"},"image":{"type":"string","format":"uri","description":"URL to the type icon image"}},"required":["name","image"]},"description":"Array of Pokémon types"},"combatPower":{"type":"object","properties":{"normal":{"type":"object","properties":{"min":{"type":"integer","description":"Minimum combat power in normal weather"},"max":{"type":"integer","description":"Maximum combat power in normal weather"}},"required":["min","max"]},"boosted":{"type":"object","properties":{"min":{"type":"integer","description":"Minimum combat power in boosted weather"},"max":{"type":"integer","description":"Maximum combat power in boosted weather"}},"required":["min","max"]}},"required":["normal","boosted"],"description":"Combat power ranges for normal and boosted weather conditions"},"boostedWeather":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string","description":"Weather condition name (e.g., 'sunny', 'rainy', 'windy')"},"image":{"type":"string","format":"uri","description":"URL to the weather icon image"}},"required":["name","image"]},"description":"Array of weather conditions that boost this Pokémon"},"image":{"type":"string","format":"uri","description":"URL to the Pokémon icon image"}},"required":["name","tier","canBeShiny","types","combatPower","boostedWeather","image"]}}
```
## Example Data
```json
[{"name":"Geodude","tier":"Tier 1","canBeShiny":true,"types":[{"name":"rock","image":"https://leekduck.com/assets/img/types/rock.png"},{"name":"ground","image":"https://leekduck.com/assets/img/types/ground.png"}],"combatPower":{"normal":{"min":688,"max":739},"boosted":{"min":860,"max":923}},"boostedWeather":[{"name":"partly cloudy","image":"https://leekduck.com/assets/img/weather/partlycloudy.png"},{"name":"sunny","image":"https://leekduck.com/assets/img/weather/sunny.png"}],"image":"https://cdn.leekduck.com/assets/img/pokemon_icons/pm74.icon.png"},{"name":"Kyurem","tier":"Tier 5","canBeShiny":true,"types":[{"name":"dragon","image":"https://leekduck.com/assets/img/types/dragon.png"},{"name":"ice","image":"https://leekduck.com/assets/img/types/ice.png"}],"combatPower":{"normal":{"min":1957,"max":2042},"boosted":{"min":2446,"max":2553}},"boostedWeather":[{"name":"windy","image":"https://leekduck.com/assets/img/weather/windy.png"},{"name":"snow","image":"https://leekduck.com/assets/img/weather/snowy.png"}],"image":"https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_646_11.png"}]
```
## Usage Examples
### Fetching and Filtering Raid Data
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/raids.min.json').then(response=>response.json()).then(raids=>{console.log(`Total raid bosses available: ${raids.length}`);const legendaryRaids=raids.filter(raid=>raid.tier==='Tier 5');console.log('Legendary raids:',legendaryRaids.map(r=>r.name));const shinyRaids=raids.filter(raid=>raid.canBeShiny);console.log(`${shinyRaids.length} raid bosses can be shiny`);const rainyBoost=raids.filter(raid=>raid.boostedWeather.some(w=>w.name==='rainy'));console.log('Rainy weather boosted:',rainyBoost.map(r=>r.name));}).catch(error=>console.error('Error fetching raids:',error));
```
### Grouping Raids by Tier
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/raids.min.json').then(response=>response.json()).then(raids=>{const raidsByTier=raids.reduce((acc,raid)=>{if(!acc[raid.tier]){acc[raid.tier]=[];}acc[raid.tier].push(raid);return acc;},{});Object.keys(raidsByTier).forEach(tier=>{console.log(`\n${tier}:`);raidsByTier[tier].forEach(raid=>{console.log(`  - ${raid.name} (Shiny: ${raid.canBeShiny?'Yes':'No'})`);});});});
```
### Checking Weather Boost Status
```javascript
async function getRaidInfo(){const response=await fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/raids.min.json');const raids=await response.json();function isWeatherBoosted(pokemonName,capturedCP){const raid=raids.find(r=>r.name===pokemonName);if(!raid)return null;const isBoosted=capturedCP>=raid.combatPower.boosted.min;return{isBoosted,expectedRange:isBoosted?raid.combatPower.boosted:raid.combatPower.normal,boostedBy:raid.boostedWeather.map(w=>w.name)};}const kyuremInfo=isWeatherBoosted('Kyurem',2500);console.log('Kyurem CP 2500:',kyuremInfo);}getRaidInfo();
```
### Finding Raids by Type
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/raids.min.json').then(response=>response.json()).then(raids=>{const dragonRaids=raids.filter(raid=>raid.types.some(type=>type.name==='dragon'));console.log('Dragon-type raids:',dragonRaids.map(r=>r.name));const multiTypeRaids=raids.filter(raid=>raid.types.length>1);console.log('\nDual-type raids:');multiTypeRaids.forEach(raid=>{const typeNames=raid.types.map(t=>t.name).join('/');console.log(`  ${raid.name}: ${typeNames}`);});const allTypes=[...new Set(raids.flatMap(raid=>raid.types.map(t=>t.name)))];console.log('\nAll types in raids:',allTypes.sort());});
```
### Calculating CP Ranges and Boosts
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/raids.min.json').then(response=>response.json()).then(raids=>{function analyzeRaidBoss(raid){const normalMax=raid.combatPower.normal.max;const boostedMax=raid.combatPower.boosted.max;const boostDifference=boostedMax-normalMax;const boostPercentage=((boostDifference/normalMax)*100).toFixed(2);return{name:raid.name,tier:raid.tier,normalCP:`${raid.combatPower.normal.min}-${raid.combatPower.normal.max}`,boostedCP:`${raid.combatPower.boosted.min}-${raid.combatPower.boosted.max}`,boostDifference,boostPercentage:`${boostPercentage}%`,weatherConditions:raid.boostedWeather.map(w=>w.name)};}const tier5Analysis=raids.filter(raid=>raid.tier==='Tier 5').map(analyzeRaidBoss);console.table(tier5Analysis);});
```
### Building Raid Counters Helper
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/raids.min.json').then(response=>response.json()).then(raids=>{const typeWeaknesses={dragon:['ice','dragon','fairy'],ice:['fire','fighting','rock','steel'],water:['electric','grass'],fire:['water','ground','rock'],psychic:['bug','ghost','dark'],dark:['fighting','bug','fairy']};function getCounterTypes(raidBossName){const raid=raids.find(r=>r.name===raidBossName);if(!raid)return null;const counters=new Set();raid.types.forEach(type=>{const weaknesses=typeWeaknesses[type.name]||[];weaknesses.forEach(weakness=>counters.add(weakness));});return{boss:raid.name,types:raid.types.map(t=>t.name),recommendedCounters:Array.from(counters),tier:raid.tier,boostedWeather:raid.boostedWeather.map(w=>w.name)};}const kyuremCounters=getCounterTypes('Kyurem');console.log('Kyurem Counter Guide:',kyuremCounters);});
```
### Filtering Shadow Raids
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/raids.min.json').then(response=>response.json()).then(raids=>{const shadowRaids=raids.filter(raid=>raid.tier.includes('Shadow'));console.log(`Total Shadow raids: ${shadowRaids.length}`);const shadowByTier=shadowRaids.reduce((acc,raid)=>{if(!acc[raid.tier]){acc[raid.tier]=[];}acc[raid.tier].push(raid.name);return acc;},{});console.log('Shadow raids by tier:',shadowByTier);const shinyShadow=shadowRaids.filter(raid=>raid.canBeShiny);console.log('Shiny-eligible Shadow raids:',shinyShadow.map(r=>r.name));});
```
## Common Use Cases
1. **Raid Planning** - Help players choose which raids to participate in based on difficulty and rewards
2. **Shiny Hunting** - Identify shiny-eligible raid bosses for collectors
3. **Weather Optimization** - Show which raids are currently weather boosted for maximum CP
4. **Type Counters** - Display raid boss types to help players build effective counter teams
5. **CP Verification** - Check if caught raid boss CP is within expected range to verify catch quality
6. **Tier Filtering** - Show soloable (Tier 1) vs group raids (Tier 5) for raid coordination
7. **Team Building** - Help players prepare optimal teams based on raid boss types and weaknesses
8. **Shadow Raids** - Track Team GO Rocket takeover raids with Shadow Pokémon
9. **IV Calculation** - Use CP ranges to help determine possible IV combinations
## Notes
- Raid boss rotation changes regularly based on events and monthly cycles
- CP ranges are for level 20 Pokémon (level 25 when weather boosted)
- Weather boost increases catch CP by approximately 25%
- Tier 5 raids almost always feature Legendary or Mythical Pokémon
- Mega raids require Mega Energy for the first evolution
- Some raid bosses appear temporarily during special events
- Shiny rates for raids are typically higher than wild encounters (approximately 1/20 for Legendaries)
- Shadow raids feature Shadow Pokémon controlled by Team GO Rocket
- All required fields are guaranteed to be present in the data
- Image URLs point to official Pokémon GO assets from leekduck.com CDN
# Rocket Lineups Data Documentation
## Overview
The Rocket Lineups endpoint provides detailed information about Team GO Rocket encounters, including Giovanni, Leaders, and Grunts. It shows possible Pokémon lineups, types, and which Pokémon can be encountered as rewards.
## Accessing the Data
- **Minified:** [rocketLineups.min.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/rocketLineups.min.json)
## Data Structure
The endpoint returns an **array** of Rocket member objects, ordered by importance (Giovanni → Leaders → Grunts).
### Rocket Member Object
| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Name of the Rocket member (e.g., "Giovanni", "Cliff", "Fire-type Female Grunt") |
| `title` | string | Title/rank ("Team GO Rocket Boss", "Team GO Rocket Leader", "Team GO Rocket Grunt") |
| `type` | string | Type specialization for grunts (e.g., "fire", "water", "normal") or empty string for leaders/Giovanni |
| `gender` | string | Gender ("Male" or "Female") |
| `firstPokemon` | array | Array of possible Pokémon in first battle slot |
| `secondPokemon` | array | Array of possible Pokémon in second battle slot |
| `thirdPokemon` | array | Array of possible Pokémon in third battle slot |
### Pokémon Object
Each Pokémon in the lineup has the following structure:
| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Pokémon name (may include form/variant like "Tornadus (Incarnate)" or "Alolan Muk") |
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
[{"name":"Giovanni","title":"Team GO Rocket Boss","type":"","gender":"Male","firstPokemon":[{"name":"Persian","image":"https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm53.icon.png","types":["normal"],"isEncounter":false,"canBeShiny":false}],"secondPokemon":[{"name":"Kangaskhan","image":"https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm115.icon.png","types":["normal"],"isEncounter":false,"canBeShiny":false},{"name":"Rhyperior","image":"https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm464.icon.png","types":["ground","rock"],"isEncounter":false,"canBeShiny":false}],"thirdPokemon":[{"name":"Tornadus (Incarnate)","image":"https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm641.fINCARNATE.icon.png","types":["flying"],"isEncounter":true,"canBeShiny":false}]},{"name":"Fire-type Female Grunt","title":"Team GO Rocket Grunt","type":"fire","gender":"Female","firstPokemon":[{"name":"Darumaka","image":"https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm554.icon.png","types":["fire"],"isEncounter":true,"canBeShiny":false},{"name":"Numel","image":"https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm322.icon.png","types":["fire","ground"],"isEncounter":true,"canBeShiny":false}],"secondPokemon":[{"name":"Houndoom","image":"https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm229.icon.png","types":["dark","fire"],"isEncounter":false,"canBeShiny":false}],"thirdPokemon":[{"name":"Charizard","image":"https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm6.icon.png","types":["fire","flying"],"isEncounter":false,"canBeShiny":false}]}]
```
## Usage Examples
### Basic Fetching and Filtering
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/rocketLineups.min.json').then(response=>response.json()).then(lineups=>{const giovanni=lineups.find(member=>member.name==='Giovanni');console.log('Giovanni lineup:',giovanni);const leaders=lineups.filter(member=>member.title==='Team GO Rocket Leader');console.log('Leaders:',leaders.map(l=>l.name));const fireGrunts=lineups.filter(member=>member.type==='fire');console.log('Fire grunts:',fireGrunts);const gruntTypes=[...new Set(lineups.filter(m=>m.title==='Team GO Rocket Grunt'&&m.type).map(m=>m.type))].sort();console.log('Available grunt types:',gruntTypes);});
```
### Finding Encounters and Shinies
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/rocketLineups.min.json').then(response=>response.json()).then(lineups=>{const encounters=lineups.flatMap(member=>{const allPokemon=[...member.firstPokemon,...member.secondPokemon,...member.thirdPokemon];return allPokemon.filter(pokemon=>pokemon.isEncounter).map(pokemon=>({pokemon:pokemon.name,member:member.name,types:pokemon.types,canBeShiny:pokemon.canBeShiny}));});const shinyEncounters=encounters.filter(e=>e.canBeShiny);console.log('Shiny-eligible Shadow Pokémon:',shinyEncounters);const encountersByType=lineups.reduce((acc,member)=>{if(member.title==='Team GO Rocket Grunt'&&member.type){const memberEncounters=[...member.firstPokemon,...member.secondPokemon,...member.thirdPokemon].filter(p=>p.isEncounter).map(p=>p.name);if(memberEncounters.length>0){acc[member.type]=memberEncounters;}}return acc;},{});console.log('Encounters by type:',encountersByType);});
```
### Lineup Analysis
```javascript
function getPossibleLineups(lineups,memberName){const member=lineups.find(m=>m.name===memberName);if(!member)return null;const combinations=[];for(const first of member.firstPokemon){for(const second of member.secondPokemon){for(const third of member.thirdPokemon){combinations.push([first.name,second.name,third.name]);}}}return combinations;}function getTypeCoverage(lineups,memberName){const member=lineups.find(m=>m.name===memberName);if(!member)return null;const allPokemon=[...member.firstPokemon,...member.secondPokemon,...member.thirdPokemon];const typeCounts={};allPokemon.forEach(pokemon=>{pokemon.types.forEach(type=>{typeCounts[type]=(typeCounts[type]||0)+1;});});return Object.entries(typeCounts).sort((a,b)=>b[1]-a[1]).map(([type,count])=>({type,count}));}function findMembersWithPokemon(lineups,pokemonName){return lineups.filter(member=>{const allPokemon=[...member.firstPokemon,...member.secondPokemon,...member.thirdPokemon];return allPokemon.some(p=>p.name===pokemonName);}).map(member=>({name:member.name,title:member.title,type:member.type||'mixed'}));}fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/rocketLineups.min.json').then(response=>response.json()).then(lineups=>{console.log('Cliff combinations:',getPossibleLineups(lineups,'Cliff'));console.log('Giovanni types:',getTypeCoverage(lineups,'Giovanni'));console.log('Members with Larvitar:',findMembersWithPokemon(lineups,'Larvitar'));});
```
### Building Counter Teams
```javascript
const typeEffectiveness={normal:['fighting'],fire:['water','ground','rock'],water:['electric','grass'],electric:['ground'],grass:['fire','ice','poison','flying','bug'],ice:['fire','fighting','rock','steel'],fighting:['flying','psychic','fairy'],poison:['ground','psychic'],ground:['water','grass','ice'],flying:['electric','ice','rock'],psychic:['bug','ghost','dark'],bug:['fire','flying','rock'],rock:['water','grass','fighting','ground','steel'],ghost:['ghost','dark'],dragon:['ice','dragon','fairy'],dark:['fighting','bug','fairy'],steel:['fire','fighting','ground'],fairy:['poison','steel']};function getCounterTypes(lineups,memberName){const member=lineups.find(m=>m.name===memberName);if(!member)return null;const allPokemon=[...member.firstPokemon,...member.secondPokemon,...member.thirdPokemon];const typesToCounter=new Set();allPokemon.forEach(pokemon=>{pokemon.types.forEach(type=>typesToCounter.add(type));});const counterTypeScores={};typesToCounter.forEach(type=>{const counters=typeEffectiveness[type]||[];counters.forEach(counter=>{counterTypeScores[counter]=(counterTypeScores[counter]||0)+1;});});return Object.entries(counterTypeScores).sort((a,b)=>b[1]-a[1]).map(([type,score])=>({type,effectiveness:score}));}fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/rocketLineups.min.json').then(response=>response.json()).then(lineups=>{console.log('Best counters for Arlo:',getCounterTypes(lineups,'Arlo'));console.log('Best counters for Fire-type Female Grunt:',getCounterTypes(lineups,'Fire-type Female Grunt'));});
```
### Creating a Lineup Display Component
```javascript
function createLineupDisplay(member){const container=document.createElement('div');container.className='rocket-member';container.innerHTML=`<h2>${member.name}</h2><p class="title">${member.title}</p>${member.type?`<span class="type-badge ${member.type}">${member.type.toUpperCase()}</span>`:''}<div class="lineup-slots"><div class="slot"><h3>First Pokémon</h3>${member.firstPokemon.map(p=>`<div class="pokemon ${p.isEncounter?'encounter':''}"><img src="${p.image}" alt="${p.name}"><p>${p.name}</p><div class="types">${p.types.map(t=>`<span class="type ${t}">${t}</span>`).join('')}</div>${p.isEncounter?'<span class="badge">Catchable</span>':''}${p.canBeShiny?'<span class="badge shiny">✨ Shiny</span>':''}</div>`).join('')}</div><div class="slot"><h3>Second Pokémon</h3>${member.secondPokemon.map(p=>`<div class="pokemon"><img src="${p.image}" alt="${p.name}"><p>${p.name}</p><div class="types">${p.types.map(t=>`<span class="type ${t}">${t}</span>`).join('')}</div></div>`).join('')}</div><div class="slot"><h3>Third Pokémon</h3>${member.thirdPokemon.map(p=>`<div class="pokemon"><img src="${p.image}" alt="${p.name}"><p>${p.name}</p><div class="types">${p.types.map(t=>`<span class="type ${t}">${t}</span>`).join('')}</div></div>`).join('')}</div></div>`;return container;}fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/rocketLineups.min.json').then(response=>response.json()).then(lineups=>{const appContainer=document.getElementById('app');const leaders=lineups.filter(m=>m.title==='Team GO Rocket Leader');leaders.forEach(leader=>{appContainer.appendChild(createLineupDisplay(leader));});});
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
- **normal** - Normal-type Pokémon
- **fire** - Fire-type Pokémon
- **water** - Water-type Pokémon
- **grass** - Grass-type Pokémon
- **electric** - Electric-type Pokémon
- **ice** - Ice-type Pokémon
- **fighting** - Fighting-type Pokémon
- **poison** - Poison-type Pokémon
- **ground** - Ground-type Pokémon
- **flying** - Flying-type Pokémon
- **psychic** - Psychic-type Pokémon
- **bug** - Bug-type Pokémon
- **rock** - Rock-type Pokémon
- **ghost** - Ghost-type Pokémon
- **dragon** - Dragon-type Pokémon
- **dark** - Dark-type Pokémon
- **steel** - Steel-type Pokémon
- **fairy** - Fairy-type Pokémon
## Notes
- Giovanni's lineup rotates approximately every month with Special Research releases
- Leader lineups (Cliff, Arlo, Sierra) rotate more frequently, typically every few months
- Grunt lineups are relatively stable but can change during events
- Shadow Pokémon have reduced IVs (minimum 0/0/0) but gain a 20% damage boost
- Purifying Shadow Pokémon increases their IVs and decreases Stardust/Candy costs
- Giovanni requires a Super Rocket Radar (obtained from Special Research)
- Leaders require a Rocket Radar (assembled from 6 Mysterious Components dropped by Grunts)
- Only one Pokémon from the lineup can be caught per encounter (the first slot for Leaders/Giovanni)
- Female and Male grunt variants of the same type may have different lineups
- Shiny Shadow Pokémon are extremely rare (approximately 1/64 rate when available)
- Some special grunts like "Male Grunt" and "Female Grunt" have mixed-type lineups (empty `type` field)
- The "Decoy Female Grunt" appears at PokéStops taken over by Leaders
## Data Updates
This data is updated when Niantic rotates Team GO Rocket lineups, typically:
- Monthly for Giovanni (with new Special Research)
- Every 2-3 months for Leaders
- Periodically for Grunts, especially during themed events
# Eggs Data Documentation
## Overview
The Eggs endpoint provides detailed information about which Pokémon can hatch from different egg types in Pokémon GO, including rarity, CP ranges, shiny availability, and special acquisition methods.
## Accessing the Data
- **Minified:** [eggs.min.json](https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/eggs.min.json)
## Data Structure
The endpoint returns an **array** of Pokémon objects, where each object represents a Pokémon that can hatch from an egg.
### Pokémon Object
| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Name of the Pokémon (may include form/variant like "Indeedee (Male)" or "Alolan Geodude") |
| `eggType` | string | Type of egg ("1 km", "2 km", "5 km", "7 km", "10 km", "12 km") |
| `isAdventureSync` | boolean | Whether this Pokémon is available from Adventure Sync reward eggs |
| `image` | string | URL to the Pokémon's icon image |
| `canBeShiny` | boolean | Whether the Pokémon can be shiny when hatched |
| `combatPower` | object | CP range for hatched Pokémon (at level 20) |
| `combatPower.min` | number | Minimum CP when hatched (currently same as max) |
| `combatPower.max` | number | Maximum CP when hatched (currently same as min) |
| `isRegional` | boolean | Whether the Pokémon is region-exclusive |
| `isGiftExchange` | boolean | Whether the Pokémon is available specifically from Gift Exchange (7 km eggs from friends) |
| `rarity` | number | Numeric rarity value (1-5 scale, where 5 is rarest) |
| `rarityTier` | string | Human-readable rarity tier |
### Rarity Scale
| Value | Tier | Description |
|-------|------|-------------|
| **1** | Common | Frequently hatches |
| **2** | Uncommon | Hatches regularly |
| **3** | Rare | Hatches less frequently |
| **4** | Very Rare | Rarely hatches |
| **5** | Ultra Rare | Extremely rare hatches |
## Egg Types
- **1 km** - Starter Pokémon from all generations (requires special event eggs)
- **2 km** - Baby Pokémon and common species
- **5 km** - Standard egg pool, mixed rarities
- **7 km** - Regional variants and Alolan/Galarian/Hisuian forms (from Gifts)
- **10 km** - Rare and pseudo-legendary Pokémon
- **12 km** - Strange Eggs from Team GO Rocket Leaders (Dark/Poison-type focused)
## Example Data
```json
[{"name":"Bulbasaur","eggType":"1 km","isAdventureSync":false,"image":"https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm1.icon.png","canBeShiny":true,"combatPower":{"min":637,"max":637},"isRegional":false,"isGiftExchange":false,"rarity":4,"rarityTier":"Very Rare"},{"name":"Riolu","eggType":"5 km","isAdventureSync":true,"image":"https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm447.icon.png","canBeShiny":true,"combatPower":{"min":567,"max":567},"isRegional":false,"isGiftExchange":false,"rarity":1,"rarityTier":"Common"},{"name":"Galarian Corsola","eggType":"7 km","isAdventureSync":false,"image":"https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm222.fGALARIAN.icon.png","canBeShiny":true,"combatPower":{"min":855,"max":855},"isRegional":false,"isGiftExchange":true,"rarity":1,"rarityTier":"Common"}]
```
## Usage Examples
### Basic Filtering and Grouping
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/eggs.min.json').then(response=>response.json()).then(eggs=>{const eggGroups=eggs.reduce((acc,egg)=>{if(!acc[egg.eggType]){acc[egg.eggType]=[];}acc[egg.eggType].push(egg);return acc;},{});console.log('Egg groups:',eggGroups);const shiny10km=eggs.filter(egg=>egg.eggType==='10 km'&&egg.canBeShiny);console.log('Shiny 10km hatches:',shiny10km.map(e=>e.name));const adventureSyncRewards=eggs.filter(egg=>egg.isAdventureSync).reduce((acc,egg)=>{if(!acc[egg.eggType]){acc[egg.eggType]=[];}acc[egg.eggType].push(egg.name);return acc;},{});console.log('Adventure Sync rewards:',adventureSyncRewards);const ultraRare=eggs.filter(egg=>egg.rarity===5);console.log('Ultra rare Pokémon:',ultraRare.map(e=>({name:e.name,eggType:e.eggType,canBeShiny:e.canBeShiny})));});
```
### Rarity Analysis
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/eggs.min.json').then(response=>response.json()).then(eggs=>{function getRarityDistribution(eggType){const eggsOfType=eggs.filter(e=>e.eggType===eggType);const distribution=eggsOfType.reduce((acc,egg)=>{const tier=egg.rarityTier;if(!acc[tier]){acc[tier]={count:0,pokemon:[]};}acc[tier].count++;acc[tier].pokemon.push(egg.name);return acc;},{});return distribution;}function getBestEggsForRarity(){const rareByType={};eggs.forEach(egg=>{if(egg.rarity>=4){if(!rareByType[egg.eggType]){rareByType[egg.eggType]=[];}rareByType[egg.eggType].push({name:egg.name,rarity:egg.rarityTier,canBeShiny:egg.canBeShiny});}});return rareByType;}console.log('10km rarity distribution:',getRarityDistribution('10 km'));console.log('Rare hatches by egg type:',getBestEggsForRarity());});
```
### Shiny Hunting Tools
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/eggs.min.json').then(response=>response.json()).then(eggs=>{const shinyByEggType=eggs.filter(egg=>egg.canBeShiny).reduce((acc,egg)=>{if(!acc[egg.eggType]){acc[egg.eggType]=[];}acc[egg.eggType].push({name:egg.name,rarity:egg.rarityTier,isAdventureSync:egg.isAdventureSync});return acc;},{});const priorityShinyHunts=eggs.filter(egg=>egg.canBeShiny&&egg.rarity>=4).sort((a,b)=>b.rarity-a.rarity).map(egg=>({name:egg.name,eggType:egg.eggType,rarity:egg.rarityTier,cp:egg.combatPower.max}));function canHatchShiny(pokemonName){const matches=eggs.filter(e=>e.name===pokemonName);return matches.map(egg=>({eggType:egg.eggType,canBeShiny:egg.canBeShiny,isAdventureSync:egg.isAdventureSync}));}console.log('Shiny hatches by type:',shinyByEggType);console.log('Priority shiny hunts:',priorityShinyHunts);console.log('Larvesta shiny info:',canHatchShiny('Larvesta'));});
```
### Gift Exchange and Regional Pokémon
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/eggs.min.json').then(response=>response.json()).then(eggs=>{const giftExclusive=eggs.filter(egg=>egg.isGiftExchange);console.log('Gift Exchange Pokémon:',giftExclusive.map(e=>e.name));const regionalEggs=eggs.filter(egg=>egg.isRegional);console.log('Regional Pokémon:',regionalEggs);const sevenKmEggs=eggs.filter(egg=>egg.eggType==='7 km');const giftOnly=sevenKmEggs.filter(e=>e.isGiftExchange);const alsoInWild=sevenKmEggs.filter(e=>!e.isGiftExchange);console.log('7km eggs from gifts:',giftOnly.length);console.log('7km eggs also available elsewhere:',alsoInWild.length);});
```
### CP and Battle Planning
```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/eggs.min.json').then(response=>response.json()).then(eggs=>{const highestCP=eggs.sort((a,b)=>b.combatPower.max-a.combatPower.max).slice(0,10).map(egg=>({name:egg.name,cp:egg.combatPower.max,eggType:egg.eggType,rarity:egg.rarityTier}));function getHatchCP(pokemonName){const matches=eggs.filter(e=>e.name===pokemonName);return matches.map(egg=>({eggType:egg.eggType,cp:egg.combatPower.max,isAdventureSync:egg.isAdventureSync}));}const valuableHatches=eggs.filter(egg=>egg.combatPower.max>=1000&&egg.rarity>=3&&egg.canBeShiny);console.log('Top 10 highest CP hatches:',highestCP);console.log('Beldum hatch CP:',getHatchCP('Beldum'));console.log('Valuable hatches:',valuableHatches.length);});
```
### Building an Egg Tracker
```javascript
function createEggPoolDisplay(eggs,eggType){const eggsOfType=eggs.filter(e=>e.eggType===eggType);const byRarity=eggsOfType.reduce((acc,egg)=>{if(!acc[egg.rarityTier]){acc[egg.rarityTier]=[];}acc[egg.rarityTier].push(egg);return acc;},{});const container=document.createElement('div');container.className='egg-pool';container.innerHTML=`<h2>${eggType} Eggs</h2>`;const rarityOrder=['Ultra Rare','Very Rare','Rare','Uncommon','Common'];rarityOrder.forEach(tier=>{if(byRarity[tier]){const section=document.createElement('div');section.className=`rarity-section ${tier.toLowerCase().replace(' ','-')}`;section.innerHTML=`<h3>${tier} (${byRarity[tier].length})</h3><div class="pokemon-grid">${byRarity[tier].map(egg=>`<div class="pokemon-card ${egg.canBeShiny?'shiny-eligible':''}"><img src="${egg.image}" alt="${egg.name}"><p class="name">${egg.name}</p><p class="cp">CP: ${egg.combatPower.max}</p>${egg.canBeShiny?'<span class="badge shiny">✨</span>':''}${egg.isAdventureSync?'<span class="badge as">AS</span>':''}${egg.isGiftExchange?'<span class="badge gift">🎁</span>':''}</div>`).join('')}</div>`;container.appendChild(section);}});return container;}function findPokemonInMultipleEggs(eggs){const pokemonEggs={};eggs.forEach(egg=>{if(!pokemonEggs[egg.name]){pokemonEggs[egg.name]=[];}pokemonEggs[egg.name].push({eggType:egg.eggType,rarity:egg.rarityTier,isAdventureSync:egg.isAdventureSync});});const multipleEggs=Object.entries(pokemonEggs).filter(([name,eggs])=>eggs.length>1).map(([name,eggs])=>({name,eggs}));return multipleEggs;}fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/eggs.min.json').then(response=>response.json()).then(eggs=>{const appContainer=document.getElementById('app');appContainer.appendChild(createEggPoolDisplay(eggs,'10 km'));const multiEgg=findPokemonInMultipleEggs(eggs);console.log('Pokémon in multiple egg types:',multiEgg);});
```
## Common Use Cases
1. **Egg Pool Analysis** - Show players what can hatch from each egg distance
2. **Shiny Hunting** - Identify which hatches can be shiny for targeted incubator use
3. **Adventure Sync Planning** - Display available Adventure Sync rewards by distance
4. **Rarity Tracking** - Help players prioritize incubator usage on rare hatches
5. **Regional Collection** - Identify region-exclusive Pokémon available in eggs
6. **CP Estimation** - Show expected CP ranges for newly hatched Pokémon
7. **Gift Exchange Tracking** - Monitor which Pokémon are available from 7 km eggs
8. **Incubator Optimization** - Recommend best eggs to hatch based on goals
## Special Egg Types
### Adventure Sync Eggs (5 km & 10 km)
- Earned by walking 25 km (5 km egg) or 50 km (10 km egg) per week
- Typically contain rarer Pokémon than standard eggs
- Requires Adventure Sync feature to be enabled
- Limited to one reward per distance tier per week
### Gift Exchange Eggs (7 km)
- Obtained exclusively from opening Gifts from friends
- Primarily feature regional variants (Alolan, Galarian, Hisuian)
- Some Pokémon are marked with `isGiftExchange: true` for exclusive availability
- Useful for obtaining regional forms without traveling
### Strange Eggs (12 km)
- Dropped by defeating Team GO Rocket Leaders
- Contains Dark and Poison-type Pokémon
- Limited egg space requirement (must have open egg slot when defeating Leader)
- Generally contains more competitive/battle-relevant Pokémon
## Notes
- **CP Values** represent hatched Pokémon at trainer level 20 (or 25 with weather boost)
- CP `min` and `max` are currently identical, representing the base hatch CP
- Some Pokémon appear in **multiple egg types** with different rarities (e.g., Larvesta in 2 km, 5 km, and 10 km)
- Egg pools are **updated regularly** as Niantic rotates available Pokémon during events
- Regional Pokémon may only appear in eggs obtained from their respective regions
- **1 km eggs** are special event eggs that typically contain starter Pokémon
- Shiny rates from eggs are generally higher than wild encounters
- Adventure Sync rewards have **guaranteed higher IV minimums** (10/10/10)
- Some 7 km egg Pokémon appear with both `isGiftExchange: false` and `true` flags, indicating availability through different methods
- Always check for event-specific egg pools, as temporary events may significantly alter hatch rates and available species
## Data Updates
This data is updated when Niantic rotates egg pools, typically:
- During seasonal changes (quarterly)
- During special events (monthly or more frequently)
- When new Pokémon are released
- During GO Fest and other major events
Always check the repository for the most current egg pool information before planning your incubator strategy.