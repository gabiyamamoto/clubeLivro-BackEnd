import prisma from '../lib/services/prismaClient.js';

export default class VideoaulaModel {
    constructor({ id = null, videoUrl, titulo, titulo_en, descricao, descricao_en } = {}) {
        this.id = id;
        this.videoUrl = videoUrl;
        this.titulo = titulo;
        this.titulo_en = titulo_en;
        this.descricao = descricao;
        this.descricao_en = descricao_en;
    }

    async criar() {
        return prisma.videoaula.create({
            data: {
                videoUrl: this.videoUrl,
                titulo: this.titulo,
                titulo_en: this.titulo_en,
                descricao: this.descricao,
                descricao_en: this.descricao_en,
            },
        });
    }

    async atualizar() {
        return prisma.videoaula.update({
            where: { id: this.id },
            data: {
                videoUrl: this.videoUrl,
                titulo: this.titulo,
                titulo_en: this.titulo_en,
                descricao: this.descricao,
                descricao_en: this.descricao_en,
            },
        });
    }

    async deletar() {
        return prisma.videoaula.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.titulo) {
            where.titulo = { contains: filtros.titulo, mode: 'insensitive' };
        }
        if (filtros.titulo_en) {
            where.titulo_en = { contains: filtros.titulo_en, mode: 'insensitive' };
        }
        if (filtros.videoUrl) {
            where.videoUrl = { contains: filtros.videoUrl, mode: 'insensitive' };
        }

        return prisma.videoaula.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.videoaula.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new VideoaulaModel(data);
    }
}
