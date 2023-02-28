import * as Product from '../services/product.services.js';
import * as User from '../services/user.services.js';
import {Request, Response} from 'express';
import IProduct from 'interfaces/IProducts.js';
import ui from 'uniqid';

export const getOneById = async (req: Request, res: Response)=>{
    try{
        const {id_product} = req.params;
        const product = await Product.getById(id_product);
        if(product){
            const seller = await User.getById(product.id_seller);
            delete seller.password;
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
        const id_product = ui.process();
        res.status(200).json({error: 0, message: 'Inserted'});
    }catch(error){
        console.log(error);
        res.status(500).json({error: 1, message: 'Internal server error.'});
    }
}