CREATE TABLE IF NOT EXISTS USUARIOS (
	ID_USUARIO 	INT PRIMARY KEY AUTO_INCREMENT	,
    LOGIN		VARCHAR(14) NOT NULL UNIQUE		,
    NOME		VARCHAR(100) NOT NULL			,
    SENHA		VARCHAR(100) NOT NULL			,
    EMAIL		VARCHAR(100) NOT NULL			);

SELECT * FROM USUARIOS;

INSERT INTO USUARIOS (
	LOGIN	,
    SENHA	,
    EMAIL	)
VALUES (
    "24822967000117"					,
    "EMPRESA MODELO"					,
    "3d8d95fe21684427020e4d04c0a4eb00"	,
    "contabilgs3@gmail.com"				);
    
DELIMITER $$
CREATE PROCEDURE ADMIN_LOGIN ( IN P_LOGIN VARCHAR(14), IN P_SENHA VARCHAR(100) )
	BEGIN
		IF EXISTS ( SELECT * FROM USUARIOS WHERE LOGIN = P_LOGIN AND SENHA = P_SENHA ) THEN
			SELECT ID_USUARIO, NOME FROM USUARIOS WHERE LOGIN = P_LOGIN AND SENHA = P_SENHA;
		ELSE
            SELECT "Login e Senha Inválidos!" AS MENSAGEM;
		END IF;
	END $$
DELIMITER ;