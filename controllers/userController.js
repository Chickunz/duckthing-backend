const User = require("../models/User");
const Session = require("../models/Session");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const createUser = async (req, res) => {
  let { userName, password } = req.body;

  const newUser = {
    username: String(userName),
    password: String(password),
    joinDate: Date(),
  };

  let user = "";

  try {
    user = await User.create(newUser);
  } catch (e) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errorMsg: "User already exists!" });
  }

  res.status(StatusCodes.OK).send();
};

const login = async (req, res) => {
  const currentTime = Date();

  const { username, password } = req.body;

  let user;

  //Checks to see if user exists
  if (username) {
    try {
      user = await User.find({ username: username });
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errorMsg: "Username needed to login" });
  }

  //Checks to see if user exists
  if (user.length === 0) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errorMsg: "User was not found!" });
  }

  //Checks to make sure the password matches
  const isMatch = await bcrypt.compare(password, user.at(0).password);

  if (!isMatch) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errorMsg: "Password is incorrect!" });
  }

  const generateSessionNumber = crypto.randomUUID();

  let searchedSessions;

  //Try to see if session already exists, if it does
  //throw an error
  try {
    searchedSessions = await Session.find({ username: username });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }

  if (searchedSessions.length > 0) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errorMsg: "User is already logged in!" });
  }

  //Create new session
  const newSession = {
    sessionId: generateSessionNumber,
    username: username,
    creationDate: currentTime,
  };

  let createdSession;

  try {
    createdSession = await Session.create(newSession);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }

  res
    .status(StatusCodes.OK)
    .json({ sessionId: createdSession.sessionId, username: username })
    .send();
};

const logout = async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errorMsg: "Need a SessionId to logout" });
  }

  try {
    await Session.deleteOne({ sessionId: sessionId });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }

  res.status(StatusCodes.OK).send();
};

module.exports = {
  createUser,
  login,
  logout,
};
