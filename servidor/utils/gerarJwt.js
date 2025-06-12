
import jwt from "jsonwebtoken";

function gerarJwt(payload) {
    const secretKey = process.env.JWT_SECRET_KEY || "chave-secreta-padrao";
// Chave secreta para assinar o JWT, deve ser mantida em segredo e configurada no ambiente
    const options = {
        expiresIn: "1h" // Define o tempo de expiração do token
    };

    // Gera o token JWT
    const token = jwt.sign(payload, secretKey, options);
    
    return token;
}

export { gerarJwt };