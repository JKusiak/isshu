import connectDB from './config/db.js';
import dotenv  from 'dotenv';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoute.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({path:`${__dirname} /../.env`});
connectDB();

const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
      console.log(`App is running in ${MODE} mode on port ${PORT}`)
});