const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth');
const controller = require('./controller');

router.get('/barangs', auth, controller.getAllBarangs);
router.post('/barangs', auth, controller.createBarangs);
router.put('/barangs/:id', auth, controller.updateBarangs);
router.delete('/barangs/:id', auth, controller.deleteBarangs)

module.exports = router;
