import IProduct from "../interfaces/IProducts.js";
import client from "../database/database.client.js";

export const insert = (product:IProduct) => {
    return new Promise(async(res, rej)=>{
        try{
            const params = [product.id_product, product.id_seller, product.seller_name, product.calification, product.name, product.description]
            const query = `INSERT INTO products_by_id(id_product, id_seller, seller_name, calification, name , description) VALUES (?,?,?,?,?,?)`;
            const query_result = await client.execute(query, params, {prepare: true});
            res(query_result);
        }catch(error){
            rej(error);
        }
    });
}

export const getById = (id_product:string) : Promise<IProduct> => {
    return new Promise(async(res, rej)=>{
        try{
            const query = `SELECT * FROM products_by_id WHERE id_product = ?`;
            const query_result = await client.execute(query, [id_product], {prepare: true});
            res(query_result.first() as unknown as IProduct);
        }catch(error){
            rej(error);
        }
    });
}

export const getAll = () : Promise<IProduct[]> => {
    return new Promise(async(res, rej)=>{
        try{
            const query = `SELECT * FROM products_by_id`;
            const query_result = await client.execute(query, [], {prepare: true});
            res(query_result.rows as unknown as IProduct[]);
        }catch(error){
            rej(error);
        }
    });
}

export const getFavorites = (id_user:string, type: number) : Promise<{id_product:string,id_user:string}[]> => {
    return new Promise(async(res, rej)=>{
        try{
            if(type==0){
                var query = `SELECT id_product, id_user FROM products_by_favorite WHERE id_user = ?`;
            }else{
                var query = `SELECT * FROM products_by_favorite WHERE id_user = ?`;
            }
            const query_result = await client.execute(query, [id_user], {prepare: true});
            res(query_result.rows as unknown as {id_product:string,id_user:string}[]);
        }catch(error){
            rej(error);
        }
    });
}

export const addFavorite = (product:IProduct, id_user:string) => {
    return new Promise(async(res, rej)=>{
        try{
            const params = [product.id_product, product.calification, product.description, product.id_seller, product.name, product.seller_name]
            const query = `INSERT INTO products_by_favorite(id_user, id_product, calification, description, id_seller, name, seller_name) VALUES (?,?,?,?,?,?,?)`;
            const query_result = await client.execute(query, [id_user, ...params], {prepare: true});
            res(query_result.rows);
        }catch(error){
            rej(error);
        }
    });
}

export const deleteFavorite = (id_product:string, id_user:string) => {
    return new Promise(async(res, rej)=>{
        try{
            const query = `DELETE FROM products_by_favorite WHERE id_product = ? AND id_user = ?`;
            const query_result = await client.execute(query, [id_product, id_user], {prepare: true});
            res(query_result.rows);
        }catch(error){
            rej(error);
        }
    });
}