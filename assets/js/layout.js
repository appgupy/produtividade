/**
 * assets/js/layout.js
 * ATUALIZADO: Logo aumentada para 75px e Navbar para 90px
 */

function renderNavbar() {
    if (document.querySelector('.navbar')) return;

    const path = window.location.pathname;
    if (path.includes('index.html') || (path.endsWith('/') && path.length < 2) || path === '/') {
        return;
    }

    let nomeUsuario = 'Colaborador';
    if (typeof SESSAO_ATUAL !== 'undefined' && SESSAO_ATUAL && SESSAO_ATUAL.nome) {
        nomeUsuario = SESSAO_ATUAL.nome;
    } else if (localStorage.getItem('usuario')) {
        try {
            const u = JSON.parse(localStorage.getItem('usuario'));
            nomeUsuario = u.nome || 'Colaborador';
        } catch (e) { console.error(e); }
    }

    const navHTML = `
    <nav class="navbar">
        <div class="nav-left">
            <div class="brand" onclick="window.location.href='produtividade.html'" 
                 style="display:flex; align-items:center; cursor:pointer; background:transparent !important; border:none !important; padding:0; margin-right: 30px;">
                <img src="assets/img/logo.png" alt="Logo" class="logo-nav" 
                     style="height: 75px; width: auto; display: block; background: transparent !important; border: none !important; outline: none !important; box-shadow: none !important;">
            </div>
            
            <div class="nav-links">
                <a href="gestao.html" class="nav-item">Gestão</a>
                <a href="produtividade.html" class="nav-item">Produtividade</a>
                <a href="performance.html" class="nav-item">Performance</a>
                <a href="consolidado.html" class="nav-item">Consolidado</a>
                <a href="minha_area.html" class="nav-item">Minha Área</a>
            </div>
        </div>
        
        <div class="user-area">
            <span class="user-name">${nomeUsuario}</span>
            <span class="logout-btn" onclick="logout()" style="color: #fca5a5; font-size: 0.7rem; cursor: pointer; font-weight: 600;">Sair</span>
        </div>
    </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    const page = path.split('/').pop();
    document.querySelectorAll('.nav-item').forEach(link => {
        const href = link.getAttribute('href');
        if (href === page || (page === '' && href === 'produtividade.html')) {
            link.classList.add('active');
        }
    });
}

document.addEventListener("DOMContentLoaded", renderNavbar);
