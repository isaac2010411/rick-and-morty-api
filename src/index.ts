'use strict'

import app from './config/server/server'

//Set Port
const PORT = process.env.PORT || 5001

let server = app()

//  Start Server
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
