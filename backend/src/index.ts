import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import connectDB from './config/db';
import userRoutes from './routes/user.routes';
import myHotelRoutes from './routes/myhotels.routes';
import hotelRoutes from './routes/thehotels.routes';
import myBookingsRoutes from './routes/mybookings.routes';
import cookieParser from 'cookie-parser';
import path from 'path';
import job from './config/cron';

job.start();
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
app.use('/api/my-hotels', myHotelRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/my-bookings', myBookingsRoutes);

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

const runServer = () => {
    app.listen(port, () => {
        connectDB();
        console.log(`Server is up and running at http://localhost:${port}`);
    });
};

runServer();
