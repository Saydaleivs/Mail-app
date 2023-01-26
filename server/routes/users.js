const express = require('express')
const { User } = require('../models/users')
const router = express.Router()

router.get('/', async (req, res) => {
  const name = req.query.name
  const user = await User.findOne({ name: name })
  if (!user) return res.status(404).send('You cant get users list')

  const users = await User.find().select('name -_id')
  const messages = await User.findOne({ name: name }).select(
    'receivedMessages -_id'
  )

  res.status(200).send({ users, messages })
})

module.exports = router
