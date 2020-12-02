function getTokenDecoder (
  tokenRequired = true,
  isAuthorized = true,
  tokenToUse = {}
) {
  return (req, res, next) => {
    if (!tokenRequired) {
      // token not required
      next()
      return
    }

    if (isAuthorized) {
      // token is authorized
      req.user = tokenToUse
      next()
      return
    }

    // token required and not authorized
    res.status(401).send('Unauthorized')
  }
}

module.exports = getTokenDecoder
