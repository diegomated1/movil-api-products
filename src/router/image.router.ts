import * as img from '../controllers/image.controller.js';
import { Router } from 'express';

var imgRouter = Router();

imgRouter.route('/images/products/:id').get(img.get);

export default imgRouter;