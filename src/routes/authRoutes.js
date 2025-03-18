import express from 'express';
import { signUp, login, validateSignUp, validateLogin } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', validateSignUp, signUp);
authRouter.post('/login', validateLogin, login);

export default authRouter;
