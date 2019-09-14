const testSecret = require('./testSecret')
const createTestToken = require('./createTestToken')
const getTokenDecoder = require('./getTokenDecoder')

let allowTokens = true

const passingDecoder = () => getTokenDecoder()
const failingDecoder = () => getTokenDecoder(false)

module.exports = {
  testSecret,
  createTestToken,
  allowTokens: () => { allowTokens = true },
  disAllowTokens: () => { allowTokens = false },
  getTokenDecoder: allowTokens ? passingDecoder : failingDecoder
}

