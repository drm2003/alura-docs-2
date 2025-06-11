import criaHashESalSenha from "../utils/criaHashESalSenha.js";
import { getUsuarios } from "./dbConnect.js";

async function encontrarUsuario(nome) {
    const usuariosColecao = await getUsuarios();
    return usuariosColecao.findOne({ nome });
}

async function cadastrarUsuario({ nome, senha }) {
    const usuariosColecao = await getUsuarios();

    const { hashSenha, salSenha } = criaHashESalSenha(senha);
    return usuariosColecao.insertOne({ nome, hashSenha, salSenha });
}

export { cadastrarUsuario, encontrarUsuario };