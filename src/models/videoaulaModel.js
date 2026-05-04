import prisma from '../lib/services/prismaClient.js';

export default class videoaulaModel {
    constructor({ id = null, titulo, titulo_en, descricao, descricao_en } = {}) {
        this.id = id;
        this.titulo = titulo;
        this.titulo_en = titulo_en;
        this.descricao = descricao;
        this.descricao_en = descricao_en;
    }

    async criar() {
        return prisma.videoaula.create({
            data: {
                titulo: this.titulo,
                titulo_en: this.titulo_en,
                descricao: this.descricao,
                descricao_en: this.descricao_en,
        });
    }

    async atualizar() {
        return prisma.videoaula.update({
            where: { id: this.id },
            data: { titulo: this.titulo, titulo_en: this.titulo_en, descricao: this.descricao_en },
        });
    }

    async deletar() {
        return prisma.videoaula.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }
        if (filtros.estado !== undefined) {
            where.estado = filtros.estado === 'true';
        }
        if (filtros.preco !== undefined) {
            where.preco = parseFloat(filtros.preco);
        }

        return prisma.videoaula.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.videoaula.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new videoaulaModel(data);
    }
}
