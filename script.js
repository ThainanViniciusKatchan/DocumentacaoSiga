document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('.content-section');
            const menuToggle = document.getElementById('menu-toggle');
            const sidebar = document.getElementById('sidebar');

            // Função para mostrar a seção correta e atualizar o link ativo
            function showSection(hash) {
                // Se não tiver hash, usa o da primeira seção
                if (!hash) {
                    hash = '#introducao';
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
            
            // Navegação via cliques nos links
            const docNav = document.getElementById('doc-nav');
            if (docNav) {
                docNav.addEventListener('click', function(event) {
                    if (event.target.tagName === 'A') {
                        event.preventDefault();
                        const hash = event.target.getAttribute('href');
                        history.pushState(null, null, hash); // Atualiza a URL sem recarregar
                        showSection(hash);
                    }
                });
            }

            // Exibe a seção correta ao carregar a página (baseado na URL)
            showSection(window.location.hash);
            
            // Controle do menu em telas pequenas
            if(menuToggle) {
                menuToggle.addEventListener('click', function() {
                    sidebar.classList.toggle('open');
                });
            }
        });