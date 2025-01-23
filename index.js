const { app, conn } = require('./server');

// Login de Usuário Administrador
app.post('/auth/login', async (req, res) => {
    let { login, senha } = req.body;

    // Tratamento de Dados
    if (!login || !senha){
        res.status(200).send({
            erro: "Login e Senha são obrigatórios!"
        });
        return
    }

    // Verificação dos Dados no Banco
    let [query] = await conn.promise().execute(`CALL ADMIN_LOGIN ( ?, ?)`,
        [login, senha]
    );

    let resposta = query[0][0];

    // Tratamento da Resposta
    if(resposta.ID_USUARIO){
        res.status(200).send({
            sucesso: "Login efetuado com sucesso!",
            dados: resposta
        });
        return
    }

    if(resposta.MENSAGEM){
        res.status(200).send({
            message: resposta.MENSAGEM
        });
        return
    }
});


require('./routes/produtos');
