'use strict'

import express from 'express'
const router = express.Router()

const charRoutes = require('./charRoutes')

router.use('/char', charRoutes)

export default  router
