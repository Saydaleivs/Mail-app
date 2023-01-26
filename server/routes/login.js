const express = require('express')
const { User } = require('../models/users')
const router = express.Router()

router.get('/', async (req, res) => {
  const name = req.query.name
  const user = await User.findOne({ name: name })
  if (!user) {
    const newUser = await User({
      name,
    })
    await newUser.save()
    res.status(201).send({ name })
  } else {
    res.status(200).send({ name })
  }
})

module.exports = router
