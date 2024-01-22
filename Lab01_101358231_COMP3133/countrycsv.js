const fs = require('fs');
const csv = require('csv-parser');

const canada_file_name = 'canada.txt';
const usa_file_name = 'usa.txt';
const input_file_name = 'input_countries.csv';

try {
    fs.unlinkSync(canada_file_name);
    console.log(`${canada_file_name} was deleted.`);
} catch (err) {
    console.log(`${canada_file_name} doesn't exist.`);
}

try {
    fs.unlinkSync(usa_file_name);
    console.log(`${usa_file_name} was deleted.`);
} catch (err) {
    console.log(`${usa_file_name} doesn't exist.`);
}

const canadaStream = fs.createWriteStream(canada_file_name, { flags: 'a' });
const usaStream = fs.createWriteStream(usa_file_name, { flags: 'a' });
const header = 'country,year,population';
canadaStream.write(`${header}\n`);
usaStream.write(`${header}\n`);

fs.createReadStream(input_file_name)
    .pipe(csv())
    .on('data', (row) => {
        if (row.country === 'Canada') {
            canadaStream.write(`${row.country},${row.year},${row.population}\n`);
        } else if (row.country === 'United States') {
            usaStream.write(`${row.country},${row.year},${row.population}\n`);
        }
    })
    .on('end', () => {
        canadaStream.end();
        usaStream.end();
        console.log(`${canada_file_name} and ${usa_file_name} were created.`);
    });