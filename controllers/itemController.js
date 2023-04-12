const Item = require("../models/Item");
const Session = require("../models/Session");
const { StatusCodes } = require("http-status-codes");

const createItem = async (req, res) => {
  let { name, price, condition } = req.body;

  const newItem = {
    name: String(name),
    price: String(price),
    condition: String(condition),
  };

  let item = "";

  try {
    item = await Item.create(newItem);
  } catch (e) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errorMsg: "Item already exists!" });
  }

  res.status(StatusCodes.OK).send();
};

module.exports = {
  createItem,
};
