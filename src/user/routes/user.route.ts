import { Router } from 'express';
import { list, insert, listByStatus, getById, update, deleteUser } from '../controllers/user.controller';

const router: Router = Router();

const routes = (): void => {
    router.post('/', insert);
    router.get('/', list);
    router.post('/listByStatus', listByStatus);
    router.get('/getById/:id', getById);
    router.patch('/update/:id', update);
    router.delete('/delete/:id', deleteUser);
}

routes();

export default router;