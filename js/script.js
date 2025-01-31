// EmailJS configuration
document.addEventListener('DOMContentLoaded', function() {
    console.log("Portafolio de Diego Pazos cargado.");

    // Elementos del DOM para el contacto
    const contactBtn = document.getElementById('contact-btn');
    const contactModal = document.getElementById('contact-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const contactForm = document.getElementById('contact-form');

    // Elementos para el tema claro/oscuro
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Inicializar el tema al cargar
    initTheme();

    // Log para debugging
    console.log('Estado de los elementos:', {
        contactBtn: contactBtn ? 'encontrado' : 'no encontrado',
        contactModal: contactModal ? 'encontrado' : 'no encontrado',
        closeModalBtn: closeModalBtn ? 'encontrado' : 'no encontrado',
        contactForm: contactForm ? 'encontrado' : 'no encontrado'
    });

    // Abrir modal
    if (contactBtn && contactModal) {
        contactBtn.onclick = function() {
            contactModal.style.display = "flex";
        };
    }

    // Cerrar modal
    if (closeModalBtn && contactModal) {
        closeModalBtn.onclick = function() {
            contactModal.style.display = "none";
        };
    }

    // Cerrar modal al hacer clic fuera
    if (contactModal) {
        window.onclick = function(event) {
            if (event.target == contactModal) {
                contactModal.style.display = "none";
            }
        };
    }

    // Manejar envío del formulario
    if (contactForm) {
        contactForm.onsubmit = function(e) {
            e.preventDefault();
            console.log('Formulario enviado');

            const submitBtn = this.querySelector('.submit-btn');
            if (!submitBtn) return;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            const templateParams = {
                from_name: document.getElementById('from_name').value,
                reply_to: document.getElementById('reply_to').value,
                message: document.getElementById('message').value,
                to_name: 'Diego Pazos',  
                to_email: 'diegopazos1984@gmail.com'  
            };

            console.log('Enviando email con los siguientes parámetros:', {
                serviceID: 'service_rbw0qkx',
                templateID: 'template_o7mev7r',
                templateParams: templateParams,
                publicKey: 'MxxrOLdRiz3tV9i51'
            });

            emailjs.send('service_rbw0qkx', 'template_o7mev7r', templateParams, 'MxxrOLdRiz3tV9i51')
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    submitBtn.textContent = '¡Enviado!';
                    contactForm.reset();
                    
                    setTimeout(function() {
                        if (contactModal) {
                            contactModal.style.display = "none";
                        }
                        submitBtn.textContent = 'Enviar Mensaje';
                        submitBtn.disabled = false;
                    }, 2000);
                })
                .catch(function(error) {
                    console.error('FAILED:', error);
                    console.error('Error details:', {
                        message: error.message,
                        text: error.text,
                        status: error.status
                    });
                    submitBtn.textContent = 'Error al enviar';
                    alert('Error al enviar el mensaje. Por favor, intenta nuevamente.');
                    
                    setTimeout(function() {
                        submitBtn.textContent = 'Enviar Mensaje';
                        submitBtn.disabled = false;
                    }, 2000);
                });
        };
    }

    // Dropdown buttons
    document.querySelectorAll('.dropdown-btn').forEach(button => {
        button.addEventListener('click', () => {
            const dropdownContent = button.nextElementSibling;
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Carrusel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    function showSlide(index) {
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === currentSlide) {
                slide.classList.add('active');
            }
        });
    }

    // Botones de navegación del carrusel
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }

    // Auto-avance del carrusel cada 5 segundos
    if (slides.length > 0) {
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    // Tema oscuro/claro
    // Función para establecer el tema
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const icon = themeToggle.querySelector('i');
        
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        
        localStorage.setItem('theme', theme);
    }

    // Inicializar el tema
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
        }
    }

    // Evento para el botón de tema
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // Escuchar cambios en la preferencia del sistema
    prefersDarkScheme.addListener((e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Variables globales para el carrusel
    let currentIndex = 0;
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevButtonCarousel = document.querySelector('.carousel-control.prev');
    const nextButtonCarousel = document.querySelector('.carousel-control.next');

    // Funciones del carrusel
    function showSlideCarousel(index) {
        items.forEach(item => item.classList.remove('active'));
        if (index >= items.length) currentIndex = 0;
        if (index < 0) currentIndex = items.length - 1;
        items[currentIndex].classList.add('active');
    }

    // Manejo del carrusel
    if (prevButtonCarousel) {
        prevButtonCarousel.addEventListener('click', () => {
            currentIndex--;
            showSlideCarousel(currentIndex);
        });
    }

    if (nextButtonCarousel) {
        nextButtonCarousel.addEventListener('click', () => {
            currentIndex++;
            showSlideCarousel(currentIndex);
        });
    }

    // Cambio automático de slides
    setInterval(() => {
        if (items.length > 0) {
            currentIndex++;
            showSlideCarousel(currentIndex);
        }
    }, 5000);

    // Manejo de modales de proyectos
    const projectCards = document.querySelectorAll('.project-card');
    const projectModals = document.querySelectorAll('.project-modal');
    const closeButtons = document.querySelectorAll('.close-project-modal');

    console.log('Cards encontradas:', projectCards.length);
    console.log('Modales encontrados:', projectModals.length);
    console.log('Botones de cierre encontrados:', closeButtons.length);

    // Función para abrir modal
    function openModal(modal) {
        console.log('Abriendo modal:', modal.id);
        document.body.style.overflow = 'hidden';
        modal.style.display = 'flex';
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });
    }

    // Función para cerrar modal
    function closeModal(modal) {
        console.log('Cerrando modal:', modal.id);
        document.body.style.overflow = '';
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Event listeners para las cards
    projectCards.forEach(card => {
        const projectId = card.getAttribute('data-project');
        console.log('Card encontrada con data-project:', projectId);
        
        card.addEventListener('click', () => {
            console.log('Click en card:', projectId);
            const modal = document.getElementById(`modal-${projectId}`);
            console.log('Modal encontrado:', modal ? 'sí' : 'no');
            
            if (modal) {
                openModal(modal);
            } else {
                console.error(`Modal no encontrado: modal-${projectId}`);
            }
        });
    });

    // Event listeners para los botones de cerrar
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const modal = button.closest('.project-modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // Event listeners para cerrar al hacer clic fuera
    projectModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Prevenir que los clics dentro del contenido del modal cierren el modal
    document.querySelectorAll('.project-modal-content').forEach(content => {
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // Animación de entrada para las tarjetas de proyectos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                projectObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('fade-in');
        projectObserver.observe(card);
    });

    // Dragon Animation
    document.addEventListener('DOMContentLoaded', () => {
        const dragonStructure = document.querySelector('.dragon-structure');
        const techLines = document.querySelectorAll('.tech-line');
        const gridLines = document.querySelectorAll('.grid-line');

        if (dragonStructure && techLines.length > 0 && gridLines.length > 0) {
            // Animación de líneas técnicas
            techLines.forEach((line, index) => {
                gsap.to(line, {
                    opacity: 0.8,
                    duration: 1,
                    delay: index * 0.1,
                    repeat: -1,
                    yoyo: true
                });
            });

            // Animación de líneas de la cuadrícula
            gridLines.forEach((line, index) => {
                gsap.to(line, {
                    opacity: 0.3,
                    duration: 2,
                    delay: index * 0.05,
                    repeat: -1,
                    yoyo: true
                });
            });

            // Animación del dragón
            gsap.to(dragonStructure, {
                y: -20,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }
    });

    // Enlazar el botón CTA con el modal de contacto
    document.querySelector('.cta-button').addEventListener('click', () => {
        const contactButton = document.querySelector('.contact-fab');
        if (contactButton) {
            contactButton.click();
        }
    });

    // Manejar el clic en el botón CTA
    document.querySelector('.cta-button').addEventListener('click', () => {
        // Abrir el modal de contacto
        const contactModal = document.getElementById('contact-modal');
        if (contactModal) {
            contactModal.style.display = 'flex';
        }
    });
});