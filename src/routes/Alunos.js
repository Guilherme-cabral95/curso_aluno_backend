import { Router } from 'express';
import AlunosController from '../controllers/Alunos';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();
router.get('/', loginRequired, AlunosController.index);
router.get('/:id', loginRequired, AlunosController.show);

router.post('/', loginRequired, AlunosController.create);
router.put('/:id', loginRequired, AlunosController.update);
router.delete('/:id', loginRequired, AlunosController.delete);

export default router;
