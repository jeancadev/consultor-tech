/**
 * Pathfinder Results Data
 * Single Responsibility: Data storage for pathfinder recommendations
 * Open/Closed: New results can be added without modifying Pathfinder module
 */

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

export { pathfinderResults };
