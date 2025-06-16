const conexoesDocumentos = [];

function adicionarConexaoDocumento(conexao) {
  conexoesDocumentos.push(conexao);
}

function obterUsuariosDocumento(nomeDocumento) {
  return conexoesDocumentos
    .filter(conexao => conexao.nomeDocumento === nomeDocumento)
    .map(conexao => conexao.nomeUsuario);
}

export {adicionarConexaoDocumento, obterUsuariosDocumento}