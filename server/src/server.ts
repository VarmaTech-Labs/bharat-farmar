import express, { Application } from 'express';
import dotenv from "dotenv"
import log from './utils/logger.js';
import initializeSocketServer from './config/socket.config.js';
import dbConnection from './config/db.config.js';
// import dbConnection from './config/db.config.js';

const app:Application = express()
const { server} =initializeSocketServer(app)

dotenv.config()

const PORT = process.env.PORT || 3000

server.listen(PORT, async() => {
    log.section("🛠️  Server Initialization - Loading config & warming up...");
    log.success(`Server running at http://localhost:${PORT}`)
     await dbConnection()

    log.divider("END")
 
});