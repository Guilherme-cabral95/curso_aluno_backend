import { Router } from 'express';
import Foto from '../controllers/Foto';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, Foto.store);

export default router;
