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
