// set constants variables for modules required
const fs = require('fs');
const csvParse = require('csv-parse');
const chalk = require('chalk');
const mapshaper = require('mapshaper');

// function to process datafiles
function processBindFiles() {

  fs.readFile(__dirname + "/../raw-data/sup_district.geojson", 'utf8', (err, geojson) => { // read data file

    if (err) throw err;

    const commands = '-filter-fields supdistpad -simplify dp 15% -o precision=.0001 format=geojson'; // set mapshaper inputs, only one field output "council_di" simpilifly to 15% set deciamal to 4 digits with geojson output

    mapshaper.applyCommands(commands, geojson, (err, data) => { // run mapshaper with inputs from commands using geojson as data

      if (err) throw err;

      const geojson = JSON.parse(data);

      fs.readFile(__dirname + "/../raw-data/bus_stops.csv", "utf8", (err, csvString) => { // read csv file into data

        if (err) throw err;

        csvParse(csvString, {
          columns: true
        }, (err, csv) => {

          const outGeoJSON = bindData(geojson, csv); // add csv data to geojson data call bindData function

          fs.writeFile(__dirname + '/../data/district-counts-bus.json', JSON.stringify(outGeoJSON), 'utf8', function (err) { // save csv file to geojson

            if (err) throw err;

            console.log(chalk.green('district-counts-bus.json written')); // ouput to console file was saved
          })
        });
      });
    });
  });
}

function bindData(geojson, csv) { // combine csv file with geojson file

  geojson.features.forEach(function (feature) {

    let count = 0;

    csv.forEach((row) => { // loop each row
      if (parseInt(feature.properties.supdistpad) === parseInt(row.Current_Supervisor_Districts)) { // test row Current_Supervisor_Districts matches supdistpad (need to change to number) to count total per district
        console.log(Number(feature.properties.supdistpad))
        // console.log(row.Current_Supervisor_Districts)
        count++
      }
    });

    feature.properties.count = count;

  });

  return geojson; // adds count per districts return data to save

}

exports.processBindFiles = processBindFiles;
exports.bindData = bindData;
