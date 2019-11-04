// node modules needed
const fs = require('fs');
const csv2geojson = require('csv2geojson');
const chalk = require('chalk');

function convertCsv() { // create geojson from csv file

  fs.readFile(__dirname + '/../raw-data/bus_stops.csv', 'utf-8', (err, csvString) => { // read csv file

    if (err) throw err;

    console.log(chalk.green('bus_stops.csv loaded')) // console log file loaded
    console.log(chalk.green('parsing csv ...'))

    csv2geojson.csv2geojson(csvString, { // set LATITUDE and LONGITUDE for geojson output file from fields in csv
      latfield: 'LATITUDE',
      lonfield: 'LONGITUDE',
      delimiter: ',' // delimit with comma
    }, (err, geojson) => {

      if (err) throw err;

      var outGeoJSON = filterFields(geojson); // call function to get needed fields from csv


      fs.writeFile(__dirname + '/../data/bus-stops.json', JSON.stringify(outGeoJSON), 'utf-8', (err) => {

        if (err) throw err;

        console.log(chalk.green('bus-stops.json written to file'));
      });
    })
  });
}

function filterFields(geojson) { // filter fields from csv file

  var features = geojson.features,
    newFeatures = [];

  features.forEach((feature) => {

    var tempProps = {};

    for (var prop in feature.properties) {
      if (prop === 'Current Supervisor Districts' || prop === 'STOPID') {
        tempProps[prop] = feature.properties[prop];
      }
    }

    newFeatures.push({
      "type": feature.type,
      "geometry": feature.geometry,
      "properties": tempProps
    });
  });

  return {
    "type": "FeatureCollection",
    "features": newFeatures
  }
}

exports.convertCsv = convertCsv;
exports.filterFields = filterFields;
