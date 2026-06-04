import express from 'express';
import {
    buscarTodosIntegrados,
    buscarLivroPorId
} from '../controllers/integracaoController.js';

const router = express.Router();

router.get("/", buscarTodosIntegrados);
router.get(
    "/:origem/:id",
    buscarLivroPorId
);

export default router;