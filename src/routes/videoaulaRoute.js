import express from 'express';
import * as controller from '../controllers/videoaulaController.js';

const router = express.Router();

router.get('/', controller.buscarTodos);
router.get('/:id', controller.buscarPorId);

export default router;
