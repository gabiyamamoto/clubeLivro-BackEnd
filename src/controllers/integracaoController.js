const APIS = [
    {
        idIntegracao: 1,
        nome: "A Moreninha",
        origem: "minha-api",
        url: "https://clubelivro-backend.onrender.com/api/livros",
        apiKey: process.env.KEY_MORENINHA
    },

    {
        idIntegracao: 2,
        nome: "O Caminho de Pedras",
        origem: "dev-stone",
        url: "https://devstones-backend.onrender.com/api/livro",
        apiKey: process.env.KEY_CAMINHO
    },

    {
        idIntegracao: 3,
        nome: "Canção para ninar menino grande",
        origem: "menino-grande",
        url: "https://atividade-portugues-backend.onrender.com/api/livro",
        apiKey: process.env.KEY_CANCAO
    },

    {
        idIntegracao: 4,
        nome: "Olhos d'Água",
        origem: "olhos-agua",
        url: "https://olhosdagua.onrender.com/api/livro",
        apiKey: process.env.KEY_OLHOS
    },

    {
        idIntegracao: 5,
        nome: "Os Ratos",
        origem: "the-rats",
        url: "https://ratsjs.onrender.com/api/livros",
        apiKey: process.env.KEY_RATS
    },

    {
        idIntegracao: 6,
        nome: "Vidas Secas",
        origem: "bookverse",
        url: "https://bookverse-back-pob5.onrender.com/livros",
        apiKey: process.env.KEY_BOOKVERSE
    },

    {
        idIntegracao: 7,
        nome: "O Guarani",
        origem: "bookpedia",
        url: "https://bookpedia-backend-4ab3.onrender.com/livros",
        apiKey: process.env.KEY_GUARANI
    },

    {
        idIntegracao: 8,
        nome: "Memórias Póstumas",
        origem: "clubyx",
        url: "https://projeto-clubyx.onrender.com/livros",
        apiKey: process.env.KEY_MEMORIAS
    }
];

function normalizarLivro(livro, origem) {
    return {
        id: livro.id || livro._id,

        origem,

        titulo:
            livro.titulo ||
            livro.tituloDoLivro ||
            livro.nome ||
            livro.title ||
            "",

        titulo_en:
            livro.titulo_en ||
            livro.tituloDoLivroEn ||
            livro.nomeIng ||
            livro.title_en ||
            "",

        autor:
            livro.autor ||
            livro.author ||
            livro.autores?.[0]?.nome ||
            "",

        capa:
            livro.capa ||
            livro.foto ||
            livro.capaURL ||
            livro.capa_url ||
            livro.image ||
            "",

        anoPublicacao:
            livro.anoPublicacao ||
            livro.anoDeLancamento ||
            livro.ano ||
            livro.publicacao ||
            "",

        genero:
            livro.genero ||
            livro.genero_pt ||
            "",

        genero_en:
            livro.genero_en ||
            "",

        resumo:
            livro.resumo ||
            livro.descricao ||
            livro.descricao_pt ||
            "",

        resumo_en:
            livro.resumo_en ||
            livro.resumoEn ||
            livro.descricaoEn ||
            livro.descricao_en ||
            livro.resumoIng ||
            "",

        contexto:
            livro.contexto ||
            livro.contextoHistorico ||
            livro.contextoHist ||
            livro.contexto_historico_pt ||
            "",

        contexto_en:
            livro.contexto_en ||
            livro.contextoHistoricoEn ||
            livro.contextoHistIng ||
            livro.contexto_historico_en ||
            "",

        detalhesAutor:
            livro.detalhesAutor ||
            livro.autores?.[0]?.biografia ||
            livro.detalhes_autor_pt ||
            "",

        detalhesAutor_en:
            livro.detalhesAutor_en ||
            livro.autores?.[0]?.biografiaEn ||
            livro.detalhes_autor_en ||
            "",

        estiloEscrita:
            livro.estiloEscrita ||
            livro.movimentoLiterario?.[0]?.faseTexto ||
            livro.estilo_escrita_pt ||
            "",

        estiloEscrita_en:
            livro.estiloEscrita_en ||
            livro.movimentoLiterario?.[0]?.faseTexto ||
            livro.estilo_escrita_en ||
            "",

        enredo:
            livro.enredo ||
            livro.enredo_pt ||
            (
                livro.enredos?.[0]
                    ? `
${livro.enredos[0].introducao}

${livro.enredos[0].conflito}

${livro.enredos[0].climax}

${livro.enredos[0].desfecho}
`
                    : ""
            ),

        enredo_en:
            livro.enredo_en ||
            livro.enredo ||
            livro.enredo_pt ||
            (
                livro.enredos?.[0]
                    ? `
${livro.enredos[0].introducaoEn}

${livro.enredos[0].conflitoEn}

${livro.enredos[0].climaxEn}

${livro.enredos[0].desfechoEn}
`
                    : ""
            ),

        verossimilhanca:
            livro.verossimilhanca ||
            livro.verossimilhanca_pt ||
            "",

        verossimilhanca_en:
            livro.verossimilhanca_en ||
            livro.verossimilhanca ||
            livro.verossimilhanca_pt ||
            "",

        personagens:
            Array.isArray(livro.personagens)
                ? livro.personagens.map((p) =>
                    typeof p === "object" ? p.nome : p
                )
                : livro.personagens || [],

        caracteristicasLiterarias:
            livro.caracteristicasLiterarias ||
            livro.movimentoLiterario?.[0]?.caracteristicas ||
            livro.caracteristicas_literarias_pt ||
            "",

        caracteristicasLiterarias_en:
            livro.caracteristicasLiterarias_en ||
            livro.movimentoLiterario?.[0]?.caracteristicasEn ||
            livro.caracteristicas_literarias_en ||
            "",

        conclusao:
            livro.conclusao ||
            livro.conclusao_pt ||
            "",

        conclusao_en:
            livro.conclusao_en ||
            livro.conclusao ||
            livro.conclusao_pt ||
            "",

        nota:
            livro.nota || 3,
    };
}

export const buscarTodosIntegrados = async (req, res) => {
    try {

        const respostas = await Promise.allSettled(

            APIS.map(async (api) => {

                const resposta = await fetch(api.url, {
                    headers: {
                        "x-api-key": api.apiKey
                    }
                });

                if (!resposta.ok) {
                    throw new Error(`Erro na API ${api.nome}`);
                }

                const dados = await resposta.json();

                const livrosArray = Array.isArray(dados)
                    ? dados
                    : dados.data || [];

                return livrosArray.map((livro) =>
                    normalizarLivro(livro, api.origem)
                );
            })
        );

        console.log(
            respostas.map((r, index) => ({
                api: APIS[index].nome,
                status: r.status,
                erro: r.reason?.message
            }))
        );

        const livros = respostas
            .filter(r => r.status === "fulfilled")
            .flatMap(r => r.value);

        res.status(200).json(livros);

    } catch (erro) {

        res.status(500).json({
            error: "Erro na integração"
        });

    }
};

export const buscarLivroPorId = async (req, res) => {
    try {

        const { origem, id } = req.params;

        const api = APIS.find(
            (api) => api.origem === origem
        );

        if (!api) {
            return res.status(404).json({
                error: "Origem não encontrada"
            });
        }

        const resposta = await fetch(api.url, {
            headers: {
                "x-api-key": api.apiKey
            }
        });

        if (!resposta.ok) {
            throw new Error(`Erro na API ${api.nome}`);
        }

        const dados = await resposta.json();

        const livrosArray = Array.isArray(dados)
            ? dados
            : dados.data || [];

        const livro = livrosArray.find(
            (livro) =>
                String(livro.id || livro._id) === String(id)
        );

        if (!livro) {
            return res.status(404).json({
                error: "Livro não encontrado"
            });
        }

        return res.status(200).json(
            normalizarLivro(livro, origem)
        );

    } catch (erro) {

        return res.status(500).json({
            error: "Erro ao buscar livro"
        });

    }
};