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
