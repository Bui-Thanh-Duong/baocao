import express from 'express'
import dotenv from 'dotenv/config'
import viewEngine from './viewEngine.js';  
import apiRoute from './routes/apiRoute.js';
import path from 'path'
import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()
const port=process.env.PORT

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

viewEngine(app);

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use(cors());

let redisClient = createClient();
redisClient.connect().catch(console.error); 

let redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
  });

app.use(session({
    store: redisStore,
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

const corsOptions = {
    origin: ['http://localhost:3001', 'http://localhost:1234'],
    optionsSuccessStatus: 200,
    credentials: true
  };

app.use(cors(corsOptions)); 

app.use(cookieParser());

app.use(apiRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});