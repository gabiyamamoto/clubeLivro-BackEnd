import prisma from '../lib/services/prismaClient.js';

export default class QuestaoModel {
    constructor({ id = null, enunciado, enunciado_en } = {}) {
        this.id = id;
        this.enunciado = enunciado;
        this.enunciado_en = enunciado_en;
    }

    async criar() {
        return prisma.questao.create({
            data: {
                enunciado: this.enunciado,
                enunciado_en: this.enunciado_en,
            },
            include: {
                alternativas: true,
                respostas: true,
            },
        });
    }

    async atualizar() {
        return prisma.questao.update({
            where: { id: this.id },
            data: {
                enunciado: this.enunciado,
                enunciado_en: this.enunciado_en,
            },
            include: {
                alternativas: true,
                respostas: true,
            },
        });
    }

    async deletar() {
        return prisma.questao.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.enunciado) {
            where.enunciado = { contains: filtros.enunciado, mode: 'insensitive' };
        }

        return prisma.questao.findMany({
            where,
            include: {
                alternativas: true,
                respostas: true,
            },
        });
    }

    static async buscarPorId(id) {
        const data = await prisma.questao.findUnique({
            where: { id },
            include: {
                alternativas: true,
                respostas: true,
            },
        });
        if (!data) {
            return null;
        }
        return new QuestaoModel(data);
    }
}
