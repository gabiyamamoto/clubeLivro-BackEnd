import QuestaoModel from '../models/QuestaoModel.js';

export const criar = async (req, res) => {
    try {
        const {
            pergunta,
            pergunta_en,
            opcaoA,
            opcaoA_en,
            opcaoB,
            opcaoB_en,
            opcaoC,
            opcaoC_en,
            opcaoD,
            opcaoD_en,
            respostaCorreta,
            explicacao,
            explicacao_en,
        } = req.body;

        if (!pergunta || !pergunta_en || !opcaoA || !opcaoB || !opcaoC || !opcaoD) {
            return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
        }

        const questao = new QuestaoModel({
            pergunta,
            pergunta_en,
            opcaoA,
            opcaoA_en,
            opcaoB,
            opcaoB_en,
            opcaoC,
            opcaoC_en,
            opcaoD,
            opcaoD_en,
            respostaCorreta,
            explicacao,
            explicacao_en,
        });

        const data = await questao.criar();

        return res.status(201).json({
            message: 'Questão criada com sucesso!',
            data,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno ao salvar questão.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const questoes = await QuestaoModel.buscarTodos(req.query);
        return res.status(200).json(questoes);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar questões.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const questao = await QuestaoModel.buscarPorId(Number(id));

        if (!questao) {
            return res.status(404).json({ error: 'Questão não encontrada.' });
        }

        return res.status(200).json({ data: questao });

    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar questão.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        const questao = await QuestaoModel.buscarPorId(Number(id));

        if (!questao) {
            return res.status(404).json({ error: 'Não encontrada.' });
        }

        Object.assign(questao, req.body);

        const data = await questao.atualizar();

        return res.status(200).json({
            message: 'Atualizado com sucesso',
            data,
        });

    } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        const questao = await QuestaoModel.buscarPorId(Number(id));

        if (!questao) {
            return res.status(404).json({ error: 'Não encontrada.' });
        }

        await questao.deletar();

        return res.status(200).json({ message: 'Deletado com sucesso' });

    } catch (error) {
        return res.status(500).json({ error: 'Erro ao deletar.' });
    }
};