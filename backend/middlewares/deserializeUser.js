const { getSession } = require("../db/mockSession");
const { patch } = require("../routes/session-route");
const { verifyJWT, signJWT } = require("../utils/jwt.utils");

const deserializeUser = (req, res, next) => {
  const { accessToken , refreshToken } = req.cookies;
  
  if (!accessToken) return next()
  
  const { payload, expired } = verifyJWT(accessToken);

  // valid accessToken
  if (payload) {
    req.user = payload
    return next()
  }

  const {payload: refresh } = expired && refreshToken ? verifyJWT(refreshToken) : { payload : null}

  if (!refresh) return next()

  const session = getSession(refresh.sessionId)

  if (!session) return next()

  const newAccessToken = signJWT(session, "5s")


  res.cookie("accessToken", newAccessToken, {
    maxAge: 300000,
    httpOnly:true
  })
  
  req.user = verifyJWT(newAccessToken).payload

  next();
};

module.exports = {
  deserializeUser,
};

// no need to return next() 
// that's will make some overhead at the systems

// Should invoke only one next()
// cause next() will invoke next function that has res.send() if another next() invoked it will warn "you can't set header after sent respond to the client"