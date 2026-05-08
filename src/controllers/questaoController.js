import QuestaoModel from '../models/QuestaoModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { enunciado, enunciado_en } = req.body;

        if (!enunciado) {
            return res.status(400).json({ error: 'O campo "enunciado" é obrigatório!' });
        }
        if (!enunciado_en) {
            return res.status(400).json({ error: 'O campo "enunciado_en" é obrigatório!' });
        }

        const questao = new QuestaoModel({ enunciado, enunciado_en });
        const data = await questao.criar();

        return res.status(201).json({ message: 'Questão criada com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar a questão.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const questoes = await QuestaoModel.buscarTodos(req.query);

        if (!questoes || questoes.length === 0) {
            return res.status(400).json({ message: 'Nenhuma questão encontrada.' });
        }

        return res.status(200).json(questoes);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar questões.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const questao = await QuestaoModel.buscarPorId(parseInt(id));

        if (!questao) {
            return res.status(404).json({ error: 'Questão não encontrada.' });
        }

        return res.status(200).json({ data: questao });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar questão.' });
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

        const questao = await QuestaoModel.buscarPorId(parseInt(id));

        if (!questao) {
            return res.status(404).json({ error: 'Questão não encontrada para atualizar.' });
        }

        if (req.body.enunciado !== undefined) {
            questao.enunciado = req.body.enunciado;
        }
        if (req.body.enunciado_en !== undefined) {
            questao.enunciado_en = req.body.enunciado_en;
        }

        const data = await questao.atualizar();

        return res.status(200).json({ message: `A questão foi atualizada com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar questão.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const questao = await QuestaoModel.buscarPorId(parseInt(id));

        if (!questao) {
            return res.status(404).json({ error: 'Questão não encontrada para deletar.' });
        }

        await questao.deletar();

        return res
            .status(200)
            .json({ message: `A questão foi deletada com sucesso!`, deletado: questao });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar questão.' });
    }
};
