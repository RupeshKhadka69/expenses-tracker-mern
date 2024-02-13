import jwt from 'jsonwebtoken';
import { Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const makeToken = (res: Response, userId: IUser["_id"], setCookie: boolean = false) => {
    const token = jwt.sign({ userId }, process.env.JWT as string, { expiresIn: '30d' });

    if (setCookie) {
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
    } 
    return token;
};

export default makeToken;
