import jwt, { JwtPayload } from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

export const handle_auth = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const auth = req.get('Authorization');
        if(auth===undefined) throw "There is no token in the header";

        const token_bearer = auth.split(' ');
        if(token_bearer[0].toLowerCase()!=='bearer') throw "invalid token";

        var token = token_bearer[1];
        var user = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        if(user.id_user==undefined){
            throw 'Invalid token';
        }else{
            res.locals.id_user = user.id_user;
            next();
        }
    }catch(error){
        const err = error as Error;
        if(err.message){
            res.status(400).json({succes: false, error: 1, message: (error as Error).message});
        }else{
            res.status(401).json({succes: false, error: 1, message: error});
        }
    }
}