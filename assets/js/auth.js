function checkSession() {
    const sessao = JSON.parse(localStorage.getItem('usuario'));
    const isLoginPage = window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');

    if (!sessao && !isLoginPage) {
        window.location.href = 'index.html';
        return null;
    }
    return sessao;
}

function logout() {
    localStorage.removeItem('usuario');
    window.location.href = 'index.html';
}

const SESSAO_ATUAL = checkSession();
