import path from 'path';
import fs from 'fs';
import {Request, Response} from 'express';

export function get(req:Request, res:Response){
    try{
        const {id} = req.params;
        var route = path.join(__dirname, `../../uploads/productsImages/${id}.jpg`);
        fs.open(route, 'r', (err, df)=>{
            if(err) res.status(404).json({message: err.message});
            else{
                res.sendFile(route);
            }
        });
    }catch(error){
        res.status(500).json({message: 'Internal server Error'});
    }
}

export function save(req:Request, res:Response){
    try{
        res.status(200).json({message: "uploaded!"});       
    }catch(error){
        res.status(500).json({message: 'Internal server Error'});
    }
}