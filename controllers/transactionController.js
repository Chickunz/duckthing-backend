const Item = require("../models/Item");
const Session = require("../models/Session");
const { StatusCodes } = require("http-status-codes");

const buyItem = async (req, res) => {
  let { itemName, sessionId } = req.body;

  //Will store the current session
  let currentSession;

  //Checks to see if user is logged in first
  if (sessionId === null) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errorMsg: "You need to be logged in to buy an item!" });
  } else {
    try {
      currentSession = await Session.find({ sessionId: sessionId });
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }

    if (currentSession.length !== 0) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errorMsg: "You need to be logged in to buy an item!" });
    }
  }

  //If user is logged in, find that user
  try {
    user = await User.find({ username: currentSession.username });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }

  //Create a transaction in the database
  const newTransaction = {
    
  }
};

module.exports = {
  createTransaction,
};
