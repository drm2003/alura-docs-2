import jwt from "jsonwebtoken";

function autorizarUsuario(socket, next) {
    const tokenJwt = socket.handshake.auth.token;

    try {
        jwt.verify(tokenJwt, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return next(new Error("Token JWT inválido ou expirado"));
            }
            socket.usuario = decoded; // Armazena os dados do usuário no socket
        });        
    } catch (error) {
        return next(new Error("Erro ao processar o token JWT"));
    }
    
    next();
}
export { autorizarUsuario };