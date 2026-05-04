import pg from 'pg';
import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = pkg;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Resetando banco...');

    await prisma.resposta.deleteMany();
    await prisma.alternativa.deleteMany();
    await prisma.questao.deleteMany();
    await prisma.tema.deleteMany();
    await prisma.dica.deleteMany();
    await prisma.videoaula.deleteMany();
    await prisma.personagem.deleteMany();
    await prisma.livro.deleteMany();
    await prisma.participante.deleteMany();

    console.log('📦 Inserindo dados...');

    // 📖 LIVRO (com nomes dos personagens como string)
    await prisma.livro.create({
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
            personagens: 'Carolina, Augusto',
            caracteristicasLiterarias: 'Idealização do amor.',
            caracteristicasLiterarias_en: 'Idealization of love.',
            conclusao: 'Obra marcante do romantismo.',
            conclusao_en: 'Important romanticism work.',
        },
    });

    // 👥 PERSONAGENS (independentes)
    await prisma.personagem.createMany({
        data: [
            {
                nome: 'Carolina',
                caracteristicas: 'Jovem romântica e misteriosa',
                caracteristicas_en: 'Romantic and mysterious young woman',
                representacao: 'Ideal feminino do romantismo',
                representacao_en: 'Romantic ideal woman',
            },
            {
                nome: 'Augusto',
                caracteristicas: 'Jovem inconstante',
                caracteristicas_en: 'Inconstant young man',
                representacao: 'Juventude impulsiva',
                representacao_en: 'Impulsive youth',
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
                dica: 'Entenda o romantismo',
                dica_en: 'Understand romanticism',
            },
            {
                dica: 'Analise os personagens',
                dica_en: 'Analyze the characters',
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

    // ❓ QUESTÃO
    const questao = await prisma.questao.create({
        data: {
            enunciado: 'Qual é uma característica do romantismo?',
            enunciado_en: 'What is a characteristic of romanticism?',
        },
    });

    // 🔘 ALTERNATIVAS
    await prisma.alternativa.createMany({
        data: [
            {
                alternativa: 'Idealização do amor',
                alternativa_en: 'Idealization of love',
                ehCorreta: true,
                questaoId: questao.id,
            },
            {
                alternativa: 'Objetividade extrema',
                alternativa_en: 'Extreme objectivity',
                ehCorreta: false,
                questaoId: questao.id,
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
