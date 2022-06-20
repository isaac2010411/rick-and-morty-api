'use strict'
import { NextFunction, Request, Response } from 'express';
// @desc    Get char counter
// @route   GET /api/v1/char
// @access  All users
const charCounterController = async  (req: Request, res: Response, next: NextFunction) => {

  res.status(200).json({ })
}

export default charCounterController
