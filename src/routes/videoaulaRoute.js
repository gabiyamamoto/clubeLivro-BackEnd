import express from 'express';
import * as controller from '../controllers/videoaulaController.js';

const router = express.Router();

router.get('/', controller.buscarTodos);
router.get('/:id', controller.buscarPorId);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

export default router;
