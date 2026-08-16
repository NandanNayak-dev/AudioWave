const express = require('express');
const router = express.Router();
const syncController = require('../controllers/syncController');

router.get('/pull/:userId', syncController.pullLibrary);
router.post('/push', syncController.pushLibrary);

module.exports = router;
