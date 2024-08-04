import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import connectDB from './config/db';
import userRoutes from './routes/user.routes';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
);
app.use(morgan('tiny'));

const port = 7000;

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use('/api/users', userRoutes);

const runServer = () => {
    app.listen(port, () => {
        connectDB();
        console.log(`Server is up and running at http://localhost:${port}`);
    });
};

runServer();
