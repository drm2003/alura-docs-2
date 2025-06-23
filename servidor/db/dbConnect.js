import { MongoClient } from "mongodb";

// Notebook casa
const uri = 'mongodb://localhost:27017/';
const cliente = new MongoClient(uri);

async function conectarDB() {
  let db;
  try {
    await cliente.connect();

    db = cliente.db("alura-websockets");

    
    // console.log("Conectado ao banco de dados com sucesso!");
  } catch (erro) {
    console.log(erro);
    throw new Error("Erro ao conectar ao banco de dados");
  }
  
  return db;
}

async function getDocumentosColecao() {
  const dbConectado = await conectarDB();
  try {
    return dbConectado.collection("documentos");
  } catch (erro) {
    console.log(erro);
    throw new Error("Erro ao obter a coleção de documentos");
  }
}

async function getUsuarios() {
  const dbConectado = await conectarDB();
  try {
    return dbConectado.collection("usuarios");
  } catch (erro) {
    console.log(erro);
    throw new Error("Erro ao obter a coleção de usuários");
  }
}


// Remova o uso de await no topo do arquivo e exporte apenas as funções
export { conectarDB, getDocumentosColecao, getUsuarios };




