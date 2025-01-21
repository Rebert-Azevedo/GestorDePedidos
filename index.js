const { app, conn } = require('./server');

app.post('/auth/login', async (req, res) => {
    let { login, senha } = req.body;

    let [query] = await conn.promise().execute(`CALL ADMIN_LOGIN ( ?, ?)`,
        [login, senha]
    );

    let resposta = query[0][0];

    if(resposta.ID_USUARIO){
        res.send({
            sucesso: "Login efetuado com sucesso!",
            dados: resposta
        });
        return
    }

    if(resposta.MENSAGEM){
        res.send({
            erro: resposta.MENSAGEM
        });
        return
    }
});