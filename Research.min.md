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