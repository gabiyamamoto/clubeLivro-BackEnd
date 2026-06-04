import 'dotenv/config';

const autenticar = (req, res, next) => {
    const chave = req.headers['x-api-key'];

    if (!chave || chave !== process.env.KEY_MORENINHA) {
        return res.status(401).json({ erro: 'Acesso não autorizado. X-API-KEY inválida.' });
    }

    next();
};

export default autenticar;
