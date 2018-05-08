const path = require('path')
const cors = require('cors')

const config = (server, express) => {
  server.set('view engine', 'pug')
  server.set('views', path.join(__dirname, '\\..\\..\\views'))

  server.use('/static', express.static(path.join(__dirname, '\\..\\..\\public')))
  server.use(cors())
}

module.exports = config;