import "dotenv/config";
import io from "./servidor.js";
import { autorizarUsuario } from "./middlware/autorizarUsuario.js";

import { registrarEventosCadastro } from "./registrarEventos/cadastro.js";
import { registrarEventosDocumento } from "./registrarEventos/documento.js";
import { registrarEventosInicio } from "./registrarEventos/inicio.js";
import { registrarEventosLogin } from "./registrarEventos/login.js";


io.of("/usuarios").use(autorizarUsuario);

io.of("/").on("connection", (socket) => {
  registrarEventosCadastro(socket, io);
  registrarEventosLogin(socket, io);
  registrarEventosInicio(socket, io);
  registrarEventosDocumento(socket, io);
});
