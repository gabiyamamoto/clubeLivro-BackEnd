import TemaModel from '../models/TemaModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados!',
            });
        }

        const { tema } = req.body;

        const novoTema = new TemaModel({ tema });

        const data = await novoTema.criar();

        return res.status(201).json({
            message: 'Tema criado com sucesso!',
            data,
        });
    } catch (error) {
        console.error('Erro ao criar tema:', error);

        return res.status(400).json({
            error: error.message,
        });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await TemaModel.buscarTodos();

        return res.status(200).json({
            data: registros,
        });
    } catch (error) {
        console.error('Erro ao buscar temas:', error);

        return res.status(500).json({
            error: error.message,
        });
    }
};

// Buscar por ID
export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({
                error: 'ID inválido.',
            });
        }

        const tema = await TemaModel.buscarPorId(parseInt(id));

        if (!tema) {
            return res.status(404).json({
                error: 'Tema não encontrado.',
            });
        }

        return res.status(200).json({
            data: tema,
        });
    } catch (error) {
        console.error('Erro ao buscar tema:', error);

        return res.status(500).json({
            error: 'Erro ao buscar tema.',
        });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({
                error: 'ID inválido.',
            });
        }

        const temaExistente = await TemaModel.buscarPorId(parseInt(id));

        if (!temaExistente) {
            return res.status(404).json({
                error: 'Tema não encontrado.',
            });
        }

        if (req.body.tema !== undefined) {
            temaExistente.tema = req.body.tema;
        }

        const data = await temaExistente.atualizar();

        return res.status(200).json({
            message: `O tema "${data.tema}" foi atualizado com sucesso!`,
            data,
        });
    } catch (error) {
        console.error('Erro ao atualizar tema:', error);

        return res.status(400).json({
            error: error.message,
        });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({
                error: 'ID inválido.',
            });
        }

        const tema = await TemaModel.buscarPorId(parseInt(id));

        if (!tema) {
            return res.status(404).json({
                error: 'Tema não encontrado.',
            });
        }

        await tema.deletar();

        return res.status(200).json({
            message: `O tema "${tema.tema}" foi deletado com sucesso!`,
            deletado: tema,
        });
    } catch (error) {
        console.error('Erro ao deletar tema:', error);

        return res.status(500).json({
            error: 'Erro ao deletar tema.',
        });
    }
};
