import pg from 'pg';
import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = pkg;

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Resetando banco...');

    await prisma.questao.deleteMany();
    await prisma.tema.deleteMany();
    await prisma.dica.deleteMany();
    await prisma.videoaula.deleteMany();
    await prisma.personagem.deleteMany();
    await prisma.livro.deleteMany();
    await prisma.participante.deleteMany();

    console.log('📦 Inserindo dados...');

    // 📖 LIVRO
    const livro = await prisma.livro.create({
        data: {
            titulo: 'A Moreninha',
            capa: 'https://exemplo.com/capa.jpg',
            autor: 'Joaquim Manuel de Macedo',
            anoPublicacao: 1844,

            genero: 'Romantismo',
            genero_en: 'Romanticism',

            resumo: 'História de amor entre Augusto e Carolina.',
            resumo_en: 'A love story between Augusto and Carolina.',

            contexto: 'Contexto do romantismo no Brasil.',
            contexto_en: 'Romanticism context in Brazil.',

            enredo: 'Narrativa sobre promessa de amor.',
            enredo_en: 'Story about a love promise.',

            detalhesAutor: 'Autor importante do romantismo.',
            detalhesAutor_en: 'Important romanticism author.',

            estiloEscrita: 'Linguagem simples e emocional.',
            estiloEscrita_en: 'Simple and emotional language.',

            verossimilhanca: 'Situações realistas da sociedade.',
            verossimilhanca_en: 'Realistic social situations.',

            caracteristicasLiterarias: 'Idealização do amor.',
            caracteristicasLiterarias_en: 'Idealization of love.',

            conclusao: 'Obra marcante do romantismo.',
            conclusao_en: 'Important romanticism work.',
        },
    });

    // 👥 PERSONAGENS
    await prisma.personagem.createMany({
        data: [
            {
                nome: 'Carolina',
                caracteristicas: 'Jovem romântica e misteriosa',
                caracteristicas_en: 'Romantic and mysterious young woman',

                representacao: 'Ideal feminino do romantismo',
                representacao_en: 'Romantic ideal woman',

                livroId: livro.id,
            },
            {
                nome: 'Augusto',
                caracteristicas: 'Jovem inconstante',
                caracteristicas_en: 'Inconstant young man',

                representacao: 'Juventude impulsiva',
                representacao_en: 'Impulsive youth',

                livroId: livro.id,
            },
        ],
    });

    // 🎥 VIDEOAULA
    await prisma.videoaula.create({
        data: {
            videoUrl: 'https://youtube.com/video',

            titulo: 'Explicação da obra',
            titulo_en: 'Book explanation',

            descricao: 'Resumo e análise da obra',
            descricao_en: 'Summary and analysis of the book',
        },
    });

    // 💡 DICAS
    await prisma.dica.createMany({
        data: [
            {
                dica: 'Entenda o romantismo.',
                dica_en: 'Understand romanticism.',
            },
            {
                dica: 'Analise os personagens.',
                dica_en: 'Analyze the characters.',
            },
        ],
    });

    // 📝 TEMAS
    await prisma.tema.createMany({
        data: [
            {
                tema: 'Amor idealizado',
                tema_en: 'Idealized love',
            },
            {
                tema: 'Memória e promessa',
                tema_en: 'Memory and promise',
            },
        ],
    });

    // ❓ QUESTÕES
    await prisma.questao.createMany({
        data: [
            {
                pergunta: 'Qual é uma característica do romantismo?',
                pergunta_en: 'What is a characteristic of romanticism?',

                opcaoA: 'Idealização do amor',
                opcaoA_en: 'Idealization of love',

                opcaoB: 'Objetividade extrema',
                opcaoB_en: 'Extreme objectivity',

                opcaoC: 'Linguagem científica',
                opcaoC_en: 'Scientific language',

                opcaoD: 'Foco em tecnologia',
                opcaoD_en: 'Focus on technology',

                opcaoE: 'Neutralidade emocional',
                opcaoE_en: 'Emotional neutrality',

                respostaCorreta: 'A',

                explicacao: 'O romantismo valoriza a idealização do amor.',
                explicacao_en: 'Romanticism values the idealization of love.',
            },
            {
                pergunta: 'Quem é a protagonista da obra?',
                pergunta_en: 'Who is the protagonist of the book?',

                opcaoA: 'Aurora',
                opcaoA_en: 'Aurora',

                opcaoB: 'Carolina',
                opcaoB_en: 'Carolina',

                opcaoC: 'Helena',
                opcaoC_en: 'Helena',

                opcaoD: 'Capitu',
                opcaoD_en: 'Capitu',

                opcaoE: 'Lucíola',
                opcaoE_en: 'Luciola',

                respostaCorreta: 'B',

                explicacao: 'Carolina é a protagonista feminina da obra.',
                explicacao_en: 'Carolina is the female protagonist of the book.',
            },
        ],
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
