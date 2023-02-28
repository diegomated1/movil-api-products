
import * as Product from '../controllers/product.controller';
import { Router } from 'express';
import { handle_auth } from '../middlewares/auth.js';

const productRouter = Router();

productRouter.route('/products').post(handle_auth, Product.insert);
productRouter.route('/products').get(handle_auth, Product.getAll);
productRouter.route('/products/favorite').get(handle_auth, Product.getFavorites);
productRouter.route('/products/:id_product').get(handle_auth, Product.getOneById);
productRouter.route('/products/favorite/:id_product').post(handle_auth, Product.addFavorite);
productRouter.route('/products/favorite/:id_product/').delete(handle_auth, Product.deleteFavorite);

export default productRouter;