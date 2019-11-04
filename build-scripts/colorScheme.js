// modules needed
const fs = require('fs');
const chalk = require('chalk');


function extractColors() { // get Prismcolors from cartocolors.json file

  fs.readFile(__dirname + '/../raw-data/cartocolors.json', function (err, response) { // read cartocolrs.json file

    if (err) throw err;

    console.log(chalk.green("cartocolors.json data loaded!"));

    const data = JSON.parse(response);

    console.log(chalk.green("cartocolors.json data parsed to JSON"));

    const outputData = { // select Prism color scheme from cartocolors.json
      'Prism': data['Prism']
    };

    console.log(chalk.green("Prism scheme extracted from parsed data"));

    fs.writeFile(__dirname + '/../data/Prismcolors.json', JSON.stringify(outputData), 'utf-8', function (err) { // output Prism colors to json file

      if (err) throw err;

      console.log(chalk.green('Prismcolors.json written to data/ dir'));
    });
  });
}

exports.extractColors = extractColors
