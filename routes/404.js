const express = require('express');

const router = express.Router();
const controller = require('../controllers/404.js');

router.use('/', controller.notFound);

module.exports = router;
