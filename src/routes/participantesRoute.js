import express from 'express';
import * as controller from '../controllers/personagemController.js';
const router = express.Router();

router.get('/', controller.buscarTodos);
router.get('/:id', controller.buscarPorId);
router.put('/:id', controller.atualizar);

export default router;
