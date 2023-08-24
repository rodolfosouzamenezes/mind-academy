import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.post('/signUp', UserController.signUp);

export default router;