const server = require('../../server')
const testSecret = require('./testSecret')
const createTestToken = require('./createTestToken')
const getTokenDecoder = require('./getTokenDecoder')

let allowTokens = true

const passingDecoder = () => getTokenDecoder()
const failingDecoder = () => getTokenDecoder(false)

module.exports = {
  ...server,
  testSecret,
  createTestToken,
  allowTokens: () => { allowTokens = true },
  disAllowTokens: () => { allowTokens = false },
  getTokenDecoder: allowTokens ? passingDecoder : failingDecoder
}

