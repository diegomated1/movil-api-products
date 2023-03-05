import * as Product from '../services/product.services.js';
import * as User from '../services/user.services.js';
import {Request, Response} from 'express';
import IProduct from 'interfaces/IProducts.js';
import ui from 'uniqid';
import path from 'path';

export const getOneById = async (req: Request, res: Response)=>{
    try{
        const {id_product} = req.params;
        const product = await Product.getById(id_product);
        if(product){
            const seller = await User.getById(product.id_seller);
            res.status(200).json({error: 0, product: {...product, seller}});
        }else{
            res.status(404).json({error: 2, message: 'Product not found'});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error: 1, message: 'Internal server error.'});
    }
}

export const getAll = async (req: Request, res: Response)=>{
    try{
        const products = await Product.getAll();
        res.status(200).json({error: 0, products});
    }catch(error){
        console.log(error);
        res.status(500).json({error: 1, message: 'Internal server error.'});
    }
}

export const insert = async (req: Request, res: Response)=>{
    try{
        const product = req.body as IProduct;
        if(req.file){
            var id_product = path.parse(req.file.filename).name;
        }else{
            var id_product = ui.process();
        }
        const _user = await User.getById(res.locals.id_user);
        if(_user){
            await Product.insert({...product, id_product, id_seller: _user.id_user, seller_name: _user.username});
            res.status(200).json({error: 0, message: 'Inserted'});
        }else{
            res.status(404).json({error: 0, message: 'User not found'});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error: 1, message: 'Internal server error.'});
    }
}

export const getFavorites = async (req: Request, res: Response)=>{
    try{
        var {keys} = req.query;
        keys = (keys) ? keys : '1';
        const {id_user} = res.locals;
        const products = await Product.getFavorites(id_user, (keys=='0'?1:0));
        res.status(200).json({error: 0, products});
    }catch(error){
        console.log(error);
        res.status(500).json({error: 1, message: 'Internal server error.'});
    }
}

export const addFavorite = async (req: Request, res: Response)=>{
    try{
        const {id_product} = req.params;
        const {id_user} = res.locals;
        const product = await Product.getById(id_product);
        if(product){
            await Product.addFavorite(product, id_user);
            res.status(200).json({error: 0, message: 'Product add to favorites'});
        }else{
            res.status(404).json({error: 2, message: 'Product not found'});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error: 1, message: 'Internal server error.'});
    }
}

export const deleteFavorite = async (req: Request, res: Response)=>{
    try{
        const {id_product} = req.params;
        const {id_user} = res.locals;
        const product = await Product.getById(id_product);
        if(product){
            await Product.deleteFavorite(id_product, id_user);
            res.status(200).json({error: 0, message: 'Product delete from favorites'});
        }else{
            res.status(404).json({error: 2, message: 'Product not found'});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error: 1, message: 'Internal server error.'});
    }
}
