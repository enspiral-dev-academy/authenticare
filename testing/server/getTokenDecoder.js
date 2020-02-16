function getTokenDecoder (
  tokenRequired = true,
  isAuthorized = true,
  tokenToUse = {}
) {
  return (req, res, next) => {
    if (!tokenRequired) {
      // console.log('token not required')
      next()
      return
    }

    if(isAuthorized) {
      // console.log('token is authorized')
      req.user = tokenToUse
      next()
      return
    }

    // console.log('token required and not authorized')
    res.status(401).send('Unauthorized')
  }
}

module.exports = getTokenDecoder
