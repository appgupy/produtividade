// assets/js/auth.js

// Verifica sessão ao carregar (exceto na página de login)
function checkSession() {
    const sessao = JSON.parse(localStorage.getItem('usuario'));
    const isLoginPage = window.location.pathname.includes('index.html') || window.location.pathname === '/';

    if (!sessao && !isLoginPage) {
        window.location.href = 'index.html';
        return null;
    }
    return sessao;
}

// Função Global de Logout
function logout() {
    localStorage.removeItem('usuario');
    window.location.href = 'index.html';
}

// Armazena sessão atual em variável global para uso fácil
const SESSAO_ATUAL = checkSession();
