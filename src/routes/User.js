import { Router } from 'express';
import UserRouter from '../controllers/User';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();
// router.get('/', loginRequired, UserRouter.index);
// router.get('/:id', UserRouter.show);

router.post('/', UserRouter.create);
router.put('/', loginRequired, UserRouter.update);
router.delete('/', loginRequired, UserRouter.delete);

export default router;
