import prisma from '../lib/services/prismaClient.js';

export default class TemaModel {
    constructor({ id_tema = null, tema } = {}) {
        this.id_tema = id_tema;
        this.tema = tema;
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
            },
        });
    }

    async atualizar() {
        if (!this.tema || this.tema.trim() === '') {
            throw new Error('O campo "tema" é obrigatório!');
        }

        return prisma.tema.update({
            where: { id_tema: this.id_tema },
            data: {
                tema: this.tema,
            },
        });
    }

    async deletar() {
        return prisma.tema.delete({
            where: { id_tema: this.id_tema },
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
            where: { id_tema },
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
