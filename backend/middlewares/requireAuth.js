const requireAuth = async (req, res, next) => {

  if (!req.user) {
    return res.status(403).send("Invalid session")
  } 
  
  next()


};

module.exports = {
  requireAuth,
};
