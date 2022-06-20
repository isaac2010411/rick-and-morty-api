'use strict'

import express from 'express'
import episodeLocationController from '../controllers/episode-location-controller'
const router = express.Router()

router.route('/').get(episodeLocationController)

export default router
