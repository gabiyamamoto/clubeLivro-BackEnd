import ExemploModel from '../models/ExemploModel.js';

export const criar = async (req, res) => {
    try {
        const { enunciado, enunciado_en, alternativas, alternativas_en } = req.body;

        if (!enunciado) {
            return res.status(400).json({ error: 'Ter enunciado é obrigatório.' });
        }

        if (!enunciado_en) {
            return res.status(400).json({ error: 'Enunciado é obrigatório nos dois idiomas.' });
        }

        if (!alternativas || alternativas.length < 2) {
            return res.status(400).json({ error: 'A questão deve ter pelo menos 2 alternativas.' });
        }

        if (!alternativas_en) {
            return res
                .status(400)
                .json({ error: 'É obrigatório ter alternativas em ambos os idiomas.' });
        }

        const temCorreta = alternativas.some((a) => a.ehCorreta === true);

        if (!temCorreta) {
            return res
                .status(400)
                .json({ error: 'Deve haver pelo menos uma alternativa correta.' });
        }

        const questao = await prisma.questao.create({
            data: {
                enunciado,
                enunciado_en,
                alternativas: {
                    create: alternativas.map((alt) => ({
                        alternativa: alt.alternativa,
                        alternativa_en: alt.alternativa_en,
                        ehCorreta: alt.ehCorreta,
                    })),
                },
            },
            include: {
                alternativas: true,
            },
        });

        return res.status(201).json({ message: 'Questão criada com sucesso!', data: questao });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao criar questão.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const questoes = await prisma.questao.findMany({
            include: {
                alternativas: true,
            },
        });

        if (lang === 'en') {
            return res.json({
                enunciado: questoes.enunciado_en,
                alternativa: questoes.alternativa_en,
            });
        }

        return res.status(200).json(questoes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar questões.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const questao = await prisma.questao.findUnique({
            where: { id: parseInt(id) },
            include: {
                alternativas: true,
            },
        });

        if (!questao) {
            return res.status(404).json({ error: 'Questão não encontrada.' });
        }

        return res.status(200).json(questao);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar questão.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { enunciado, enunciado_en, alternativas } = req.body;

        const questaoExistente = await prisma.questao.findUnique({
            where: { id: parseInt(id) },
        });

        if (!questaoExistente) {
            return res.status(404).json({ error: 'Questão não encontrada.' });
        }

        const questao = await prisma.questao.update({
            where: { id: parseInt(id) },
            data: {
                enunciado,
                enunciado_en,
                alternativas: {
                    deleteMany: {}, // remove antigas
                    create: alternativas, // cria novas
                },
            },
            include: {
                alternativas: true,
            },
        });

        return res.status(200).json({ message: 'Atualizada com sucesso!', data: questao });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao atualizar questão.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        const questao = await prisma.questao.findUnique({
            where: { id: parseInt(id) },
        });

        if (!questao) {
            return res.status(404).json({ error: 'Questão não encontrada.' });
        }

        await prisma.questao.delete({
            where: { id: parseInt(id) },
        });

        return res.status(200).json({ message: 'Questão deletada com sucesso!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao deletar questão.' });
    }
};
