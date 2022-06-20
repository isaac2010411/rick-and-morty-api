'use strict'

import express from 'express'
import charCounterController from '../controllers/char-counter-controller'
const router = express.Router()

router.route('/').get(charCounterController)

export default router
