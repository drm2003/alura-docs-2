import { encontrarUsuario } from "../db/usuariosDb.js";
import { autenticarUsuario } from "../../public/utils/autenticarUsuario.js";
import { gerarJwt } from "../../public/utils/gerarJwt.js";

function registrarEventosLogin(socket, io) {
    socket.on("autenticar_usuario", async ({nome, senha}) => {
        const usuario = await encontrarUsuario(nome);

        if(usuario) {
            const autenticado = autenticarUsuario(senha, usuario);

    
            if (autenticado) {
                const tokenJwt = gerarJwt({ nomeUsuario: nome });
                
                socket.emit("autenticacao_sucesso", { tokenJwt, mensagem: `Usuário(a) ${usuario.nome} autenticado com sucesso.` });
            } else {
                socket.emit("autenticacao_erro", { mensagem: `Senha incorreta para o(a) usuário(a) ${usuario.nome}.` });
            }
        } else {
            socket.emit("usuario_nao_encontrado", { mensagem: `Usuário(a) ${nome} não encontrado.` });
        }


    });
} 

export { registrarEventosLogin };