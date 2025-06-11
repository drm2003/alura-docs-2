import { getDocumentosColecao } from "./dbConnect.js";

async function obterDocumentos() {
  const colecao = await getDocumentosColecao();
  const documentos = await colecao.find().toArray();
  return documentos;
}

async function adicionarDocumento(nome) {
  const colecao = await getDocumentosColecao();
  const resultado = colecao.insertOne({
    nome,
    texto: "",
  });

  return resultado;
}

async function encontrarDocumento(nome) {
  const colecao = await getDocumentosColecao();
  const documento = colecao.findOne({
    nome,
  });

  return documento;
}

async function atualizaDocumento(nome, texto) {
  const colecao = await getDocumentosColecao();
  const atualizacao = colecao.updateOne(
    {
      nome,
    },
    {
      $set: {
        texto,
      },
    }
  );

  return atualizacao;
}

async function excluirDocumento(nome) {
  const colecao = await getDocumentosColecao();
  const resultado = colecao.deleteOne({
    nome,
  });

  return resultado;
}

export {
  encontrarDocumento,
  atualizaDocumento,
  obterDocumentos,
  adicionarDocumento,
  excluirDocumento,
};
