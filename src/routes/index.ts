'use strict'

import express from 'express'
const router = express.Router()

import charRoutes from './charRoutes'
import episodeRoutes from './episodeRoutes'

router.use('/char', charRoutes)
router.use('/episode', episodeRoutes)

export default  router
