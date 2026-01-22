/* =========================================
   GLASSMORPHISM UI - JavaScript
   Consultor Tech - Navigation & Interactions
   ========================================= */

// =========================================
// NAVIGATION SYSTEM
// =========================================

// Show a specific section
function showSection(sectionId) {
    // Hide main menu
    const mainMenu = document.getElementById('main-menu');
    mainMenu.classList.add('hidden-menu');
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        setTimeout(() => {
            targetSection.classList.add('active');
        }, 150);
    }
    
    // Show back button
    const backBtn = document.getElementById('btn-back');
    setTimeout(() => {
        backBtn.classList.add('visible');
    }, 300);
    
    // Update active menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
}

// Show main menu
function showMainMenu() {
    // Hide back button
    const backBtn = document.getElementById('btn-back');
    backBtn.classList.remove('visible');
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show main menu
    const mainMenu = document.getElementById('main-menu');
    setTimeout(() => {
        mainMenu.classList.remove('hidden-menu');
    }, 150);
}

// =========================================
// DARK MODE TOGGLE
// =========================================

function toggleDarkMode() {
    const toggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    toggle.classList.toggle('active');
    body.classList.toggle('light-mode');
    
    // Save preference
    const isDarkMode = toggle.classList.contains('active');
    localStorage.setItem('darkMode', isDarkMode);
}

// Load saved dark mode preference
function loadDarkModePreference() {
    const savedPreference = localStorage.getItem('darkMode');
    const toggle = document.getElementById('dark-mode-toggle');
    
    if (savedPreference === 'false') {
        toggle.classList.remove('active');
        document.body.classList.add('light-mode');
    }
}

// =========================================
// PATHFINDER SYSTEM
// =========================================

const pathfinderResults = {
    tutoring: {
        title: "Tutoría en Programación",
        description: "Sesiones personalizadas para dominar Python, JavaScript, C# y más. Te ayudo a entender los conceptos desde cero o a resolver problemas específicos de tu código. Mi enfoque es que aprendas a pescar, no darte el pescado."
    },
    networking: {
        title: "Tutoría en Redes y Telemática",
        description: "Desde configuración de routers hasta arquitectura de redes empresariales. Te explico los conceptos de forma práctica y te ayudo con tus laboratorios y proyectos de networking."
    },
    project: {
        title: "Apoyo en Proyecto Universitario",
        description: "Acompañamiento completo para tu proyecto: arquitectura, implementación, debugging y documentación. Te guío paso a paso manteniendo el enfoque en que TÚ aprendas y entregues un trabajo del que estés orgulloso."
    },
    concepts: {
        title: "Explicación de Conceptos",
        description: "¿Hay algo que no entiendes por más que lo estudies? Sesiones enfocadas en aclarar dudas específicas. Uso analogías, ejemplos prácticos y diferentes enfoques hasta que el concepto haga click."
    },
    automation: {
        title: "Automatización con IA",
        description: "Implemento soluciones con LLMs y APIs de IA para automatizar tareas repetitivas en tu negocio. Desde chatbots hasta procesamiento de documentos. ROI típico en semanas, no meses."
    },
    consulting: {
        title: "Asesoría Tecnológica",
        description: "Evaluación completa de tu infraestructura tecnológica y recomendaciones estratégicas. Te ayudo a tomar decisiones informadas sobre herramientas, proveedores y arquitectura."
    },
    development: {
        title: "Desarrollo y Optimización",
        description: "Desarrollo de scripts, aplicaciones y optimización de sistemas existentes. Código limpio, documentado y mantenible. Especializado en Python, JavaScript y .NET."
    },
    hardware: {
        title: "Hardware y Soporte Técnico",
        description: "Nuestro especialista Jesús ofrece mantenimiento, reparación y venta de equipos. Servicio a domicilio disponible con garantía en todas las reparaciones."
    },
    "ai-class": {
        title: "Integración de IA en Clases",
        description: "Te enseño a usar ChatGPT, Claude y otras herramientas de IA de forma responsable en tu práctica docente. Desde generar ejercicios hasta personalizar feedback para estudiantes."
    },
    materials: {
        title: "Material Didáctico con IA",
        description: "Aprende a crear exámenes, rúbricas, presentaciones y recursos educativos usando IA como asistente. Multiplica tu productividad sin sacrificar calidad."
    },
    training: {
        title: "Capacitación en LLMs",
        description: "Workshops personalizados sobre el uso efectivo de modelos de lenguaje. Desde prompting básico hasta técnicas avanzadas. Ideal para equipos docentes que quieren modernizarse."
    }
};

function initPathfinder() {
    const options = document.querySelectorAll('.pf-option');
    const resetBtn = document.getElementById('pathfinder-reset');
    
    options.forEach(option => {
        option.addEventListener('click', () => {
            const nextStep = option.dataset.next;
            const result = option.dataset.result;
            
            // Hide current step
            const currentStep = option.closest('.pathfinder-step');
            currentStep.classList.remove('active');
            
            if (nextStep === 'result' && result) {
                // Show result
                showPathfinderResult(result);
            } else {
                // Show next step
                const nextStepElement = document.querySelector(`[data-step="${nextStep}"]`);
                if (nextStepElement) {
                    setTimeout(() => {
                        nextStepElement.classList.add('active');
                    }, 100);
                }
            }
        });
    });
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetPathfinder);
    }
}

function showPathfinderResult(resultKey) {
    const result = pathfinderResults[resultKey];
    const resultElement = document.getElementById('pathfinder-result');
    const titleElement = document.getElementById('result-title');
    const descElement = document.getElementById('result-description');
    
    if (result && resultElement) {
        titleElement.textContent = result.title;
        descElement.textContent = result.description;
        
        setTimeout(() => {
            resultElement.classList.add('active');
        }, 100);
    }
}

function resetPathfinder() {
    // Hide result
    const resultElement = document.getElementById('pathfinder-result');
    resultElement.classList.remove('active');
    
    // Hide all steps
    document.querySelectorAll('.pathfinder-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show first step
    setTimeout(() => {
        const firstStep = document.querySelector('[data-step="1"]');
        if (firstStep) {
            firstStep.classList.add('active');
        }
    }, 100);
}

// =========================================
// TIMELINE ANIMATION
// =========================================

function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineProgress = document.getElementById('timeline-progress');
    const processSection = document.getElementById('process');
    
    if (!timelineItems.length || !timelineProgress) return;
    
    // Function to activate all timeline items progressively
    function activateTimelineItems() {
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('active');
                // Update progress line
                const progress = ((index + 1) / timelineItems.length) * 100;
                timelineProgress.style.height = `${progress}%`;
            }, index * 200); // 200ms delay between each item
        });
    }
    
    // Function to reset timeline
    function resetTimeline() {
        timelineItems.forEach(item => {
            item.classList.remove('active');
        });
        timelineProgress.style.height = '0%';
    }
    
    // Use MutationObserver to detect when process section becomes visible
    const sectionObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (processSection.classList.contains('active')) {
                    // Small delay to let the section appear first
                    setTimeout(activateTimelineItems, 300);
                } else {
                    resetTimeline();
                }
            }
        });
    });
    
    // Observe the process section for class changes
    if (processSection) {
        sectionObserver.observe(processSection, { attributes: true });
    }
}

// =========================================
// CONTACT FORM
// =========================================

function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form?.querySelector('.submit-btn');
    const successMessage = document.getElementById('form-success');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(form);
            
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                form.style.display = 'none';
                successMessage.classList.add('show');
                
                // Reset form
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

// =========================================
// KEYBOARD NAVIGATION
// =========================================

function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        // ESC to go back to menu
        if (e.key === 'Escape') {
            const mainMenu = document.getElementById('main-menu');
            if (mainMenu.classList.contains('hidden-menu')) {
                showMainMenu();
            }
        }
    });
}

// =========================================
// CUSTOM SELECT DROPDOWN
// =========================================

function initCustomSelect() {
    const customSelect = document.getElementById('custom-select');
    const trigger = document.getElementById('select-trigger');
    const options = document.getElementById('select-options');
    const hiddenInput = document.getElementById('project-type');
    const valueDisplay = trigger?.querySelector('.select-value');
    
    if (!customSelect || !trigger || !options) return;
    
    // Toggle dropdown
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        customSelect.classList.toggle('open');
    });
    
    // Select option
    options.querySelectorAll('.select-option').forEach(option => {
        option.addEventListener('click', () => {
            const value = option.dataset.value;
            const text = option.querySelector('span:last-child').textContent;
            
            // Update hidden input
            hiddenInput.value = value;
            
            // Update display
            valueDisplay.textContent = text;
            valueDisplay.classList.remove('placeholder');
            
            // Mark as selected
            options.querySelectorAll('.select-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            option.classList.add('selected');
            
            // Close dropdown
            customSelect.classList.remove('open');
        });
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove('open');
        }
    });
    
    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            customSelect.classList.remove('open');
        }
    });
}

// =========================================
// INITIALIZATION
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    loadDarkModePreference();
    initPathfinder();
    initTimeline();
    initContactForm();
    initKeyboardNav();
    initCustomSelect();
    
    // Activate first timeline item by default
    const firstTimelineItem = document.querySelector('.timeline-item');
    if (firstTimelineItem) {
        firstTimelineItem.classList.add('active');
    }
    
    // Mostrar menu-panel suavemente después de que el blur se inicialice
    const menuPanel = document.querySelector('.menu-panel');
    if (menuPanel) {
        // Pequeño delay para asegurar que backdrop-filter esté listo
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                menuPanel.classList.add('ready');
            });
        });
    }
});

// Make functions globally available
window.showSection = showSection;
window.showMainMenu = showMainMenu;
window.toggleDarkMode = toggleDarkMode;
