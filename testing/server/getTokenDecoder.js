module.exports = function getTokenDecoder (authorize = true) {
  return (req, res, next) => {
    authorize ? next() : res.status(401).send('Unauthorized')
  }
}
