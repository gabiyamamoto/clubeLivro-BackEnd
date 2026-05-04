import PersonagemModel from '../models/PersonagemModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { nome, caracteristicas, caracteristicas_en, representacao, representacao_en } =
            req.body;


        if (!nome) {
            return res.status(400).json({ error: 'O personagem deve possuir um nome!' });
        }

        if (!caracteristicas) {
            return res.status(400).json({ error: 'O personagem precisa ter características!' });
        }

        if (!caracteristicas_en) {
            return res
                .status(400)
                .json({ error: 'As características devem ser traduzidas para inglês!' });
        }

        if (!representacao) {
            return res.status(400).json({ error: 'O personagem precisa ter representações!' });
        }

        if (!representacao_en) {
            return res
                .status(400)
                .json({ error: 'As representações devem ser traduzidas para inglês!' });
        }

        const personagem = new PersonagemModel({ nome, caracteristicas, caracteristicas_en, representacao, representacao_en, });
        const data = await personagem.criar();

        return res.status(201).json({ message: 'Personagem registrado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao registrar personagem.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const personagem = await PersonagemModel.buscarTodos(req.query);
        const { lang } = req.query;

        if (!personagem || personagem.length === 0) {
            return res.status(400).json({ message: 'Nenhum registro de personagem encontrado.' });
        }

        if (lang === 'en') {
            return res.json({
            caracteristicas: personagem.caracteristicas_en,
            representacao: personagem.representacao_en,
            });
        }

        res.json({
            nome: personagem.nome,
            caracteristicas: personagem.caracteristicas,
            representacao: personagem.representacao,
        });

        return res.status(200).json(personagem);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registro de personagem.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const personagem = await PersonagemModel.buscarPorId(parseInt(id));

        if (!personagem) {
            return res.status(404).json({ error: 'Registro de personagem não encontrado.' });
        }

        return res.status(200).json({ data: personagem });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registro de personagem.' });
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

        const personagem = await PersonagemModel.buscarPorId(parseInt(id));

        if (!personagem) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.nome !== undefined) {
            personagem.nome = req.body.nome;
        }
        if (req.body.caracteristicas !== undefined) {
            personagem.caracteristicas = req.body.caracteristicas;
        }
        if (req.body.caracteristicas_en !== undefined) {
            personagem.caracteristicas_en = req.body.caracteristicas_en;
        }
        if (req.body.representacao !== undefined) {
            personagem.representacao = req.body.representacao;
        }
        if (req.body.representacao_en !== undefined) {
            personagem.representacao_en = req.body.representacao_en;
        }

        const data = await personagem.atualizar();

        return res
            .status(200)
            .json({ message: `O registro "${data.nome}" foi atualizado com sucesso!`, data });
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

        const personagem = await PersonagemModel.buscarPorId(parseInt(id));

        if (!personagem) {
            return res.status(404).json({ error: 'Registro de personagem não encontrado para deletar.' });
        }

        await personagem.deletar();

        return res
            .status(200)
            .json({
                message: `O registro "${personagem.nome}" foi deletado com sucesso!`,
                deletado: personagem,
            });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
