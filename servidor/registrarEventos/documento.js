import { adicionarConexaoDocumento, encontrarConexao, obterUsuariosDocumento, removerconexao } from "../utils/conexoesDocumentos.js";

import {
  atualizaDocumento,
  encontrarDocumento,
  excluirDocumento,
} from "../db/documentosDb.js";

function registrarEventosDocumento(socket, io) {
  socket.on("selecionar_documento", async ({ nomeDocumento, nomeUsuario }, devolverTexto) => {
    const documento = await encontrarDocumento(nomeDocumento);
    
    if (documento) {
      const conexaoEncontrada = encontrarConexao(nomeDocumento, nomeUsuario);

      if (!conexaoEncontrada) {
        socket.join(nomeDocumento);
  
        adicionarConexaoDocumento({ nomeDocumento, nomeUsuario });

        socket.data = {
          usuarioEntrou: true
        };
  
        const usuariosNoDocumento = obterUsuariosDocumento(nomeDocumento);
  
        io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento);
        
  
        devolverTexto(documento.texto);
      } else {
        socket.emit("usuario_ja_no_documento", "Você já está conectado a este documento.");
      }

    }

    socket.on("disconnect", () => {
      if (socket.data.usuarioEntrou) {
        removerconexao(nomeDocumento, nomeUsuario);
        
        const usuariosNoDocumento = obterUsuariosDocumento(nomeDocumento);
  
        io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento);
      }
    });
  });

  socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
    const atualizacao = await atualizaDocumento(nomeDocumento, texto);

    if (atualizacao.modifiedCount) {
      socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
    }
  });

  socket.on("excluir_documento", async (nome) => {
    const resultado = await excluirDocumento(nome);

    if (resultado.deletedCount) {
      io.emit("excluir_documento_sucesso", nome);
    }
  });
}

export default registrarEventosDocumento;
