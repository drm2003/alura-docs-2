const socket = io();

function emitirCadastrarUsuario(dados) {
  socket.emit("cadastrar_usuario", dados);
}

socket.on("cadastro_sucesso", (info) => {
  alert(`${info.mensagem}`);
});

socket.on("cadastro_erro", (info) => {
  alert(`${info.mensagem}`);
});

socket.on("usuario_ja_existente", (info) => {
  alert(`${info.mensagem}`);
});

export { emitirCadastrarUsuario };