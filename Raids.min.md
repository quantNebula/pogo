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