import express from 'express';
import dotenv from 'dotenv/config';
import viewEngine from './configs/viewEngine';
import initWebRoute from './router/WebRouter';
import initAPIRoute from './router/apiRouter';
import path from 'path';
import RedisStore from 'connect-redis';
import session from 'express-session';
import { createClient } from 'redis';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
viewEngine(app);
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

let redisClient = createClient();
redisClient.connect().catch(err => console.error('Error connecting to Redis:', err));

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:"
});

app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: "keyboard cat",
  })
);

const corsOptions = {
  origin: ['http://localhost:3001', 'http://localhost:1234'],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());

initWebRoute(app);
initAPIRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
