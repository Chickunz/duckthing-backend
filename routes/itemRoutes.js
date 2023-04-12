const express = require('express');
const router = express.Router();
const {
  createItem
} = require('../controllers/itemController');

router.route('/createItem').post(createItem);

module.exports = router;
