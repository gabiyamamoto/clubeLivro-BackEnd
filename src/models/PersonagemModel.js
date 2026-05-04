import prisma from '../lib/services/prismaClient.js';

export default class PersonagemModel {
    constructor({
        id = null, nome, caracteristicas, caracteristicas_en, representacao, representacao_en,
    } = {}) {
        this.id = id;
        this.nome = nome;
        this.caracteristicas = caracteristicas;
        this.caracteristicas_en = caracteristicas_en;
        this.representacao = representacao;
        this.representacao_en = representacao_en;
    }

    async criar() {
        return prisma.personagem.create({
            data: {
                nome: this.nome,
                caracteristicas: this.caracteristicas,
                caracteristicas_en: this.caracteristicas_en,
                representacao: this.representacao,
                representacao_en: this.representacao_en
            },
        });
    }

    async atualizar() {
        return prisma.personagem.update({
            where: { id: this.id },
            data: {
                nome: this.nome,
                caracteristicas: this.caracteristicas,
                caracteristicas_en: this.caracteristicas_en,
                representacao: this.representacao,
                representacao_en: this.representacao_en,
            },
        });
    }

    async deletar() {
        return prisma.personagem.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }
        if (filtros.caracteristicas) {
            where.caracteristicas = { contains: filtros.caracteristicas, mode: 'insensitive' };
        }
        if (filtros.caracteristicas_en) {
            where.caracteristicas_en = { contains: filtros.caracteristicas_en, mode: 'insensitive' };
        }
        if (filtros.representacao) {
            where.representacao = { contains: filtros.representacao, mode: 'insensitive' };
        }
        if (filtros.representacao_en) {
            where.representacao_en = { contains: filtros.representacao_en, mode: 'insensitive' };
        }


        return prisma.personagem.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.personagem.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new PersonagemModel(data);
    }
}
