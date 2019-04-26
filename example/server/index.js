require('dotenv').config()
const server = require('./server')

const port = 3000

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port', port)
})
