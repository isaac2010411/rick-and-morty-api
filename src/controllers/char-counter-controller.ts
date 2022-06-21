'use strict'
import { NextFunction, Request, Response } from 'express';
import {  getAllData, charCounter, stringNames, formatTime } from '../utils'

// @desc    Get char counter
// @route   GET /api/v1/char
// @access  All users
const charCounterController = async  (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const start = Date.now()
  
  const [locationData, characterData, episodeData] = await Promise.all([
    getAllData('/location'),
    getAllData('/character'),
    getAllData('/episode'),
  ])

  const end = Date.now()
  const time = end - start

  res.status(200).json({
  exercise_name: 'Char counter',
  time: formatTime(time),
  in_time: time < 3000,
  results: [
    {
      char: 'l',
      count: charCounter(stringNames(locationData), /[l]/gi),
      resource: 'location',
    },
    {
      char: 'e',
      count: charCounter(stringNames(episodeData), /[e]/gi),
      resource: 'episode',
    },
    {
      char: 'c',
      count: charCounter(stringNames(characterData), /[c]/gi),
      resource: 'character',
    },
  ],
})
}

export default charCounterController
