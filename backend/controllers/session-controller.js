require("dotenv").config();
const { verify } = require("jsonwebtoken");
// const mongoose = require("mongoose");
// const User = require("../models/user-model");
const { getUser, invalidateSession } = require("../db/mockSession");
const { signJWT, verifyJWT } = require("../utils/jwt.utils");
const { createSession } = require("../db/mockSession");

const createSessionHandler = async (req, res) => {
  const { email, password } = req.body;
  // find User from database
  const user = getUser(email);

  // TODO find the way to encrypt the password and decrypt for check
  // check user valid or password incorrect
  if (!user || user.password !== password) {
    res.status(401).json("Invalid email or password");
    
  } else {

    const session = createSession(user.email, user.username);

    const accessToken = signJWT(
      {
        email: user.email,
        username: user.username,
        sessionId: session.sessionId,
      },
      "5s"
    );

    const refreshToken = signJWT(
      {
        sessionId: session.sessionId
      },
      "1y"
    );

    res.cookie("accessToken", accessToken, {
      maxAge: 300000,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 3.154e10,
      httpOnly: true,
    });

    res.send(session);
  }
  
};

const getSessionHandler = async (req, res) => {
  res.send(req.user);
};

const logoutHandler = async (req, res) => {

  console.log(req);
  const { user } = req;

  const session = invalidateSession(user.sessionId)



  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.send({ success: true });
};

module.exports = {
  createSessionHandler,
  getSessionHandler,
  logoutHandler,
};
