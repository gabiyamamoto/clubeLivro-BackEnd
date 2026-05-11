import prisma from '../lib/services/prismaClient.js';

export default class ParticipanteModel {
    constructor({ id = null, nome, curso, fotoUrl } = {}) {
        this.id = id;
        this.nome = nome;
        this.curso = curso;
        this.fotoUrl = fotoUrl;
    }

    async atualizar() {
        return prisma.participante.update({
            where: { id: this.id },
            data: { nome: this.nome, curso: this.curso, fotoUrl: this.fotoUrl },
        });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) where.nome = { contains: filtros.nome, mode: 'insensitive' };
        if (filtros.curso) where.curso = { contains: filtros.curso, mode: 'insensitive' };

        return prisma.participante.findMany({ where, orderBy: { id: 'asc' } });
    }

    static async buscarPorId(id) {
        const data = await prisma.participante.findUnique({ where: { id } });

        if (!data) return null;

        return new participantesModel(data);
    }
}
