import { Request , Response } from 'express';
import AsyncHandler from 'express-async-handler'; 
import axios from 'axios'; 
import User from '../model/userModel';

const registerUser = async(req: Request , res: Response) => {
    const user = req.body;
    console.log("REEEEEGEEEEST");
    
    const isUserAlreadyExist = await User.findOne({ email: user.email });

    if (isUserAlreadyExist) {
        return res.status(400).json({
            msg: "User Already Exists"
        });
    }

    const createdUser = await User.create({
         id: user.user_id,
        tenant: user.tenant,
        username: user.username,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        phoneNumberVerified: user.phoneNumberVerified,
        user_metadata: user.user_metadata,
        app_metadata: user.app_metadata
    });

    const netoolkitUser = await createdUser.save(); 

    if (netoolkitUser) {
        return res.status(201).json({
            id: user.user_id,
            tenant: user.tenant,
            username: user.username,
            email: user.email,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            phoneNumberVerified: user.phoneNumberVerified,
            user_metadata: user.user_metadata,
            app_metadata: user.app_metadata
        });
    } else {
        return res.status(400).json({
            status: "error", 
            msg: "Cannot register user"
        });
    }
};


export {
    registerUser
}