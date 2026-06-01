import LivroModel from '../models/LivroModel.js';
import prisma from '../lib/services/prismaClient.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio.' });
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
            nota,
        } = req.body;

        if (!titulo || !capa || !autor || !anoPublicacao) {
            return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
        }

        const livro = new LivroModel({
            titulo,
            capa,
            autor,
            anoPublicacao: Number(anoPublicacao),
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
            nota,
        });

        const data = await livro.criar();

        return res.status(201).json({
            message: 'Livro criado com sucesso',
            data,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno ao criar livro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const livros = await LivroModel.buscarTodos();

        if (!livros || livros.length === 0) {
            return res.status(200).json([]);
        }

        return res.status(200).json(livros);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar livros.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const livro = await LivroModel.buscarPorId(Number(id));

        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado.' });
        }

        return res.status(200).json({ data: livro });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar livro.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        const livroExistente = await prisma.livro.findUnique({
            where: { id: Number(id) }
        });

        if (!livroExistente) {
            return res.status(404).json({ error: 'Livro não encontrado.' });
        }

        const livroAtualizado = new LivroModel({
            ...livroExistente,
            ...req.body,
            id: Number(id),
            nota: req.body.nota ?? livroExistente.nota,
            personagens: req.body.personagens ?? livroExistente.personagens,
        });

        const data = await livroAtualizado.atualizar();

        return res.status(200).json({
            message: 'Livro atualizado com sucesso',
            data,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao atualizar livro.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        const livro = await LivroModel.buscarPorId(Number(id));

        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado.' });
        }

        await livro.deletar();

        return res.status(200).json({ message: 'Livro deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao deletar livro.' });
    }
};