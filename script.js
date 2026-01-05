/* =========================================
   THE COMMAND CENTER - JAVASCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initTypingEffect();
    initModeToggle();
    initPathfinder();
    initTimelineAnimation();
    initContactForm();
    initScrollAnimations();
});

/* =========================================
   NAVIGATION
   ========================================= */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    });
}

/* =========================================
   TYPING EFFECT
   ========================================= */
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const messages = [
        "¿En qué fase de tu código estás atascado?",
        "Transformo problemas técnicos en soluciones claras.",
        "Mentoría real, no respuestas copiadas de internet.",
        "IA aplicada para productividad real.",
        "Tu éxito académico y profesional es mi objetivo."
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;

    function type() {
        const currentMessage = messages[messageIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30;
        } else {
            typingElement.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 50;
        }

        if (!isDeleting && charIndex === currentMessage.length) {
            // Pause at end of message
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing after a short delay
    setTimeout(type, 1000);
}

/* =========================================
   MODE TOGGLE (Student / Consultant)
   ========================================= */
function initModeToggle() {
    const modeButtons = document.querySelectorAll('.mode-btn');
    const body = document.body;

    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode;
            
            // Update active button
            modeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update body data attribute
            body.dataset.mode = mode;
            
            // Add transition effect
            body.style.transition = 'all 0.5s ease';
            
            // Update hero glow animation
            const heroGlow = document.querySelector('.hero-glow');
            if (heroGlow) {
                heroGlow.style.transform = 'translate(-50%, -50%) scale(1.2)';
                setTimeout(() => {
                    heroGlow.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 300);
            }

            // Announce mode change
            showModeNotification(mode);
        });
    });
}

function showModeNotification(mode) {
    // Remove existing notification
    const existingNotif = document.querySelector('.mode-notification');
    if (existingNotif) existingNotif.remove();

    const message = mode === 'student' 
        ? '🎓 Modo Estudiante activado' 
        : '💼 Modo Consultor activado';

    const notification = document.createElement('div');
    notification.className = 'mode-notification';
    notification.innerHTML = `<span>${message}</span>`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        background: var(--bg-card);
        border: 1px solid var(--accent-primary);
        border-radius: 8px;
        font-family: var(--font-mono);
        font-size: 0.9rem;
        color: var(--accent-primary);
        z-index: 9999;
        animation: slideDown 0.3s ease, fadeOut 0.3s ease 2s forwards;
        box-shadow: var(--shadow-glow);
    `;

    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 2500);
}

// Add notification animation styles
const notifStyles = document.createElement('style');
notifStyles.textContent = `
    @keyframes slideDown {
        from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(notifStyles);

/* =========================================
   PATHFINDER (Interactive Quiz)
   ========================================= */
function initPathfinder() {
    const pathfinderSteps = document.querySelectorAll('.pathfinder-step');
    const pathfinderResult = document.getElementById('pathfinder-result');
    const resultTitle = document.getElementById('result-title');
    const resultDescription = document.getElementById('result-description');
    const resetButton = document.getElementById('pathfinder-reset');

    const results = {
        tutoring: {
            title: "Tutoría Personalizada en Programación",
            description: "Sesiones 1:1 enfocadas en tu lenguaje y nivel. Te explico los conceptos de forma clara y te ayudo a resolver los ejercicios que traes. Ideal para reforzar lo que ves en clase."
        },
        networking: {
            title: "Tutoría en Redes y Telemática",
            description: "Desde configuración de switches y routers hasta protocolos TCP/IP, subnetting y seguridad de redes. Te ayudo a entender la teoría y aplicarla en laboratorios prácticos."
        },
        project: {
            title: "Acompañamiento en Proyecto Universitario",
            description: "Te guío en la arquitectura, revisamos tu código juntos y te ayudo a presentar un proyecto que realmente demuestre tus capacidades. No hago el trabajo por ti, te enseño a hacerlo bien."
        },

        concepts: {
            title: "Explicación de Conceptos y Prácticas",
            description: "A veces solo necesitas que alguien te explique un tema de otra forma. Sesiones cortas para desbloquear esos conceptos que no terminan de cuajar."
        },
        automation: {
            title: "Automatización con IA para tu Negocio",
            description: "Identificamos las tareas repetitivas de tu día a día y las automatizamos con IA. Chatbots, clasificación de emails, generación de reportes automáticos. Tu tiempo vale oro."
        },
        consulting: {
            title: "Asesoría Tecnológica Estratégica",
            description: "Analizamos tu situación actual y diseñamos un plan para que la tecnología trabaje a tu favor. Sin jerga innecesaria, con resultados medibles."
        },
        development: {
            title: "Desarrollo y Optimización de Sistemas",
            description: "Mejoramos o creamos las herramientas que tu negocio necesita. Backend, APIs, integraciones. Código limpio que escala."
        },
        'ai-class': {
            title: "Integración de IA en tus Clases",
            description: "Te ayudo a incorporar herramientas de IA de forma ética y efectiva en tu metodología. Tus estudiantes aprenderán más y tú ahorrarás tiempo."
        },
        materials: {
            title: "Creación de Material Didáctico con IA",
            description: "Generamos ejercicios, exámenes, rúbricas y contenido personalizado usando IA. Variedad infinita manteniendo la calidad pedagógica."
        },
        training: {
            title: "Capacitación en LLMs y Herramientas IA",
            description: "Workshop práctico sobre cómo funcionan realmente los LLMs, sus limitaciones y cómo aprovecharlos. Uso responsable y efectivo."
        }
    };

    // Handle option clicks
    document.querySelectorAll('.pf-option').forEach(option => {
        option.addEventListener('click', () => {
            const nextStep = option.dataset.next;
            const value = option.dataset.value || option.dataset.result;

            // Hide current step
            document.querySelector('.pathfinder-step.active').classList.remove('active');

            if (nextStep === 'result') {
                // Show result
                const result = results[option.dataset.result];
                resultTitle.textContent = result.title;
                resultDescription.textContent = result.description;
                pathfinderResult.classList.add('active');
            } else {
                // Show next step
                document.querySelector(`.pathfinder-step[data-step="${nextStep}"]`).classList.add('active');
            }
        });
    });

    // Reset pathfinder
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            pathfinderResult.classList.remove('active');
            pathfinderSteps.forEach(step => step.classList.remove('active'));
            pathfinderSteps[0].classList.add('active');
        });
    }
}

/* =========================================
   TIMELINE ANIMATION
   ========================================= */
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineProgress = document.getElementById('timeline-progress');
    const timeline = document.querySelector('.timeline');

    if (!timeline || !timelineItems.length) return;

    function updateTimeline() {
        const timelineTop = timeline.offsetTop;
        const timelineHeight = timeline.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight * 0.7;
        
        // Calculate progress
        const progress = Math.max(0, Math.min(1, 
            (scrollPosition - timelineTop) / (timelineHeight * 0.8)
        ));
        
        if (timelineProgress) {
            timelineProgress.style.height = `${progress * 100}%`;
        }

        // Activate items based on scroll
        timelineItems.forEach((item, index) => {
            const itemTop = item.offsetTop + timelineTop;
            const itemThreshold = itemTop - window.innerHeight * 0.5;

            if (window.scrollY > itemThreshold) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateTimeline);
    updateTimeline(); // Initial check
}

/* =========================================
   CONTACT FORM
   ========================================= */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form?.querySelector('.submit-btn');
    const formSuccess = document.getElementById('form-success');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Validate
        if (!data.name || !data.email || !data.type || !data.message) {
            showFormError('Por favor, completa todos los campos.');
            return;
        }

        if (!isValidEmail(data.email)) {
            showFormError('Por favor, ingresa un email válido.');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            // Send to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: form.querySelector('input[name="access_key"]').value,
                    subject: 'Nueva consulta desde Command Center',
                    from_name: 'Command Center Web',
                    name: data.name,
                    email: data.email,
                    project_type: data.type,
                    message: data.message
                })
            });

            const result = await response.json();
            
            if (result.success) {
                // Show success message
                form.style.display = 'none';
                formSuccess.classList.add('show');
            } else {
                throw new Error(result.message || 'Error al enviar');
            }

        } catch (error) {
            console.error('Form error:', error);
            showFormError('Error al enviar. Por favor, intenta por WhatsApp.');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function simulateSend() {
    return new Promise(resolve => setTimeout(resolve, 1500));
}

function showFormError(message) {
    // Remove existing error
    const existingError = document.querySelector('.form-error');
    if (existingError) existingError.remove();

    const error = document.createElement('div');
    error.className = 'form-error';
    error.textContent = message;
    error.style.cssText = `
        padding: 12px;
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid var(--error);
        border-radius: 4px;
        color: var(--error);
        font-size: 0.9rem;
        margin-bottom: 16px;
        animation: fadeIn 0.3s ease;
    `;

    const form = document.getElementById('contact-form');
    form.insertBefore(error, form.firstChild);

    setTimeout(() => error.remove(), 5000);
}

/* =========================================
   SCROLL ANIMATIONS
   ========================================= */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .section-header, .about-content, .contact-container, .testimonials-terminal'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animation class styles
    const animStyles = document.createElement('style');
    animStyles.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(animStyles);
}

/* =========================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ========================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* =========================================
   CODE PREVIEW HOVER EFFECT
   ========================================= */
document.querySelectorAll('.code-preview').forEach(preview => {
    preview.addEventListener('mouseenter', () => {
        preview.classList.add('showing-fix');
    });
    preview.addEventListener('mouseleave', () => {
        preview.classList.remove('showing-fix');
    });
});

/* =========================================
   PARALLAX EFFECT FOR HERO GLOW
   ========================================= */
document.addEventListener('mousemove', (e) => {
    const heroGlow = document.querySelector('.hero-glow');
    if (!heroGlow) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 50;
    const y = (e.clientY / window.innerHeight - 0.5) * 50;

    heroGlow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
});
