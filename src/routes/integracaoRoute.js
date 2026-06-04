import express from 'express';
import {
    buscarTodosIntegrados,
    buscarLivroIntegradoPorId
} from '../controllers/integracaoController.js';

const router = express.Router();

router.get("/integracoes", buscarTodosIntegrados);

router.get(
    "/integracoes/:origem/:id",
    buscarLivroPorId
);

export default router;