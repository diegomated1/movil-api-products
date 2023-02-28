
import * as Product from '../controllers/product.controller';
import { Router } from 'express';
import { handle_auth } from '../middlewares/auth.js';

const productRouter = Router();

productRouter.route('/products').post(handle_auth, Product.insert);
productRouter.route('/products').get(handle_auth, Product.getAll);
productRouter.route('/products/:id_product').get(handle_auth, Product.getOneById);

export default productRouter;