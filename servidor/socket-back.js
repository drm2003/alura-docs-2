import "dotenv/config";
import io from "./servidor.js";
import { autorizarUsuario } from "./middlware/autorizarUsuario.js";

import { registrarEventosCadastro } from "./registrarEventos/cadastro.js";
import { registrarEventosDocumento } from "./registrarEventos/documento.js";
import { registrarEventosInicio } from "./registrarEventos/inicio.js";
import { registrarEventosLogin } from "./registrarEventos/login.js";

const nspUsuarios = io.of("/usuarios");

nspUsuarios.use(autorizarUsuario);

nspUsuarios.on("connection", (socket) => {
  registrarEventosInicio(socket, nspUsuarios);
  registrarEventosDocumento(socket, nspUsuarios);
});

io.of("/").on("connection", (socket) => {
  registrarEventosCadastro(socket, io);
  registrarEventosLogin(socket, io);
});