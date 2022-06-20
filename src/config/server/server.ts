import express, {
  Application, NextFunction
} from 'express' 

import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import apiRoutes from '../../routes/index'

//Server Config
dotenv.config({path:path.resolve(__dirname , '..' , '..' , '..','.env')})

const createSerer = (): Application => {
  //Init App
  const app = express()

  //Apply Middlewares
  app.use(cors())
  app.use(express.json())

  //Server Routes
  app.use('/api/v1', apiRoutes)

  return app
}

export default createSerer
