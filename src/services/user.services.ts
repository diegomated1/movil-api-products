import IUser from "interfaces/IUser.js";
import client from "../database/database.client.js";

export const getById = (id_user:string) : Promise<IUser> => {
    return new Promise(async(res, rej)=>{
        try{
            const query = `SELECT * FROM users_by_id WHERE id_user = ?`;
            const query_result = await client.execute(query, [id_user]);
            res(query_result.first() as unknown as IUser);
        }catch(error){
            rej(error);
        }
    });
}

export const getByEmail = (id_user:string) : Promise<IUser> => {
    return new Promise(async(res, rej)=>{
        try{
            const query = `SELECT * FROM users_by_email WHERE email = ?`;
            const query_result = await client.execute(query, [id_user]);
            res(query_result.first() as unknown as IUser);
        }catch(error){
            rej(error);
        }
    });
}

export const insert = (user:IUser) => {
    return new Promise(async(res, rej)=>{
        try{
            const params = [user.id_user, user.email, user.username, user.password];
            const queries = [
                {query: 'INSERT INTO users_by_id(id_user, email, username, password) VALUES (?,?,?,?)', params},
                {query: 'INSERT INTO users_by_email(id_user, email, username, password) VALUES (?,?,?,?)', params}
            ]
            const query_result = await client.batch(queries, {prepare: true});
            res(query_result);
        }catch(error){
            rej(error);
        }
    });
}