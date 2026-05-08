import ParticipantesModel from '../models/ParticipantesModel.js';
import fs from 'fs/promises';
import { processarFoto, removerFoto } from '../utils/fotoHelper.js';

export const uploadFoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: 'Nenhum arquivo enviado!',
            });
        }

        const { id } = req.params;

        if (isNaN(id)) {
            removerFoto(req.file.path);

            return res.status(400).json({
                error: 'O ID informado não é válido.',
            });
        }

        const participante = await ParticipantesModel.buscarPorId(parseInt(id));

        if (!participante) {
            removerFoto(req.file.path);

            return res.status(404).json({
                error: 'Participante não encontrado.',
            });
        }

        if (participante.foto) {
            await fs.unlink(participante.foto).catch(() => {});
        }

        participante.foto = await processarFoto(req.file.path);

        await participante.atualizar();

        return res.status(201).json({
            message: 'Foto salva com sucesso!',
            data: participante,
        });
    } catch (error) {
        console.error('Erro ao salvar foto:', error);

        if (req.file?.path) {
            removerFoto(req.file.path);
        }

        return res.status(500).json({
            error: 'Erro interno ao salvar a foto.',
        });
    }
};

export const verFoto = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({
                error: 'O ID informado não é válido.',
            });
        }

        const participante = await ParticipantesModel.buscarPorId(parseInt(id));

        if (!participante) {
            return res.status(404).json({
                error: 'Participante não encontrado.',
            });
        }

        if (!participante.foto) {
            return res.status(404).json({
                error: 'Este participante não possui foto cadastrada.',
            });
        }

        return res.sendFile(participante.foto, {
            root: '.',
        });
    } catch (error) {
        console.error('Erro ao buscar foto:', error);

        return res.status(500).json({
            error: 'Erro interno ao buscar a foto.',
        });
    }
};
