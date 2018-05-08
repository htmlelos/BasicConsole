const bodyParser = require('body-parser')

const jsonParser = bodyParser.json();
const urlencoderParser = bodyParser.urlencoded({
    extended: false
})

module.exports = {
  jsonParser,
  urlencoderParser
}