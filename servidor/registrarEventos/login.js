import { encontrarUsuario } from "../db/usuariosDb.js";
import { autenticarUsuario } from "../utils/autenticarUsuario.js";
import { gerarJwt } from "../utils/gerarJwt.js";

function registrarEventosLogin(socket, io) {
    socket.on("autenticar_usuario", async ({nome, senha}) => {
        const usuario = await encontrarUsuario(nome);

        if(usuario) {
            const autenticado = autenticarUsuario(senha, usuario);

    
            if (autenticado) {
                const tokenJwt = gerarJwt(nome);
                console.log(tokenJwt);
                
                socket.emit("autenticacao_sucesso", { mensagem: `Usuário(a) ${usuario.nome} autenticado com sucesso.` });
            } else {
                socket.emit("autenticacao_erro", { mensagem: `Senha incorreta para o(a) usuário(a) ${usuario.nome}.` });
            }
        } else {
            socket.emit("usuario_nao_encontrado", { mensagem: `Usuário(a) ${nome} não encontrado.` });
        }


    });
} 

export { registrarEventosLogin };