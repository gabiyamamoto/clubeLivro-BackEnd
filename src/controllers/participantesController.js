import participantesModel from '../models/participantesModel.js';

export const buscarTodos = async (req, res) => {
    try {
        const registros = await participantesModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(200).json({ message: 'Nenhum registro encontrado.' });
        }

        res.json(registros);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao buscar registros.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const participante = await participantesModel.buscarPorId(parseInt(id));

        if (!participante) {
            return res.status(404).json({ error: 'Registro do participante não encontrado.' });
        }

        res.json({ data: participante });
    } catch (error) {
        console.error('Erro ao buscar participante:', error);
        res.status(500).json({ error: 'Erro ao buscar registro do participante.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const idNum = Number(req.params.id);

        if (!Number.isInteger(idNum)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Corpo da requisição vazio.' });
        }

        const participante = await participantesModel.buscarPorId(idNum);

        if (!participante) {
            return res.status(404).json({ error: 'Participante não encontrado.' });
        }

        const dadosParaAtualizar = {};
        if (req.body.nome !== undefined) dadosParaAtualizar.nome = req.body.nome;
        if (req.body.curso !== undefined) dadosParaAtualizar.curso = req.body.curso;
        if (req.body.fotoUrl !== undefined) dadosParaAtualizar.fotoUrl = req.body.fotoUrl;

        const data = await participantesModel.atualizar(idNum, dadosParaAtualizar);

        res.json({ message: `Participante "${data.nome}" atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        res.status(500).json({ error: 'Erro interno ao atualizar o participante.' });
    }
};
