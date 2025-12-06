const fs = require('fs');
const events = require('./pages/events')
const raids = require('./pages/raids')
const research = require('./pages/research')
const eggs = require('./pages/eggs')
const rocketLineups = require('./pages/rocketLineups')

function createCombinedFile()
{
    // Wait a moment for all files to be written
    setTimeout(() => {
        try {
            const combined = {
                events: JSON.parse(fs.readFileSync('./files/events.json', 'utf8')),
                raids: JSON.parse(fs.readFileSync('./files/raids.json', 'utf8')),
                research: JSON.parse(fs.readFileSync('./files/research.json', 'utf8')),
                eggs: JSON.parse(fs.readFileSync('./files/eggs.json', 'utf8')),
                rocketLineups: JSON.parse(fs.readFileSync('./files/rocketLineups.json', 'utf8'))
            };

            // Write formatted version
            fs.writeFileSync('./files/combined.json', JSON.stringify(combined, null, 4));
            console.log('Created files/combined.json');

            // Write minified version
            fs.writeFileSync('./files/combined.min.json', JSON.stringify(combined));
            console.log('Created files/combined.min.json');
        } catch (error) {
            console.error('Error creating combined file:', error.message);
        }
    }, 2000); // 2 second delay to ensure all files are written
}

function main()
{
    if (!fs.existsSync('files'))
        fs.mkdirSync('files');

    events.get();
    raids.get();
    research.get();
    eggs.get();
    rocketLineups.get();

    // Create combined file after all scrapers run
    createCombinedFile();
}

try
{
    main();
}
catch (e)
{
    console.error("ERROR: " + e);
    process.exit(1);
}