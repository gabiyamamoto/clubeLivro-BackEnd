import VideoaulaModel from '../models/VideoaulaModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { videoUrl, titulo, titulo_en, descricao, descricao_en } = req.body;

        if (!videoUrl) {
            return res.status(400).json({ error: 'O campo "videoUrl" é obrigatório!' });
        }
        if (titulo === undefined || titulo === null) {
            return res.status(400).json({ error: 'O campo "titulo" é obrigatório!' });
        }
        if (titulo_en === undefined || titulo_en === null) {
            return res.status(400).json({ error: 'O campo "titulo_en" é obrigatório!' });
        }

        const videoaula = new VideoaulaModel({
            videoUrl,
            titulo,
            titulo_en,
            descricao,
            descricao_en,
        });
        const data = await videoaula.criar();

        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await VideoaulaModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(400).json({ message: 'Nenhum registro encontrado.' });
        }

        return res.status(200).json(registros);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registros.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const videoaula = await VideoaulaModel.buscarPorId(parseInt(id));

        if (!videoaula) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: videoaula });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registro.' });
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

        const videoaula = await VideoaulaModel.buscarPorId(parseInt(id));

        if (!videoaula) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.videoUrl !== undefined) {
            videoaula.videoUrl = req.body.videoUrl;
        }
        if (req.body.titulo !== undefined) {
            videoaula.titulo = req.body.titulo;
        }
        if (req.body.titulo_en !== undefined) {
            videoaula.titulo_en = req.body.titulo_en;
        }
        if (req.body.descricao !== undefined) {
            videoaula.descricao = req.body.descricao;
        }
        if (req.body.descricao_en !== undefined) {
            videoaula.descricao_en = req.body.descricao_en;
        }

        const data = await videoaula.atualizar();

        return res
            .status(200)
            .json({ message: `O registro "${data.titulo}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const videoaula = await VideoaulaModel.buscarPorId(parseInt(id));

        if (!videoaula) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await videoaula.deletar();

        return res.status(200).json({
            message: `O registro "${videoaula.titulo}" foi deletado com sucesso!`,
            deletado: videoaula,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
}
