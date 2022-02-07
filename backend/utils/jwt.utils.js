require("dotenv").config();
const jwt = require("jsonwebtoken");

const privateKey = process.env.JWT_PRIVATE_KEY.replace(/\\n/g, "\n");
const publicKey = process.env.JWT_PUBLIC_KEY.replace(/\\n/g, "\n");

const signJWT = (payload, expiresIn) => {
  return jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn });
};

const verifyJWT = token => {
  try {
    const decoded = jwt.verify(token, publicKey);
    return { payload: decoded, expired: false };
  } catch (error) {
    return { payload: null, expired: error.message.includes("jwt expired") };
  }
};

module.exports = {
  signJWT,
  verifyJWT,
};
