import { cadastrarUsuario, encontrarUsuario } from "../db/usuariosDb.js";

function registrarEventosCadastro(socket, io) {
    socket.on("cadastrar_usuario", async (dados) => {
        const usuario = await encontrarUsuario(dados.nome);

        if (usuario === null) {
            const resultado = await cadastrarUsuario(dados);
            if (resultado.acknowledged) {
                socket.emit("cadastro_sucesso", { mensaem: `Usuário ${dados.nome} cadastrado com sucesso.` });
            } else {
                socket.emit("cadastro_erro", { mensagem:`Erro ao cadastrar usuário ${dados.nome}` });
            }
        } else {
            socket.emit("usuario_ja_existente", { mensagem: `Usuário ${dados.nome} já existe.` });
        }
    });
}

export { registrarEventosCadastro };