import sharp from 'sharp';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const UPLOADS_DIR = './uploads';

if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        const nomeSeguro = file.originalname.replace(/\s+/g, '_').replace(/[^\w.-]/g, '');

        cb(null, `participante_${req.params.id}_${Date.now()}_${nomeSeguro}${ext}`);
    },
});

export const upload = multer({
    storage,

    fileFilter: (req, file, cb) => {
        const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp'];

        if (tiposPermitidos.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de arquivo inválido.'));
        }
    },
});

export async function processarFoto(filePath) {
    const processado = await sharp(filePath)
        .resize({
            width: 800,
            withoutEnlargement: true,
        })
        .jpeg({
            quality: 80,
        })
        .toBuffer();

    fs.writeFileSync(filePath, processado);
    return filePath.replace(/\\/g, '/');
}

export function removerFoto(filePath) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}
