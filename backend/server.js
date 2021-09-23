import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { authRouter, protectedAuthRouter } from './routes/authenticationRoute.js';
import { protectedBoardRouter } from './routes/boardRoute.js';
import { protectedColumnRouter } from './routes/columnRoute.js';
import { protectedIssueRouter } from './routes/issueRoute.js';
import { protectedOrganizationRouter } from './routes/organizationRoute.js';
import { protectedProjectRouter } from './routes/projectRoute.js';
import { protectedTagRouter } from './routes/tagRoute.js';
import { protectedImageRouter } from './routes/uploadRoute.js';
import { protectedUserRouter, userRouter } from './routes/userRoute.js';


const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({path:`${__dirname} /../.env`});
const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/organization', protectedOrganizationRouter);
app.use('/users', userRouter, protectedUserRouter);
app.use('/projects', protectedProjectRouter);
app.use('/boards', protectedBoardRouter);
app.use('/columns', protectedColumnRouter);
app.use('/issues', protectedIssueRouter);
app.use('/tags', protectedTagRouter);
app.use('/login', authRouter, protectedAuthRouter);
app.use('/uploads', protectedImageRouter, express.static('uploads'));

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