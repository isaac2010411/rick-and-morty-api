'use strict'

import { NextFunction, Request, Response } from 'express';
import { CharacterResult, EpisodeResult } from '../interfaces/commonApi';
import {  getAllData,populateEpisodesAndCharacters, formatTime } from '../utils'

// @desc    Get char counter
// @route   GET /api/v1/episode
// @access  All users
const episodeLocationController = async  (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now()

  const [characterData, episodeData] = await Promise.all([getAllData('/character'), getAllData('/episode')])

  const episodeResults: EpisodeResult[] = episodeData.flatMap((item:any) => item.results )
  const characterResults: CharacterResult[] = characterData.flatMap((item:any) => item.results)

  const responseResult = populateEpisodesAndCharacters(episodeResults, characterResults)

  const end = Date.now()
  const time = end - start

  res.status(200).json({
    exercise_name: 'Episode locations',
    time: formatTime(time),
    in_time: time < 3000,
    results: responseResult,
  })
}

export default episodeLocationController
