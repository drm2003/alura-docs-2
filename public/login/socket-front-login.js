import { definirCookie } from "../utils/cookies.js";

const socket = io("http://localhost:3000");

function emitirAutenticarUsuario(dados){
    socket.emit("autenticar_usuario", dados);
}

socket.on("autenticacao_sucesso", (dados) => {
    definirCookie("tokenJwt", dados.tokenJwt);
    alert(dados.mensagem);
    window.location.href = "/";
}); 

socket.on("autenticacao_erro", (dados) => {
    alert(dados.mensagem);
});

socket.on("usuario_nao_encontrado", (dados) => {
    alert(dados.mensagem);
});



export { emitirAutenticarUsuario };