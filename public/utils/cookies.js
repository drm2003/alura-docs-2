function definirCookie(chave, valor) {  
    document.cookie = `${chave}=${valor}; path=/; SameSite=Lax; Secure;`;
}

function obterCookie(chave) {
    return document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith(`${chave}=`))?.split("=")[1];
}

function removeCookie(chave) {
    document.cookie = `${chave}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax; Secure;`;
}

export { definirCookie, obterCookie, removeCookie };