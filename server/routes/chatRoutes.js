const express = require('express');
const chatRouter = express.Router();
const chatController = require('../controllers/chatController');
const authnticateUser = require('../middlewares/auth')

chatRouter.post('/add-contact', authnticateUser, chatController.addContact);
chatRouter.get('/getChatList', authnticateUser, chatController.getChatList);
chatRouter.post('/add-message', authnticateUser, chatController.addMessage);

module.exports = chatRouter;