import QuestaoModel from '../models/QuestaoModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

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
            opcaoE,
            opcaoE_en,
            respostaCorreta,
            explicacao,
            explicacao_en,
        } = req.body;

        if (!pergunta) {
            return res.status(400).json({ error: 'O campo "pergunta" é obrigatório!' });
        }
        if (!pergunta_en) {
            return res.status(400).json({ error: 'O campo "pergunta_en" é obrigatório!' });
        }
        if (!opcaoA) {
            return res.status(400).json({ error: 'O campo "opcaoA" é obrigatório!' });
        }
        if (!opcaoA_en) {
            return res.status(400).json({ error: 'O campo "opcaoA_en" é obrigatório!' });
        }
        if (!opcaoB) {
            return res.status(400).json({ error: 'O campo "opcaoB" é obrigatório!' });
        }
        if (!opcaoB_en) {
            return res.status(400).json({ error: 'O campo "opcaoB_en" é obrigatório!' });
        }
        if (!opcaoC) {
            return res.status(400).json({ error: 'O campo "opcaoC" é obrigatório!' });
        }
        if (!opcaoC_en) {
            return res.status(400).json({ error: 'O campo "opcaoC_en" é obrigatório!' });
        }
        if (!opcaoD) {
            return res.status(400).json({ error: 'O campo "opcaoD" é obrigatório!' });
        }
        if (!opcaoD_en) {
            return res.status(400).json({ error: 'O campo "opcaoD_en" é obrigatório!' });
        }
        if (!opcaoE) {
            return res.status(400).json({ error: 'O campo "opcaoE" é obrigatório!' });
        }
        if (!opcaoE_en) {
            return res.status(400).json({ error: 'O campo "opcaoE_en" é obrigatório!' });
        }
        if (!respostaCorreta) {
            return res.status(400).json({ error: 'O campo "respostaCorreta" é obrigatório!' });
        }
        if (!explicacao) {
            return res.status(400).json({ error: 'O campo "explicacao" é obrigatório!' });
        }
        if (!explicacao_en) {
            return res.status(400).json({ error: 'O campo "explicacao_en" é obrigatório!' });
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
            opcaoE,
            opcaoE_en,
            respostaCorreta,
            explicacao,
            explicacao_en,
        });
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

        if (req.body.pergunta !== undefined) {
            questao.pergunta = req.body.pergunta;
        }
        if (req.body.pergunta_en !== undefined) {
            questao.pergunta_en = req.body.pergunta_en;
        }
        if (req.body.opcaoA !== undefined) {
            questao.opcaoA = req.body.opcaoA;
        }
        if (req.body.opcaoA_en !== undefined) {
            questao.opcaoA_en = req.body.opcaoA_en;
        }
        if (req.body.opcaoB !== undefined) {
            questao.opcaoB = req.body.opcaoB;
        }
        if (req.body.opcaoB_en !== undefined) {
            questao.opcaoB_en = req.body.opcaoB_en;
        }
        if (req.body.opcaoC !== undefined) {
            questao.opcaoC = req.body.opcaoC;
        }
        if (req.body.opcaoC_en !== undefined) {
            questao.opcaoC_en = req.body.opcaoC_en;
        }
        if (req.body.opcaoD !== undefined) {
            questao.opcaoD = req.body.opcaoD;
        }
        if (req.body.opcaoD_en !== undefined) {
            questao.opcaoD_en = req.body.opcaoD_en;
        }
        if (req.body.opcaoE !== undefined) {
            questao.opcaoE = req.body.opcaoE;
        }
        if (req.body.opcaoE_en !== undefined) {
            questao.opcaoE_en = req.body.opcaoE_en;
        }
        if (req.body.respostaCorreta !== undefined) {
            questao.respostaCorreta = req.body.respostaCorreta;
        }
        if (req.body.explicacao !== undefined) {
            questao.explicacao = req.body.explicacao;
        }
        if (req.body.explicacao_en !== undefined) {
            questao.explicacao_en = req.body.explicacao_en;
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
