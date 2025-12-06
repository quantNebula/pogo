const fs = require('fs');
const moment = require('moment');
const jsd = require('jsdom');
const { JSDOM } = jsd;
const https = require('https');

function get()
{
    https.get("https://leekduck.com/feeds/events.json", (res) =>
    {
        var body = "";
        var eventDates = []; 
        res.on("data", (chunk) => { body += chunk; });
    
        res.on("end", () => {
            try
            {
                var feedJson = JSON.parse(body);

                for (var i = 0; i < feedJson.length; i++)
                {
                    var id = feedJson[i].eventID;
                    var start = feedJson[i].start;
                    var end = feedJson[i].end;

                    eventDates[id] = { "start": start, "end": end };
                }
            }
            catch (error)
            {
                console.error(error.message);
            };

            return new Promise(resolve => {
                JSDOM.fromURL("https://leekduck.com/events/", {
                })
                .then((dom) => {
        
                    var allEvents = [];
        
                    ["current","upcoming"].forEach(category => {
                        
                        var events = dom.window.document.querySelectorAll(`div.events-list.${category}-events a.event-item-link`);
        
                        events.forEach (e =>
                        {
                            var heading = e.querySelector(":scope > .event-item-wrapper > p").innerHTML;
                            var name = e.querySelector(":scope > .event-item-wrapper > .event-item > .event-text-container > .event-text > h2").innerHTML;
                            
                            // Extract timezone from paragraph text which contains the full date
                            var paragraphElement = e.querySelector(":scope > .event-item-wrapper > .event-item > .event-text-container > .event-text > p");
                            var timezone = null;
                            if (paragraphElement) {
                                var paragraphText = paragraphElement.textContent || paragraphElement.innerHTML;
                                if (paragraphText.includes("Local Time")) {
                                    timezone = "Local Time";
                                } else if (paragraphText.includes(" PST")) {
                                    timezone = "PST";
                                } else if (paragraphText.includes(" PDT")) {
                                    timezone = "PDT";
                                } else if (paragraphText.includes(" EST")) {
                                    timezone = "EST";
                                } else if (paragraphText.includes(" EDT")) {
                                    timezone = "EDT";
                                } else if (paragraphText.includes(" UTC")) {
                                    timezone = "UTC";
                                }
                            }
                            
                            var image = e.querySelector(":scope > .event-item-wrapper > .event-item > .event-img-wrapper > img").src;
                            if (image.includes("cdn-cgi"))
                            {
                                image = "https://cdn.leekduck.com/assets/" + image.split("/assets/")[1];
                            }
                            var link = e.href;
                            var eventID = link.split("/events/")[1];
                            eventID = eventID.substring(0, eventID.length - 1);

                            if (!(eventID in eventDates))
                            {
                                console.warn(`WARNING: Event '${eventID}' not present in events feed. Date values will be null.`);
                            }
                            
                            var eventItemWrapper = e.querySelector(":scope > .event-item-wrapper");
                            var eventType = (eventItemWrapper.classList + "").replace("event-item-wrapper ", "");
                            eventType = eventType.replace("é", "e");

                            var start = eventDates[eventID]?.start || null;
                            var end = eventDates[eventID]?.end || null;

                            if (start?.length > 24)
                            {
                                start = "" + new Date(Date.parse(start)).toISOString();
                            }
                            if (end?.length > 24)
                            {
                                end = "" + new Date(Date.parse(end)).toISOString();
                            }
        
                            allEvents.push({ "eventID": eventID, "name": name, "eventType": eventType, "heading": heading, "link": link, "image": image, "start": start, "end": end, "timezone": timezone, "extraData": null });
                        });
                    });
        
                    for (var i = 0; i < allEvents.length; i++)
                    {
                        var event = allEvents[i];
                        if (allEvents.filter(e => e.eventID == event.eventID).length > 1)
                        {
                            var allWithID = allEvents.filter(_e => _e.eventID == event.eventID);
        
                            if (allWithID[0].start)
                            {
                                event.start = allWithID[0].start;
                                event.end = allWithID[1].end;
                            }
                            else
                            {
                                event.start = allWithID[1].start;
                                event.end = allWithID[0].end;
                            }
        
                            allEvents = allEvents.filter(e => e.eventID != event.eventID);
                            allEvents.splice(i, 0, event);
        
                            i--;
                        }
                    }
        
                    fs.writeFile('files/events.json', JSON.stringify(allEvents, null, 4), err => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
                    fs.writeFile('files/events.min.json', JSON.stringify(allEvents), err => {
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
        });
    
    }).on("error", (error) => {
        console.error(error.message);
    });
}

module.exports = { get }