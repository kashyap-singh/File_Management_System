let chalk = require("chalk"); //Used to Change font Colours.
function helpfn() {
    console.log(chalk.blue(`
    List of All the commands:
                node index.js tree "directoryPath"
                node index.js organize "directoryPath"
                node index.js help
                `));
}

//Helps us to import this file to other files so that we can access its functionality.
module.exports={
    helpkey:helpfn
}