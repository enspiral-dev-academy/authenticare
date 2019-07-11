require('dotenv').config()
const server = require('./server')

const port = 3030

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port', port)
})
