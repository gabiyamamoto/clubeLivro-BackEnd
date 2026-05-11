import express from 'express';
import 'dotenv/config';
import dicaRoute from './routes/dicaRoute.js';
import livroRoute from './routes/livroRoute.js';
import participanteRoute from './routes/participanteRoute.js';
import personagemRoute from './routes/personagemRoute.js';
import questaoRoute from './routes/questaoRoute.js';
import videoAulaRoute from './routes/videoAulaRoute.js';


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Rotas
app.use('/api/videoAulas', videoAulaRoute);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
