const fs = require('fs');
const jsd = require('jsdom');
const { JSDOM } = jsd;
const https = require('https');

function get()
{
    return new Promise(resolve => {
        JSDOM.fromURL("https://leekduck.com/research/", {
        })
        .then((dom) => {

            var taskNameToID = [];
            taskNameToID["Event Tasks"] = "event";
            taskNameToID["Catching Tasks"] = "catch";
            taskNameToID["Throwing Tasks"] = "throw";
            taskNameToID["Battling Tasks"] = "battle";
            taskNameToID["Exploring Tasks"] = "explore";
            taskNameToID["Training Tasks"] = "training";
            taskNameToID["Team GO Rocket Tasks"] = "rocket";
            taskNameToID["Buddy &amp; Friendship Tasks"] = "buddy";
            taskNameToID["AR Scanning Tasks"] = "ar";
            taskNameToID["Sponsored Tasks"] = "sponsored";


            // Extract seasonal metadata (Research Breakthrough info and Spinda patterns)
            var seasonalInfo = {
                breakthroughPokemon: [],
                spindaPatterns: [],
                season: null
            };
            
            // Look for the seasonal information in the page content
            var paragraphs = dom.window.document.querySelectorAll('.page-content > p');
            paragraphs.forEach(p => {
                var text = p.textContent || "";
                
                // Extract Research Breakthrough Pokemon
                if (text.includes("Research Breakthrough") && text.includes("encounter")) {
                    var match = text.match(/encounter with one of the following Pokémon: ([^.]+)/);
                    if (match) {
                        // Split by comma and clean up names
                        seasonalInfo.breakthroughPokemon = match[1].split(',').map(name => name.trim());
                    }
                }
                
                // Extract Spinda patterns
                if (text.toLowerCase().includes("spinda")) {
                    // Match patterns like "pattern 4 and 5" or "patterns 4 and 5"
                    var patternMatch = text.match(/pattern[s]?\s+(\d+(?:\s+and\s+\d+)?)/i);
                    if (patternMatch) {
                        // Extract pattern numbers (e.g., "4 and 5" becomes [4, 5])
                        var patterns = patternMatch[1].match(/\d+/g);
                        if (patterns) {
                            seasonalInfo.spindaPatterns = patterns.map(num => parseInt(num));
                        }
                    }
                }
                
                // Extract season name
                if (text.includes("Season,") || text.includes("season,")) {
                    var seasonMatch = text.match(/Season,\\s+([^.]+?)\\./i) || text.match(/season,\\s+([^.]+?)\\./i);
                    if (seasonMatch) {
                        seasonalInfo.season = seasonMatch[1].trim();
                    }
                }
            });

            var types = dom.window.document.querySelectorAll('.task-category');

            var research = [] 
            
            types.forEach (_e =>
            {
                _e.querySelectorAll(":scope > .task-list > .task-item").forEach(task => {
                    var text = task.querySelector(":scope > .task-text").innerHTML.trim();
                    var type = taskNameToID[_e.querySelector(":scope > h2").innerHTML.trim()];

                    var rewards = [];
                    
                    task.querySelectorAll(":scope > .reward-list > .reward").forEach(r => {
                        var rewardType = r.dataset.rewardType || "unknown";
                        
                        if (rewardType == "encounter")
                        {
                            // Pokemon encounter reward
                            var reward = { 
                                type: "encounter",
                                name: "",
                                image: "",
                                canBeShiny: false,
                                combatPower: {
                                    min: -1,
                                    max: -1
                                }
                            };

                            reward.name = r.querySelector(":scope > .reward-label > span").innerHTML.trim();
                            reward.image = r.querySelector(":scope > .reward-bubble > .reward-image").src;

                            reward.combatPower.min = parseInt(r.querySelector(":scope > .cp-values > .min-cp").innerHTML.trim().split("</div>")[1]);
                            reward.combatPower.max = parseInt(r.querySelector(":scope > .cp-values > .max-cp").innerHTML.trim().split("</div>")[1]);
                            reward.canBeShiny = r.querySelector(":scope > .reward-bubble > .shiny-icon") != null;

                            rewards.push(reward);
                        }
                        else if (rewardType == "item")
                        {
                            // Item reward (Stardust, berries, balls, candy, etc.)
                            var reward = {
                                type: "item",
                                name: "",
                                image: "",
                                quantity: 1
                            };
                            
                            var labelElement = r.querySelector(":scope > .reward-label > span");
                            if (labelElement) {
                                var labelText = labelElement.innerHTML.trim();
                                
                                // Parse quantity if the name contains ×N format (e.g., "×5000")
                                var quantityMatch = labelText.match(/×(\d+)/);
                                if (quantityMatch) {
                                    reward.quantity = parseInt(quantityMatch[1]);
                                    // Try to determine item type from image or context
                                    reward.name = labelText; // Keep original for now
                                } else {
                                    reward.name = labelText;
                                }
                                
                                // Also check for multiplier element on the reward bubble
                                var multiplierElement = r.querySelector(":scope > .reward-bubble > .multiplier");
                                if (multiplierElement) {
                                    var multiplierText = multiplierElement.innerHTML.trim();
                                    var match = multiplierText.match(/×(\d+)/);
                                    if (match) {
                                        reward.quantity = parseInt(match[1]);
                                    }
                                }
                            }
                            
                            var imageElement = r.querySelector(":scope > .reward-bubble > .reward-image");
                            if (imageElement) {
                                reward.image = imageElement.src;
                            }
                            
                            rewards.push(reward);
                        }
                    });

                    if (rewards.length > 0)
                    {
                        if (research.filter(r => r.text == text && r.type == type).length > 0)
                        {
                            var foundResearch = research.findIndex(fr => { return fr.text == text });
                            rewards.forEach(rw => {
                                research[foundResearch].rewards.push(rw);
                            });
                        }
                        else
                        {
                            research.push({ "text": text, "type": type, "rewards": rewards});
                        }
                    }
                });
            });

            // Create output object with tasks and seasonal metadata
            var output = {
                seasonalInfo: seasonalInfo,
                tasks: research
            };

            fs.writeFile('files/research.json', JSON.stringify(output, null, 4), err => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
            fs.writeFile('files/research.min.json', JSON.stringify(output), err => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        }).catch(_err =>
            {
                console.log(_err);
            });
    })
}

module.exports = { get }