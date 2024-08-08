const express = require('express');
const AuthController = require('../controllers/AuthController.js');
const { getStatus, getStats } = require('../controllers/AppController.js');
const { postNew, getMe } = require('../controllers/UsersController.js'); 
const { postUpload,
	getShow,
	getIndex,
	putPublish,
	putUnpublish,
	getFile
} = require('../controllers/FilesController');

const router = express.Router();
router.get('/status', getStatus);
router.get('/stats', getStats);
router.post('/users', postNew);

router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', getMe);

router.post('/files', postUpload);
router.get('/files/:id', getShow);
router.get('/files', getIndex);

router.put('/files/:id/publish', putPublish);
router.put('/files/:id/publish', putUnpublish);
router.get('/files/:id/data', getFile);

module.exports = router;
