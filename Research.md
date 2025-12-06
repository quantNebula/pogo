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
