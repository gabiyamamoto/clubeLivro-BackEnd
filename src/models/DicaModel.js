import prisma from '../lib/services/prismaClient.js';

export default class DicaModel {
    constructor({ id = null, dica, dica_en } = {}) {
        this.id = id;
        this.dica = dica;
        this.dica_en = dica_en;
    }

    async criar() {
        return prisma.dica.create({
            data: {
                dica: this.dica,
                dica_en: this.dica_en,
            },
        });
    }

    async atualizar() {
        return prisma.dica.update({
            where: { id: this.id },
            data: {
                dica: this.dica,
                dica_en: this.dica_en,
            },
        });
    }

    async deletar() {
        return prisma.dica.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.dica) {
            where.dica = { contains: filtros.dica, mode: 'insensitive' };
        }

        return prisma.dica.findMany({
            where,
        });
    }

    static async buscarPorId(id) {
        const data = await prisma.dica.findUnique({
            where: { id },
        });
        if (!data) {
            return null;
        }
        return new DicaModel(data);
    }
}
