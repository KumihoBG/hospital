const Message = require('../models/messageModel');


const addNewMessage = asyncHandler(async (req, res) => {
    const { patient, medical, messages, date, time } = req.body;
    const message = new Message({
        patient,
        medical,
        messages,
        date,
        time
    });
    await message.save();
});

const getAllMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find();
    res.status(200).json({
        success: true,
        data: messages
    });
});

module.exports = {
    addNewMessage,
    getAllMessages
  }