const router = require('express').Router();
const { getAllMessages, addNewMessage } = require('../controllers/messageController');

router.get('/chat/:userId', getAllMessages);
router.post('/chat/:userId', addNewMessage);

module.exports = router;