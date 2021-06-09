import connectDB from './config/db.js';
import dotenv  from 'dotenv';
import express from 'express';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import projectRoute from './routes/projectRoute.js';
import boardRoute from './routes/boardRoute.js';
import columnRoute from './routes/columnRoute.js';
import issueRoute from './routes/issueRoute.js';
import tagRoute from './routes/tagRoute.js';
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

app.use('/users', userRoute);
app.use('/projects', projectRoute);
app.use('/boards', boardRoute);
app.use('/columns', columnRoute);
app.use('/issues', issueRoute);
app.use('/tags', tagRoute);

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