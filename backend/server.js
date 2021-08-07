import connectDB from './config/db.js';
import dotenv  from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import issueRouter from './routes/issueRoute.js';
import tagRouter from './routes/tagRoute.js';
import { router, protectedRouter } from './routes/authenticationRoute.js';
import { userRouter, protectedUserRouter } from './routes/userRoute.js';
import { protectedProjectRouter } from './routes/projectRoute.js';
import { protectedBoardRouter } from './routes/boardRoute.js';
import { protectedColumnRouter } from './routes/columnRoute.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({path:`${__dirname} /../.env`});
const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV;

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/users', userRouter, protectedUserRouter);
app.use('/projects', protectedProjectRouter);
app.use('/boards', protectedBoardRouter);
app.use('/columns', protectedColumnRouter);
app.use('/issues', issueRouter);
app.use('/tags', tagRouter);
app.use('/login', router, protectedRouter);

// universal route for handling 404 response if route not existing
app.use((req, res, next) => {
      const error = new Error("This page does not exist");
      error.status = 404;
      next(error);
});

app.use((error, req, res, next) => {
      res.status(error.status || 500).send({
            error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
            },
      });
});

app.listen(PORT, () => {
      console.log(`App is running in ${MODE} mode on port ${PORT}`)
});



















