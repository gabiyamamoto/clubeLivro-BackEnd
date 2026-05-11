import LivroModel from '../models/LivroModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const {
            titulo,
            capa,
            autor,
            anoPublicacao,
            genero,
            genero_en,
            resumo,
            resumo_en,
            contexto,
            contexto_en,
            enredo,
            enredo_en,
            detalhesAutor,
            detalhesAutor_en,
            estiloEscrita,
            estiloEscrita_en,
            verossimilhanca,
            verossimilhanca_en,
            personagens,
            caracteristicasLiterarias,
            caracteristicasLiterarias_en,
            conclusao,
            conclusao_en,
        } = req.body;

        if (!titulo) {
            return res.status(400).json({ error: 'O campo "nome" é obrigatório!' });
        }
        if (!capa) {
            return res.status(400).json({ error: 'O campo "capa" é obrigatório!' });
        }
        if (!autor) {
            return res.status(400).json({ error: 'O campo "autor" é obrigatório!' });
        }
        if (!anoPublicacao) {
            return res.status(400).json({ error: 'O campo "anoPublicacao" é obrigatório!' });
        }
        if (!genero) {
            return res.status(400).json({ error: 'O campo "genero" é obrigatório!' });
        }
        if (!genero_en) {
            return res.status(400).json({ error: 'O campo "genero_en" é obrigatório!' });
        }
        if (!resumo) {
            return res.status(400).json({ error: 'O campo "resumo" é obrigatório!' });
        }
        if (!resumo_en) {
            return res.status(400).json({ error: 'O campo "resumo_en" é obrigatório!' });
        }
        if (!contexto) {
            return res.status(400).json({ error: 'O campo "contexto" é obrigatório!' });
        }
        if (!contexto_en) {
            return res.status(400).json({ error: 'O campo "contexto_en" é obrigatório!' });
        }
        if (!enredo) {
            return res.status(400).json({ error: 'O campo "enredo" é obrigatório!' });
        }
        if (!enredo_en) {
            return res.status(400).json({ error: 'O campo "enredo_en" é obrigatório!' });
        }
        if (!detalhesAutor) {
            return res.status(400).json({ error: 'O campo "detalhesAutor" é obrigatório!' });
        }
        if (!detalhesAutor_en) {
            return res.status(400).json({ error: 'O campo "detalhesAutor_en" é obrigatório!' });
        }
        if (!estiloEscrita) {
            return res.status(400).json({ error: 'O campo "estiloEscrita" é obrigatório!' });
        }
        if (!estiloEscrita_en) {
            return res.status(400).json({ error: 'O campo "estiloEscrita_en" é obrigatório!' });
        }
        if (!verossimilhanca) {
            return res.status(400).json({ error: 'O campo "verossimilhanca" é obrigatório!' });
        }
        if (!verossimilhanca_en) {
            return res.status(400).json({ error: 'O campo "verossimilhanca_en" é obrigatório!' });
        }
        if (!personagens) {
            return res.status(400).json({ error: 'O campo "personagens" é obrigatório!' });
        }
        if (!caracteristicasLiterarias) {
            return res
                .status(400)
                .json({ error: 'O campo "caracteristicasLiterarias" é obrigatório!' });
        }
        if (!caracteristicasLiterarias_en) {
            return res
                .status(400)
                .json({ error: 'O campo "caracteristicasLiterarias_en" é obrigatório!' });
        }
        if (!conclusao) {
            return res.status(400).json({ error: 'O campo "conclusao" é obrigatório!' });
        }
        if (!conclusao_en) {
            return res.status(400).json({ error: 'O campo "conclusao_en" é obrigatório!' });
        }

        const livro = new LivroModel(req.body);

        const data = await livro.criar();

        return res.status(201).json({ message: 'Livro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o livro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const livros = await LivroModel.buscarTodos(req.query);

        if (!livros || livros.length === 0) {
            return res.status(400).json({ message: 'Nenhum livro encontrado.' });
        }

        return res.status(200).json(livros);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar livros.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const livro = await LivroModel.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado.' });
        }

        return res.status(200).json({ data: livro });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar livro.' });
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

        const livro = await LivroModel.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado para atualizar.' });
        }

        const livroAtualizado = new LivroModel({
            ...livro,
            ...req.body,
            id: parseInt(id),
        });

        const data = await livroAtualizado.atualizar();

        return res
            .status(200)
            .json({ message: `O livro "${data.titulo}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar livro.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const livro = await LivroModel.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado para deletar.' });
        }

        await livro.deletar();

        return res.status(200).json({
            message: `O livro "${livro.titulo}" foi deletado com sucesso!`,
            deletado: livro,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar livro.' });
    }
};
