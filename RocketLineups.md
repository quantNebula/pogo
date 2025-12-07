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
            },
            {
                "name": "Rhyperior",
                "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm464.icon.png",
                "types": ["ground", "rock"],
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
        "name": "Fire-type Female Grunt",
        "title": "Team GO Rocket Grunt",
        "type": "fire",
        "gender": "Female",
        "firstPokemon": [
            {
                "name": "Darumaka",
                "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm554.icon.png",
                "types": ["fire"],
                "isEncounter": true,
                "canBeShiny": false
            },
            {
                "name": "Numel",
                "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm322.icon.png",
                "types": ["fire", "ground"],
                "isEncounter": true,
                "canBeShiny": false
            }
        ],
        "secondPokemon": [
            {
                "name": "Houndoom",
                "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm229.icon.png",
                "types": ["dark", "fire"],
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

### Basic Fetching and Filtering

```javascript
// Fetch the data
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/rocketLineups.min.json')
  .then(response => response.json())
  .then(lineups => {
    // Get Giovanni's lineup
    const giovanni = lineups.find(member => member.name === 'Giovanni');
    console.log('Giovanni lineup:', giovanni);

    // Get all Leader lineups
    const leaders = lineups.filter(member =>
      member.title === 'Team GO Rocket Leader'
    );
    console.log('Leaders:', leaders.map(l => l.name));

    // Find grunts by type
    const fireGrunts = lineups.filter(member =>
      member.type === 'fire'
    );
    console.log('Fire grunts:', fireGrunts);

    // Get all available grunt types
    const gruntTypes = [...new Set(
      lineups
        .filter(m => m.title === 'Team GO Rocket Grunt' && m.type)
        .map(m => m.type)
    )].sort();
    console.log('Available grunt types:', gruntTypes);
  });
```

### Finding Encounters and Shinies

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/rocketLineups.min.json')
  .then(response => response.json())
  .then(lineups => {
    // Get all possible encounter rewards
    const encounters = lineups.flatMap(member => {
      const allPokemon = [
        ...member.firstPokemon,
        ...member.secondPokemon,
        ...member.thirdPokemon
      ];
      return allPokemon
        .filter(pokemon => pokemon.isEncounter)
        .map(pokemon => ({
          pokemon: pokemon.name,
          member: member.name,
          types: pokemon.types,
          canBeShiny: pokemon.canBeShiny
        }));
    });

    // Find shiny-eligible encounters
    const shinyEncounters = encounters.filter(e => e.canBeShiny);
    console.log('Shiny-eligible Shadow Pokémon:', shinyEncounters);

    // Group encounters by member type
    const encountersByType = lineups.reduce((acc, member) => {
      if (member.title === 'Team GO Rocket Grunt' && member.type) {
        const memberEncounters = [
          ...member.firstPokemon,
          ...member.secondPokemon,
          ...member.thirdPokemon
        ]
          .filter(p => p.isEncounter)
          .map(p => p.name);
      
        if (memberEncounters.length > 0) {
          acc[member.type] = memberEncounters;
        }
      }
      return acc;
    }, {});
    console.log('Encounters by type:', encountersByType);
  });
```

### Lineup Analysis

```javascript
// Get all possible lineup combinations for a specific member
function getPossibleLineups(lineups, memberName) {
  const member = lineups.find(m => m.name === memberName);
  if (!member) return null;

  const combinations = [];

  for (const first of member.firstPokemon) {
    for (const second of member.secondPokemon) {
      for (const third of member.thirdPokemon) {
        combinations.push([first.name, second.name, third.name]);
      }
    }
  }

  return combinations;
}

// Get type coverage for a member (useful for team building)
function getTypeCoverage(lineups, memberName) {
  const member = lineups.find(m => m.name === memberName);
  if (!member) return null;

  const allPokemon = [
    ...member.firstPokemon,
    ...member.secondPokemon,
    ...member.thirdPokemon
  ];

  // Count type occurrences
  const typeCounts = {};
  allPokemon.forEach(pokemon => {
    pokemon.types.forEach(type => {
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
  });

  return Object.entries(typeCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => ({ type, count }));
}

// Find which members use a specific Pokémon
function findMembersWithPokemon(lineups, pokemonName) {
  return lineups
    .filter(member => {
      const allPokemon = [
        ...member.firstPokemon,
        ...member.secondPokemon,
        ...member.thirdPokemon
      ];
      return allPokemon.some(p => p.name === pokemonName);
    })
    .map(member => ({
      name: member.name,
      title: member.title,
      type: member.type || 'mixed'
    }));
}

// Usage
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/rocketLineups.min.json')
  .then(response => response.json())
  .then(lineups => {
    console.log('Cliff combinations:', getPossibleLineups(lineups, 'Cliff'));
    console.log('Giovanni types:', getTypeCoverage(lineups, 'Giovanni'));
    console.log('Members with Larvitar:', findMembersWithPokemon(lineups, 'Larvitar'));
  });
```

### Building Counter Teams

```javascript
// Type effectiveness chart (simplified)
const typeEffectiveness = {
  normal: ['fighting'],
  fire: ['water', 'ground', 'rock'],
  water: ['electric', 'grass'],
  electric: ['ground'],
  grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
  ice: ['fire', 'fighting', 'rock', 'steel'],
  fighting: ['flying', 'psychic', 'fairy'],
  poison: ['ground', 'psychic'],
  ground: ['water', 'grass', 'ice'],
  flying: ['electric', 'ice', 'rock'],
  psychic: ['bug', 'ghost', 'dark'],
  bug: ['fire', 'flying', 'rock'],
  rock: ['water', 'grass', 'fighting', 'ground', 'steel'],
  ghost: ['ghost', 'dark'],
  dragon: ['ice', 'dragon', 'fairy'],
  dark: ['fighting', 'bug', 'fairy'],
  steel: ['fire', 'fighting', 'ground'],
  fairy: ['poison', 'steel']
};

// Get recommended counter types for a Rocket member
function getCounterTypes(lineups, memberName) {
  const member = lineups.find(m => m.name === memberName);
  if (!member) return null;

  const allPokemon = [
    ...member.firstPokemon,
    ...member.secondPokemon,
    ...member.thirdPokemon
  ];

  // Collect all types we need to counter
  const typesToCounter = new Set();
  allPokemon.forEach(pokemon => {
    pokemon.types.forEach(type => typesToCounter.add(type));
  });

  // Find effective counter types
  const counterTypeScores = {};
  typesToCounter.forEach(type => {
    const counters = typeEffectiveness[type] || [];
    counters.forEach(counter => {
      counterTypeScores[counter] = (counterTypeScores[counter] || 0) + 1;
    });
  });

  return Object.entries(counterTypeScores)
    .sort((a, b) => b[1] - a[1])
    .map(([type, score]) => ({ type, effectiveness: score }));
}

// Usage
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/rocketLineups.min.json')
  .then(response => response.json())
  .then(lineups => {
    console.log('Best counters for Arlo:', getCounterTypes(lineups, 'Arlo'));
    console.log('Best counters for Fire-type Female Grunt:',
      getCounterTypes(lineups, 'Fire-type Female Grunt'));
  });
```

### Creating a Lineup Display Component

```javascript
// Example for displaying lineups in a web app
function createLineupDisplay(member) {
  const container = document.createElement('div');
  container.className = 'rocket-member';

  container.innerHTML = `
    <h2>${member.name}</h2>
    <p class="title">${member.title}</p>
    ${member.type ? `<span class="type-badge ${member.type}">${member.type.toUpperCase()}</span>` : ''}
  
    <div class="lineup-slots">
      <div class="slot">
        <h3>First Pokémon</h3>
        ${member.firstPokemon.map(p => `
          <div class="pokemon ${p.isEncounter ? 'encounter' : ''}">
            <img src="${p.image}" alt="${p.name}">
            <p>${p.name}</p>
            <div class="types">
              ${p.types.map(t => `<span class="type ${t}">${t}</span>`).join('')}
            </div>
            ${p.isEncounter ? '<span class="badge">Catchable</span>' : ''}
            ${p.canBeShiny ? '<span class="badge shiny">✨ Shiny</span>' : ''}
          </div>
        `).join('')}
      </div>
    
      <div class="slot">
        <h3>Second Pokémon</h3>
        ${member.secondPokemon.map(p => `
          <div class="pokemon">
            <img src="${p.image}" alt="${p.name}">
            <p>${p.name}</p>
            <div class="types">
              ${p.types.map(t => `<span class="type ${t}">${t}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    
      <div class="slot">
        <h3>Third Pokémon</h3>
        ${member.thirdPokemon.map(p => `
          <div class="pokemon">
            <img src="${p.image}" alt="${p.name}">
            <p>${p.name}</p>
            <div class="types">
              ${p.types.map(t => `<span class="type ${t}">${t}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  return container;
}

// Usage
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/rocketLineups.min.json')
  .then(response => response.json())
  .then(lineups => {
    const appContainer = document.getElementById('app');
  
    // Display leaders
    const leaders = lineups.filter(m => m.title === 'Team GO Rocket Leader');
    leaders.forEach(leader => {
      appContainer.appendChild(createLineupDisplay(leader));
    });
  });
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