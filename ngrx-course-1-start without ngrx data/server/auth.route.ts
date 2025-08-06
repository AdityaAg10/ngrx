

import {Request, Response} from 'express';
import {authenticate} from "./db-data";




export function loginUser(req: Request, res: Response) {

    console.log("User login attempt from the auth route backend ...");

    const {email, password} = req.body;

    const user = authenticate(email, password);

    if (user) {
        res.status(200).json({id:user.id, email: user.email});
        console.log("user login is a success");
    }
    else {
        res.sendStatus(403);
        console.log("user login failed");

    }

}


