import pg from 'pg';
import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

if (process.env.NODE_ENV === 'production' && process.env.ALLOW_SEED !== 'true') {
    console.log('🚫 Seed bloqueado em produção');
    process.exit(1);
}

const { PrismaClient } = pkg;

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('📦 Inserindo dados...');

    // 👥 PARTICIPANTES
    await prisma.participante.createMany({
        data: [
            {
                nome: 'Gabriela Yamamoto',
                curso: 'Desenvolvimento de Sistemas',
                fotoUrl: 'https://exemplo.com/gabi.jpg',
            },
            {
                nome: 'Ana Clara',
                curso: 'Desenvolvimento de Sistemas',
                fotoUrl: 'https://exemplo.com/ana.jpg',
            },
        ],
    });

    // 📖 LIVRO
    await prisma.livro.create({
        data: {
            titulo: 'A Moreninha',

            capa: 'https://exemplo.com/capa.jpg',

            autor: 'Joaquim Manuel de Macedo',

            anoPublicacao: 1844,

            genero: 'Romantismo',
            genero_en: 'Romanticism',

            resumo: 'História de amor entre Augusto e Carolina.',
            resumo_en: 'Love story between Augusto and Carolina.',

            contexto: 'Obra produzida durante o romantismo brasileiro.',
            contexto_en: 'Book produced during Brazilian romanticism.',

            enredo: 'Augusto aposta que não conseguirá amar ninguém por muito tempo.',
            enredo_en: 'Augusto bets he cannot love anyone for too long.',

            detalhesAutor: 'Joaquim Manuel de Macedo foi um importante autor romântico.',
            detalhesAutor_en: 'Joaquim Manuel de Macedo was an important romantic author.',

            estiloEscrita: 'Linguagem simples, sentimental e romântica.',
            estiloEscrita_en: 'Simple, sentimental and romantic language.',

            verossimilhanca: 'A obra apresenta costumes reais da sociedade da época.',
            verossimilhanca_en: 'The book shows real customs of society at that time.',

            personagens: 'Carolina, Augusto',

            caracteristicasLiterarias: 'Idealização amorosa e sentimentalismo.',
            caracteristicasLiterarias_en: 'Love idealization and sentimentalism.',

            conclusao: 'A obra é considerada um marco do romantismo brasileiro.',
            conclusao_en: 'The book is considered a landmark of Brazilian romanticism.',
        },
    });

    // 👤 PERSONAGENS
    await prisma.personagem.createMany({
        data: [
            {
                nome: 'Carolina',

                caracteristicas: 'Jovem inteligente, misteriosa e romântica.',
                caracteristicas_en: 'Intelligent, mysterious and romantic young woman.',

                representacao: 'Representa o ideal feminino romântico.',
                representacao_en: 'Represents the romantic female ideal.',
            },
            {
                nome: 'Augusto',

                caracteristicas: 'Jovem impulsivo e inconstante.',
                caracteristicas_en: 'Impulsive and inconsistent young man.',

                representacao: 'Representa a juventude da elite da época.',
                representacao_en: 'Represents the youth of the elite at that time.',
            },
        ],
    });

    // 🎥 VIDEOAULA
    await prisma.videoaula.create({
        data: {
            videoUrl: 'https://youtube.com/video',

            titulo: 'Análise da obra A Moreninha',
            titulo_en: 'Analysis of the book A Moreninha',

            descricao: 'Explicação sobre enredo, personagens e contexto.',
            descricao_en: 'Explanation about plot, characters and context.',
        },
    });

    // 💡 DICAS
    await prisma.dica.createMany({
        data: [
            {
                dica: 'Estude as características do romantismo.',
                dica_en: 'Study the characteristics of romanticism.',
            },
            {
                dica: 'Analise a construção dos personagens.',
                dica_en: 'Analyze the character construction.',
            },
        ],
    });

    // 📝 TEMAS
    await prisma.tema.createMany({
        data: [
            {
                tema: 'Idealização amorosa',
                tema_en: 'Love idealization',
            },
            {
                tema: 'Juventude e sociedade',
                tema_en: 'Youth and society',
            },
        ],
    });

    // ❓ QUESTÕES
    await prisma.questao.createMany({
        data: [
            {
                pergunta: 'Qual característica está presente no romantismo?',
                pergunta_en: 'Which characteristic is present in romanticism?',

                opcaoA: 'Objetividade',
                opcaoA_en: 'Objectivity',

                opcaoB: 'Sentimentalismo',
                opcaoB_en: 'Sentimentalism',

                opcaoC: 'Linguagem técnica',
                opcaoC_en: 'Technical language',

                opcaoD: 'Foco científico',
                opcaoD_en: 'Scientific focus',

                respostaCorreta: 'B',

                explicacao: 'O romantismo valoriza emoções e sentimentalismo.',
                explicacao_en: 'Romanticism values emotions and sentimentalism.',
            },
            {
                pergunta: 'Quem é a protagonista feminina da obra?',
                pergunta_en: 'Who is the female protagonist of the book?',

                opcaoA: 'Capitu',
                opcaoA_en: 'Capitu',

                opcaoB: 'Lucíola',
                opcaoB_en: 'Luciola',

                opcaoC: 'Carolina',
                opcaoC_en: 'Carolina',

                opcaoD: 'Aurora',
                opcaoD_en: 'Aurora',

                respostaCorreta: 'C',

                explicacao: 'Carolina é a protagonista da obra A Moreninha.',
                explicacao_en: 'Carolina is the protagonist of A Moreninha.',
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
