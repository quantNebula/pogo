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
    },
    {
        "name": "Riolu",
        "eggType": "5 km",
        "isAdventureSync": true,
        "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm447.icon.png",
        "canBeShiny": true,
        "combatPower": {
            "min": 567,
            "max": 567
        },
        "isRegional": false,
        "isGiftExchange": false,
        "rarity": 1,
        "rarityTier": "Common"
    },
    {
        "name": "Galarian Corsola",
        "eggType": "7 km",
        "isAdventureSync": false,
        "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm222.fGALARIAN.icon.png",
        "canBeShiny": true,
        "combatPower": {
            "min": 855,
            "max": 855
        },
        "isRegional": false,
        "isGiftExchange": true,
        "rarity": 1,
        "rarityTier": "Common"
    }
]
```

## Usage Examples

### Basic Filtering and Grouping

```javascript
// Fetch the data
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/eggs.min.json')
  .then(response => response.json())
  .then(eggs => {
    // Group Pokémon by egg type
    const eggGroups = eggs.reduce((acc, egg) => {
      if (!acc[egg.eggType]) {
        acc[egg.eggType] = [];
      }
      acc[egg.eggType].push(egg);
      return acc;
    }, {});
    console.log('Egg groups:', eggGroups);

    // Find all shiny-eligible Pokémon from 10 km eggs
    const shiny10km = eggs.filter(egg =>
      egg.eggType === '10 km' && egg.canBeShiny
    );
    console.log('Shiny 10km hatches:', shiny10km.map(e => e.name));

    // Get Adventure Sync rewards by distance
    const adventureSyncRewards = eggs
      .filter(egg => egg.isAdventureSync)
      .reduce((acc, egg) => {
        if (!acc[egg.eggType]) {
          acc[egg.eggType] = [];
        }
        acc[egg.eggType].push(egg.name);
        return acc;
      }, {});
    console.log('Adventure Sync rewards:', adventureSyncRewards);

    // Find ultra rare hatches
    const ultraRare = eggs.filter(egg => egg.rarity === 5);
    console.log('Ultra rare Pokémon:', ultraRare.map(e => ({
      name: e.name,
      eggType: e.eggType,
      canBeShiny: e.canBeShiny
    })));
  });
```

### Rarity Analysis

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/eggs.min.json')
  .then(response => response.json())
  .then(eggs => {
    // Get rarity distribution for an egg type
    function getRarityDistribution(eggType) {
      const eggsOfType = eggs.filter(e => e.eggType === eggType);
      const distribution = eggsOfType.reduce((acc, egg) => {
        const tier = egg.rarityTier;
        if (!acc[tier]) {
          acc[tier] = { count: 0, pokemon: [] };
        }
        acc[tier].count++;
        acc[tier].pokemon.push(egg.name);
        return acc;
      }, {});
      return distribution;
    }

    // Find best eggs for rare hatches
    function getBestEggsForRarity() {
      const rareByType = {};
      eggs.forEach(egg => {
        if (egg.rarity >= 4) { // Very Rare or Ultra Rare
          if (!rareByType[egg.eggType]) {
            rareByType[egg.eggType] = [];
          }
          rareByType[egg.eggType].push({
            name: egg.name,
            rarity: egg.rarityTier,
            canBeShiny: egg.canBeShiny
          });
        }
      });
      return rareByType;
    }

    console.log('10km rarity distribution:', getRarityDistribution('10 km'));
    console.log('Rare hatches by egg type:', getBestEggsForRarity());
  });
```

### Shiny Hunting Tools

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/eggs.min.json')
  .then(response => response.json())
  .then(eggs => {
    // Find all shiny-eligible hatches grouped by egg type
    const shinyByEggType = eggs
      .filter(egg => egg.canBeShiny)
      .reduce((acc, egg) => {
        if (!acc[egg.eggType]) {
          acc[egg.eggType] = [];
        }
        acc[egg.eggType].push({
          name: egg.name,
          rarity: egg.rarityTier,
          isAdventureSync: egg.isAdventureSync
        });
        return acc;
      }, {});

    // Find highest priority shiny hunts (rare + shiny-eligible)
    const priorityShinyHunts = eggs
      .filter(egg => egg.canBeShiny && egg.rarity >= 4)
      .sort((a, b) => b.rarity - a.rarity)
      .map(egg => ({
        name: egg.name,
        eggType: egg.eggType,
        rarity: egg.rarityTier,
        cp: egg.combatPower.max
      }));

    // Check if specific Pokémon can hatch shiny
    function canHatchShiny(pokemonName) {
      const matches = eggs.filter(e => e.name === pokemonName);
      return matches.map(egg => ({
        eggType: egg.eggType,
        canBeShiny: egg.canBeShiny,
        isAdventureSync: egg.isAdventureSync
      }));
    }

    console.log('Shiny hatches by type:', shinyByEggType);
    console.log('Priority shiny hunts:', priorityShinyHunts);
    console.log('Larvesta shiny info:', canHatchShiny('Larvesta'));
  });
```

### Gift Exchange and Regional Pokémon

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/eggs.min.json')
  .then(response => response.json())
  .then(eggs => {
    // Get Gift Exchange exclusive Pokémon
    const giftExclusive = eggs.filter(egg => egg.isGiftExchange);
    console.log('Gift Exchange Pokémon:', giftExclusive.map(e => e.name));

    // Find regional Pokémon in eggs
    const regionalEggs = eggs.filter(egg => egg.isRegional);
    console.log('Regional Pokémon:', regionalEggs);

    // Get all 7km egg options (Gift eggs)
    const sevenKmEggs = eggs.filter(egg => egg.eggType === '7 km');
    const giftOnly = sevenKmEggs.filter(e => e.isGiftExchange);
    const alsoInWild = sevenKmEggs.filter(e => !e.isGiftExchange);

    console.log('7km eggs from gifts:', giftOnly.length);
    console.log('7km eggs also available elsewhere:', alsoInWild.length);
  });
```

### CP and Battle Planning

```javascript
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/eggs.min.json')
  .then(response => response.json())
  .then(eggs => {
    // Find highest CP hatches
    const highestCP = eggs
      .sort((a, b) => b.combatPower.max - a.combatPower.max)
      .slice(0, 10)
      .map(egg => ({
        name: egg.name,
        cp: egg.combatPower.max,
        eggType: egg.eggType,
        rarity: egg.rarityTier
      }));

    // Get CP range for specific Pokémon
    function getHatchCP(pokemonName) {
      const matches = eggs.filter(e => e.name === pokemonName);
      return matches.map(egg => ({
        eggType: egg.eggType,
        cp: egg.combatPower.max,
        isAdventureSync: egg.isAdventureSync
      }));
    }

    // Find valuable hatches (high CP + rare + shiny-eligible)
    const valuableHatches = eggs.filter(egg =>
      egg.combatPower.max >= 1000 &&
      egg.rarity >= 3 &&
      egg.canBeShiny
    );

    console.log('Top 10 highest CP hatches:', highestCP);
    console.log('Beldum hatch CP:', getHatchCP('Beldum'));
    console.log('Valuable hatches:', valuableHatches.length);
  });
```

### Building an Egg Tracker

```javascript
// Example for displaying egg pool in a web app
function createEggPoolDisplay(eggs, eggType) {
  const eggsOfType = eggs.filter(e => e.eggType === eggType);

  // Group by rarity
  const byRarity = eggsOfType.reduce((acc, egg) => {
    if (!acc[egg.rarityTier]) {
      acc[egg.rarityTier] = [];
    }
    acc[egg.rarityTier].push(egg);
    return acc;
  }, {});

  const container = document.createElement('div');
  container.className = 'egg-pool';
  container.innerHTML = `<h2>${eggType} Eggs</h2>`;

  // Display by rarity tier
  const rarityOrder = ['Ultra Rare', 'Very Rare', 'Rare', 'Uncommon', 'Common'];
  rarityOrder.forEach(tier => {
    if (byRarity[tier]) {
      const section = document.createElement('div');
      section.className = `rarity-section ${tier.toLowerCase().replace(' ', '-')}`;
      section.innerHTML = `
        <h3>${tier} (${byRarity[tier].length})</h3>
        <div class="pokemon-grid">
          ${byRarity[tier].map(egg => `
            <div class="pokemon-card ${egg.canBeShiny ? 'shiny-eligible' : ''}">
              <img src="${egg.image}" alt="${egg.name}">
              <p class="name">${egg.name}</p>
              <p class="cp">CP: ${egg.combatPower.max}</p>
              ${egg.canBeShiny ? '<span class="badge shiny">✨</span>' : ''}
              ${egg.isAdventureSync ? '<span class="badge as">AS</span>' : ''}
              ${egg.isGiftExchange ? '<span class="badge gift">🎁</span>' : ''}
            </div>
          `).join('')}
        </div>
      `;
      container.appendChild(section);
    }
  });

  return container;
}

// Find duplicate Pokémon across egg types
function findPokemonInMultipleEggs(eggs) {
  const pokemonEggs = {};

  eggs.forEach(egg => {
    if (!pokemonEggs[egg.name]) {
      pokemonEggs[egg.name] = [];
    }
    pokemonEggs[egg.name].push({
      eggType: egg.eggType,
      rarity: egg.rarityTier,
      isAdventureSync: egg.isAdventureSync
    });
  });

  // Filter to only those in multiple egg types
  const multipleEggs = Object.entries(pokemonEggs)
    .filter(([name, eggs]) => eggs.length > 1)
    .map(([name, eggs]) => ({ name, eggs }));

  return multipleEggs;
}

// Usage
fetch('https://raw.githubusercontent.com/quantNebula/pogo/refs/heads/main/files/eggs.min.json')
  .then(response => response.json())
  .then(eggs => {
    const appContainer = document.getElementById('app');
  
    // Display 10km eggs
    appContainer.appendChild(createEggPoolDisplay(eggs, '10 km'));
  
    // Find Pokémon available in multiple egg types
    const multiEgg = findPokemonInMultipleEggs(eggs);
    console.log('Pokémon in multiple egg types:', multiEgg);
  });
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