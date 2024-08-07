import { Request, Response } from 'express';
import cloudinary from 'cloudinary';
import { HotelType } from '../shared/types';
import Hotel from '../models/hotel.model';

export const hotelsController = async (req: Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;

        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString('base64');
            let dataURI = 'data:' + image.mimetype + ';base64,' + b64;
            const response = await cloudinary.v2.uploader.upload(dataURI);
            return response.url;
        });
        const imageUrls = await Promise.all(uploadPromises);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        const hotel = new Hotel(newHotel);
        await hotel.save();

        res.status(201).send(hotel);
    } catch (error) {}
};

export const getAllHotelsController = async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({ userId: req.userId });
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: ' Error fetching hotels' });
    }
};
