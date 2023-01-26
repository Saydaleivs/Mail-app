const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  receivedMessages: [
    {
      from: { type: String, required: true },
      message: { type: String, required: true },
    },
  ],
  sentMessages: [
    {
      to: { type: String, required: true },
      message: { type: String, required: true },
    },
  ],
})

const User = mongoose.model('names', userSchema)
exports.User = User
