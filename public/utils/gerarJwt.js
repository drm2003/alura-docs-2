
import jwt from "jsonwebtoken";

function gerarJwt(payload) {
    const secretKey = process.env.JWT_SECRET_KEY;

    const options = {
        expiresIn: "1h" // Define o tempo de expiração do token
    };

    // Gera o token JWT
    const token = jwt.sign(payload, secretKey, options);
    
    return token;
}

export { gerarJwt };