const fs = require('fs')
const file = `${__dirname}/config.json`

module.exports = {
    read: () => JSON.parse(fs.readFileSync(file)),
    write: (data) => fs.writeFileSync(file, JSON.stringify(data)),
 }