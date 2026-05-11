import prisma from '../lib/services/prismaClient.js';

export default class LivroModel {
    constructor({
        id = null,
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
    } = {}) {
        this.id = id;

        this.titulo = titulo;
        this.capa = capa;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;

        this.genero = genero;
        this.genero_en = genero_en;

        this.resumo = resumo;
        this.resumo_en = resumo_en;

        this.contexto = contexto;
        this.contexto_en = contexto_en;

        this.enredo = enredo;
        this.enredo_en = enredo_en;

        this.detalhesAutor = detalhesAutor;
        this.detalhesAutor_en = detalhesAutor_en;

        this.estiloEscrita = estiloEscrita;
        this.estiloEscrita_en = estiloEscrita_en;

        this.verossimilhanca = verossimilhanca;
        this.verossimilhanca_en = verossimilhanca_en;

        this.personagens = personagens;

        this.caracteristicasLiterarias = caracteristicasLiterarias;
        this.caracteristicasLiterarias_en = caracteristicasLiterarias_en;

        this.conclusao = conclusao;
        this.conclusao_en = conclusao_en;
    }

    async criar() {
        return prisma.livro.create({
            data: {
                titulo: this.titulo,
                capa: this.capa,
                autor: this.autor,
                anoPublicacao: this.anoPublicacao,
                genero: this.genero,
                genero_en: this.genero_en,
                resumo: this.resumo,
                resumo_en: this.resumo_en,
                contexto: this.contexto,
                contexto_en: this.contexto_en,
                enredo: this.enredo,
                enredo_en: this.enredo_en,
                detalhesAutor: this.detalhesAutor,
                detalhesAutor_en: this.detalhesAutor_en,
                estiloEscrita: this.estiloEscrita,
                estiloEscrita_en: this.estiloEscrita_en,
                verossimilhanca: this.verossimilhanca,
                verossimilhanca_en: this.verossimilhanca_en,
                personagens: this.personagens,
                caracteristicasLiterarias: this.caracteristicasLiterarias,
                caracteristicasLiterarias_en: this.caracteristicasLiterarias_en,
                conclusao: this.conclusao,
                conclusao_en: this.conclusao_en,
            },
        });
    }

    async atualizar() {
        return prisma.livro.update({
            where: { id: this.id },

            data: {
                titulo: this.titulo,
                capa: this.capa,
                autor: this.autor,
                anoPublicacao: this.anoPublicacao,
                genero: this.genero,
                genero_en: this.genero_en,
                resumo: this.resumo,
                resumo_en: this.resumo_en,
                contexto: this.contexto,
                contexto_en: this.contexto_en,
                enredo: this.enredo,
                enredo_en: this.enredo_en,
                detalhesAutor: this.detalhesAutor,
                detalhesAutor_en: this.detalhesAutor_en,
                estiloEscrita: this.estiloEscrita,
                estiloEscrita_en: this.estiloEscrita_en,
                verossimilhanca: this.verossimilhanca,
                verossimilhanca_en: this.verossimilhanca_en,
                personagens: this.personagens,
                caracteristicasLiterarias: this.caracteristicasLiterarias,
                caracteristicasLiterarias_en: this.caracteristicasLiterarias_en,
                conclusao: this.conclusao,
                conclusao_en: this.conclusao_en,
            },
        });
    }

    async deletar() {
        return prisma.livro.delete({ where: { id: this.id } });
    }

    static async buscarTodos() {
        return prisma.livro.findMany();
    }

    static async buscarPorId(id) {
        const data = await prisma.livro.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new LivroModel(data);
    }
}
