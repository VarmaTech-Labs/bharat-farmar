import express, { Application,NextFunction,Request,Response } from 'express';
import dotenv from "dotenv"
import log from './utils/logger.js';
import initializeSocketServer from './config/socket.config.js';
import dbConnection from './config/db.config.js';
import configureSecurity from './security/security.js';
import path from 'path';
import configureRoutes from './routes/index.js';

const app:Application = express()
const { server} =initializeSocketServer(app)
configureSecurity(app)
app.use(express.json())
dotenv.config()
app.use(express.urlencoded({ extended: true }))
app.use("/uploads",express.static(path.resolve('uploads')))
configureRoutes(app)

app.get("/",(_req,res)=>{
 res.send("hello world")
})

app.use((err: any, _req: Request, res: Response, _next:NextFunction): any => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.log(err)
    return res.status(statusCode).json({ message });
});


const PORT = process.env.PORT || 3000

server.listen(PORT, async() => {
    log.section("🛠️  Server Initialization - Loading config & warming up...");
    log.success(`Server running at http://localhost:${PORT}`)
    await dbConnection()
 
});






