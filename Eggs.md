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
