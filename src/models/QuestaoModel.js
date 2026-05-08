import prisma from '../lib/services/prismaClient.js';

export default class QuestaoModel {
    constructor({
        id = null,
        pergunta,
        pergunta_en,
        opcaoA,
        opcaoA_en,
        opcaoB,
        opcaoB_en,
        opcaoC,
        opcaoC_en,
        opcaoD,
        opcaoD_en,
        opcaoE,
        opcaoE_en,
        respostaCorreta,
        explicacao,
        explicacao_en,
    } = {}) {
        this.id = id;
        this.pergunta = pergunta;
        this.pergunta_en = pergunta_en;
        this.opcaoA = opcaoA;
        this.opcaoA_en = opcaoA_en;
        this.opcaoB = opcaoB;
        this.opcaoB_en = opcaoB_en;
        this.opcaoC = opcaoC;
        this.opcaoC_en = opcaoC_en;
        this.opcaoD = opcaoD;
        this.opcaoD_en = opcaoD_en;
        this.opcaoE = opcaoE;
        this.opcaoE_en = opcaoE_en;
        this.respostaCorreta = respostaCorreta;
        this.explicacao = explicacao;
        this.explicacao_en = explicacao_en;
    }

    async criar() {
        return prisma.questao.create({
            data: {
                pergunta: this.pergunta,
                pergunta_en: this.pergunta_en,
                opcaoA: this.opcaoA,
                opcaoA_en: this.opcaoA_en,
                opcaoB: this.opcaoB,
                opcaoB_en: this.opcaoB_en,
                opcaoC: this.opcaoC,
                opcaoC_en: this.opcaoC_en,
                opcaoD: this.opcaoD,
                opcaoD_en: this.opcaoD_en,
                opcaoE: this.opcaoE,
                opcaoE_en: this.opcaoE_en,
                respostaCorreta: this.respostaCorreta,
                explicacao: this.explicacao,
                explicacao_en: this.explicacao_en,
            },
        });
    }

    async atualizar() {
        return prisma.questao.update({
            where: { id: this.id },
            data: {
                pergunta: this.pergunta,
                pergunta_en: this.pergunta_en,
                opcaoA: this.opcaoA,
                opcaoA_en: this.opcaoA_en,
                opcaoB: this.opcaoB,
                opcaoB_en: this.opcaoB_en,
                opcaoC: this.opcaoC,
                opcaoC_en: this.opcaoC_en,
                opcaoD: this.opcaoD,
                opcaoD_en: this.opcaoD_en,
                opcaoE: this.opcaoE,
                opcaoE_en: this.opcaoE_en,
                respostaCorreta: this.respostaCorreta,
                explicacao: this.explicacao,
                explicacao_en: this.explicacao_en,
            },
        });
    }

    async deletar() {
        return prisma.questao.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.pergunta) {
            where.pergunta = { contains: filtros.pergunta, mode: 'insensitive' };
        }

        return prisma.questao.findMany({
            where,
        });
    }

    static async buscarPorId(id) {
        const data = await prisma.questao.findUnique({
            where: { id },
        });
        if (!data) {
            return null;
        }
        return new QuestaoModel(data);
    }
}
