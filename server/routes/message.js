const express = require('express')
const { User } = require('../models/users')
const router = express.Router()

router.get('/', async (req, res) => {
  let sentMessages = await User.findOne({
    name: req.query.author,
  }).select('sentMessages -_id')

  let messages = [...sentMessages.sentMessages]
  messages = messages.filter((m) => m.to === req.query.to)

  res.status(200).send(messages)
})

router.post('/send', async (req, res) => {
  const name = req.query.name
  const user = await User.findOne({ name: name })
  if (!user) return res.status(404).send('You cant send message')

  const messageDetails = req.body
  await User.updateOne(
    { name: messageDetails.author },
    {
      $push: {
        sentMessages: {
          to: messageDetails.to,
          message: messageDetails.message,
        },
      },
    }
  )
  await User.updateOne(
    { name: messageDetails.to },
    {
      $push: {
        receivedMessages: {
          from: messageDetails.author,
          message: messageDetails.message,
        },
      },
    }
  )

  res.send(200)
})

module.exports = router
