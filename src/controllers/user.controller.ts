import * as User from '../services/user.services.js';
import {Request, Response} from 'express';
import ui from 'uniqid';
import bc from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response)=>{
    try{
        const {email, password} = req.body;
        if(email==undefined || password==undefined){
            return res.status(400).json({error: 2, message: 'Invalid credentials'});
        }
        const _user = await User.getByEmail(email);
        if(_user){
            const math = await bc.compare(password, _user.password!);
            if(math){
                const token = jwt.sign({id_user: _user.id_user}, process.env.JWT_SECRET!);
                res.status(200).json({error: 0, message: 'Logged', userToken: token});
            }else{
                res.status(401).json({error: 4, message: 'Invalid credentials'});
            }
        }else{
            res.status(404).json({error: 3, message: 'User not found'});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error: 1, message: 'Internal server error.'});
    }
}

export const register = async (req: Request, res: Response)=>{
    try{
        const {email, username, password} = req.body;
        if(email == undefined || username == undefined || password == undefined){
            return res.status(400).json({error: 2, message: 'Invalid credentials'});
        }
        const _user = await User.getByEmail(email);
        if(_user){
            return res.status(400).json({error: 1, message: 'Email already taken'});
        }
        const id_user = ui.process();
        const _password = await bc.hash(password!, 10);
        await User.insert({email, username, id_user, password: _password});
        const token = jwt.sign({id_user}, process.env.JWT_SECRET!);
        res.status(200).json({error: 0, message: 'Registered', userToken: token});
    }catch(error){
        console.log(error);
        res.status(500).json({error: 1, message: 'Internal server error.'});
    }
}

export const auth = async (req: Request, res: Response)=>{
    try{
        const user = await User.getById(res.locals.id_user);
        delete user.password;
        res.status(200).json({succes: true, error: 0, user});
    }catch(error){
        res.status(400).json({succes: false, error: 1, message: (error as Error).message});
    }
}
