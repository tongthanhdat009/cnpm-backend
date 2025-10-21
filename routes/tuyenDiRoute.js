const express = require('express');
const router = express.Router();
const tuyenDiController = require('../controllers/tuyenDiController');

// GET / -> get all tuyen di
router.get('/', tuyenDiController.getAllTuyenDi);

module.exports = router;
