import prisma from '../lib/services/prismaClient.js';

export default class TemaModel {
    constructor({ id = null, tema, tema_en } = {}) {
        this.id = id;
        this.tema = tema;
        this.tema_en = tema_en;
    }

    async criar() {
        if (!this.tema || this.tema.trim() === '') {
            throw new Error('O campo "tema" é obrigatório!');
        }

        const temaExistente = await TemaModel.buscarPorTema(this.tema);

        if (temaExistente) {
            throw new Error('Já existe um tema com esse nome cadastrado!');
        }

        return prisma.tema.create({
            data: {
                tema: this.tema,
                tema_en: this.tema_en || null,
            },
        });
    }

    async atualizar() {
        if (!this.tema || this.tema.trim() === '') {
            throw new Error('O campo "tema" é obrigatório!');
        }

        return prisma.tema.update({
            where: { id: this.id },
            data: {
                tema: this.tema,
                tema_en: this.tema_en || null,
            },
        });
    }

    async deletar() {
        return prisma.tema.delete({
            where: { id: this.id },
        });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.tema) {
            where.tema = {
                contains: filtros.tema,
                mode: 'insensitive',
            };
        }

        return prisma.tema.findMany({ where });
    }

    static async buscarPorId(id_tema) {
        const data = await prisma.tema.findUnique({
            where: { id: id_tema },
        });

        if (!data) {
            return null;
        }

        return new TemaModel(data);
    }

    static async buscarPorTema(nomeTema) {
        const data = await prisma.tema.findFirst({
            where: {
                tema: {
                    equals: nomeTema,
                    mode: 'insensitive',
                },
            },
        });

        if (!data) {
            return null;
        }

        return new TemaModel(data);
    }
}
