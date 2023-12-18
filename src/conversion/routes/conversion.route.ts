import { Router } from 'express';
import { convert, list, listByDate, listByStatus, getById, update, deleteConversion } from '../controllers/conversion.controller';

const router: Router = Router();

const routes = (): void => {
    router.post('/', convert);
    router.get('/', list);
    router.post('/listByDate', listByDate);
    router.post('/listByStatus', listByStatus);
    router.get('/getById/:id', getById);
    router.patch('/update/:id', update);
    router.delete('/delete/:id', deleteConversion);
}

routes();

export default router;