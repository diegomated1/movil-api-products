import * as User from '../controllers/user.controller.js';
import { Router } from 'express';
import { handle_auth } from '../middlewares/auth.js';

const userRouter = Router();

userRouter.route('/user/auth').post(handle_auth, User.auth);
userRouter.route('/user/auth/login').post(User.login);
userRouter.route('/user/auth/register').post(User.register);

export default userRouter;