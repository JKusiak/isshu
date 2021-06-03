import connectDB from './config/db.js';
import dotenv  from 'dotenv';
import express from 'express';
import userRoutes from './routes/userRoute.js';

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

connectDB();

dotenv.config();

const app = express();

app.use('/api/users', userRoutes);

app.listen(PORT, console.log(`App is running in ${MODE} mode on port ${PORT}`))