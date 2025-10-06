document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // Função para mostrar a seção correta e atualizar o link ativo
    function showSection(hash) {

        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Se não tiver hash, usa o da primeira seção
        if (!hash) {
            hash = '#introducao';
            window.scrollTo(0, 0); 
        }

        sections.forEach(section => {
            if ('#' + section.id === hash) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Fecha o menu em telas pequenas após clicar em um link
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    }
    
    // Navegação via cliques nos links do menu principal
    const docNav = document.getElementById('doc-nav');
    if (docNav) {
        docNav.addEventListener('click', function(event) {
            const targetLink = event.target.closest('a');
            if (targetLink && !targetLink.classList.contains('dropdown-toggle')) {
                event.preventDefault();
                const hash = targetLink.getAttribute('href');
                history.pushState(null, null, hash); // Atualiza a URL sem recarregar
                showSection(hash);
            }
        });
    }
    
    // -- LÓGICA PARA O NOVO DROPDOWN --
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            event.preventDefault(); // Impede a navegação padrão do link
            const parentLi = this.parentElement;
            const dropdownMenu = parentLi.querySelector('.dropdown-menu');

            parentLi.classList.toggle('open');
            
            if (parentLi.classList.contains('open')) {
                // Define a altura máxima para o menu aparecer
                dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
            } else {
                // Reseta a altura máxima para o menu sumir
                dropdownMenu.style.maxHeight = null;
            }

            // Opcional: navegar para a primeira seção do dropdown ao abrir
            const firstLinkHash = this.getAttribute('href');
            showSection(firstLinkHash);
            history.pushState(null, null, firstLinkHash);
        });
    });


    // Exibe a seção correta ao carregar a página (baseado na URL)
    showSection(window.location.hash);
    
    // Controle do menu em telas pequenas
    if(menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }
});