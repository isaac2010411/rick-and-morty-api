'use strict'

import express from 'express'
const router = express.Router()

import charCounterController from '../controllers/char-counter-controller'

router.route('/').get(charCounterController)

module.exports = router
