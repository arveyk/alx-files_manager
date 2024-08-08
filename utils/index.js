const express = require('express');

const router = express.Router();
const { getStatus, getStats } = require('../controller/AppController');

router.get('/status', getStatus);
router.get('./stats', getStats);

module.exports = router;
