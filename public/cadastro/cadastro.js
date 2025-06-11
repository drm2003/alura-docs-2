import { emitirCadastrarUsuario } from "./socket-front-cadastro.js";

const form = document.getElementById('form-cadastro');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values from the form fields
    const nome = form['input-usuario'].value;
    const senha = form['input-senha'].value;

    emitirCadastrarUsuario({nome: nome, senha: senha });
});