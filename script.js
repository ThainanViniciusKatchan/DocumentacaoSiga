document.addEventListener('DOMContentLoaded', function () {
    const mainContent = document.querySelector('.main-content');
    const docNav = document.getElementById('doc-nav');
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');

    // Função para carregar conteúdo.
    async function loadContent(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Arquivo não encontrado: ${url}`);
            const text = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const section = doc.querySelector('.content-section');

            if (section) {
                mainContent.innerHTML = section.innerHTML;
            } else {
                mainContent.innerHTML = text;
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error("Erro ao carregar:", error);
            mainContent.innerHTML = `<h1>Página não encontrada</h1>`;
        }
    }

    // Função para atualizar o link ativo. Não precisa mudar.
    function updateActiveLink(url) {
        document.querySelectorAll('.nav-link').forEach(link => {
            // Com a tag <base>, podemos comparar os hrefs diretamente
            if (link.getAttribute('href') === url) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Função do dropdown. Não precisa mudar.
    function handleDropdown(toggleLink) {
        const parentLi = toggleLink.parentElement;
        const dropdownMenu = parentLi.querySelector('.dropdown-menu');
        parentLi.classList.toggle('open');
        dropdownMenu.style.maxHeight = parentLi.classList.contains('open') ? dropdownMenu.scrollHeight + "px" : null;
    }

    // Listener principal da navegação
    if (docNav) {
        docNav.addEventListener('click', function (event) {
            const targetLink = event.target.closest('a');
            if (!targetLink) return;

            event.preventDefault();
            const url = targetLink.getAttribute('href');

            if (targetLink.classList.contains('dropdown-toggle')) {
                handleDropdown(targetLink);
            } else {
                loadContent(url);
                updateActiveLink(url);
                // A URL agora é relativa à base, então não vai duplicar
                history.pushState({ path: url }, '', url);
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }

    // Listener do menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    }

    // Função de carregamento inicial
    function loadInitialPage() {
        const baseHref = document.baseURI.substring(window.location.origin.length);
        let path = window.location.pathname;

        if (path.startsWith(baseHref)) {
            path = path.substring(baseHref.length);
        }

        let initialUrl = path;
        if (initialUrl === '' || initialUrl === 'index.html') {
            const firstLink = document.querySelector('.nav-link:not(.dropdown-toggle)');
            initialUrl = firstLink ? firstLink.getAttribute('href') : 'sections/introduction.html';
        }
        
        loadContent(initialUrl);
        updateActiveLink(initialUrl);
        history.replaceState({ path: initialUrl }, '', initialUrl);
    }
    
    loadInitialPage();
});