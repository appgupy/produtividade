/**
 * assets/js/layout.js
 * Responsável por renderizar a barra de navegação (Navbar) em todas as páginas,
 * exceto no login.
 */

function renderNavbar() {
    // 1. Verifica se é a página de login (index.html ou raiz). Se for, NÃO desenha a navbar.
    const path = window.location.pathname;
    if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
        return;
    }

    // 2. Tenta recuperar o nome do usuário de forma segura
    let nomeUsuario = 'Usuário';
    
    // Verifica se a variável global SESSAO_ATUAL (do auth.js) existe
    if (typeof SESSAO_ATUAL !== 'undefined' && SESSAO_ATUAL) {
        nomeUsuario = SESSAO_ATUAL.nome;
    } 
    // Se não, tenta pegar direto do LocalStorage (fallback de segurança)
    else if (localStorage.getItem('usuario')) {
        try {
            const u = JSON.parse(localStorage.getItem('usuario'));
            nomeUsuario = u.nome;
        } catch (e) {
            console.error('Erro ao ler usuário', e);
        }
    }

    // 3. Monta o HTML da Navbar
    // OBS: Adicionei estilos inline na imagem para garantir 100% que o fundo fique transparente
    const navHTML = `
    <nav class="navbar">
        <div class="nav-left">
            <div class="brand" onclick="window.location.href='produtividade.html'" 
                 style="display:flex; align-items:center; cursor:pointer; background:transparent !important; border:none !important; padding:0; margin-right: 30px;">
                <img src="assets/img/logo.png" alt="Logo" class="logo-nav" 
                     style="height: 45px; width: auto; display: block; background: transparent !important; border: none !important; outline: none !important; box-shadow: none !important;">
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
            <span class="logout-btn" onclick="logout()">Sair</span>
        </div>
    </nav>
    `;

    // 4. Insere a Navbar no início do Body
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // 5. Marca o link da página atual como "Ativo" (ficando com a borda colorida embaixo)
    const page = path.split('/').pop();
    const links = document.querySelectorAll('.nav-item');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        // Se o nome do arquivo bater com o link, adiciona a classe .active
        if (href === page || (page === '' && href === 'produtividade.html')) {
            link.classList.add('active');
        }
    });
}

// --- IMPORTANTE: Executa a função assim que a página carregar ---
document.addEventListener("DOMContentLoaded", renderNavbar);
