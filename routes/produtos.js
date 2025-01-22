const { app, conn } = require('../server');

app.post('/novo/produtos', async (req, res) => {
    let {
        imagem      ,
        codigo      ,
        descricao   ,
        valor       ,
        quantidade  ,
        observacoes ,
        ativo       } = req.body;

    // Tratamento de Dados:
    if(!codigo || !descricao || !valor || !quantidade){
        res.status(200).send({
            erro: "Parâmetros obrigatórios não informados!",
            message: ["codigo","descricao","valor","quantidade"]
        });
        return
    }

    if(
        imagem.lenght > 255 ||
        codigo.lenght > 4 ||
        descricao.lenght > 100 ||
        Number.isNaN(Number(valor)) ||
        Number.isNaN(Number(quantidade)) ||
        (!ativo in ["0","1"])
    ){
        res.status(200).send({
            erro: "Parâmetros em formato incorreto!"
        });
        return
    }


    // Executar Procedure no Banco de Dados
    let [query] = await conn.promise().execute(`CALL NOVO_PRODUTO ( ?, ?, ?, ?, ?, ?, ? )`,
        [imagem, codigo, descricao, valor, quantidade, observacoes, ativo]
    )

})