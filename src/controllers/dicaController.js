import DicaModel from '../models/DicaModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { dica, dica_en } = req.body;

        if (!dica) {
            return res.status(400).json({ error: 'O campo "dica" é obrigatório!' });
        }
        if (!dica_en) {
            return res.status(400).json({ error: 'O campo "dica_en" é obrigatório!' });
        }

        const dicaObj = new DicaModel({ dica, dica_en });
        const data = await dicaObj.criar();

        return res.status(201).json({ message: 'Dica criada com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar a dica.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const dicas = await DicaModel.buscarTodos(req.query);

        if (!dicas || dicas.length === 0) {
            return res.status(400).json({ message: 'Nenhuma dica encontrada.' });
        }

        return res.status(200).json(dicas);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar dicas.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const dica = await DicaModel.buscarPorId(parseInt(id));

        if (!dica) {
            return res.status(404).json({ error: 'Dica não encontrada.' });
        }

        return res.status(200).json({ data: dica });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar dica.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const dica = await DicaModel.buscarPorId(parseInt(id));

        if (!dica) {
            return res.status(404).json({ error: 'Dica não encontrada para atualizar.' });
        }

        if (req.body.dica !== undefined) {
            dica.dica = req.body.dica;
        }
        if (req.body.dica_en !== undefined) {
            dica.dica_en = req.body.dica_en;
        }

        const data = await dica.atualizar();

        return res.status(200).json({ message: `A dica foi atualizada com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar dica.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const dica = await DicaModel.buscarPorId(parseInt(id));

        if (!dica) {
            return res.status(404).json({ error: 'Dica não encontrada para deletar.' });
        }

        await dica.deletar();

        return res.status(200).json({ message: `A dica foi deletada com sucesso!`, deletado: dica });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar dica.' });
    }
};
