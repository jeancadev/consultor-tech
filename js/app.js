/**
 * App - Main Application Entry Point
 * Composition Root: Orchestrates all modules
 * 
 * This file follows the Dependency Inversion Principle by:
 * - Instantiating all modules
 * - Injecting dependencies where needed
 * - Initializing in the correct order
 */

// Core
import { EventBus } from './core/EventBus.js';
import { DOM } from './core/DOMUtils.js';

// Data
import { pathfinderResults } from './data/pathfinderData.js';

// Modules
import { Navigation } from './modules/Navigation.js';
import { ThemeManager } from './modules/ThemeManager.js';
import { Pathfinder } from './modules/Pathfinder.js';
import { Timeline } from './modules/Timeline.js';
import { ContactForm } from './modules/ContactForm.js';
import { CustomSelect } from './modules/CustomSelect.js';
import { KeyboardNav } from './modules/KeyboardNav.js';

/**
 * Application Class
 * Single Responsibility: Bootstrap and coordinate modules
 */
class App {
    constructor() {
        // Instantiate modules with dependency injection
        this.navigation = new Navigation();
        this.themeManager = new ThemeManager();
        this.pathfinder = new Pathfinder(pathfinderResults);
        this.timeline = new Timeline();
        this.contactForm = new ContactForm();
        this.customSelect = new CustomSelect();
        this.keyboardNav = new KeyboardNav(this.navigation);
    }

    /**
     * Initialize all modules
     */
    init() {
        // Initialize in order of dependency
        this.navigation.init();
        this.themeManager.init();
        this.pathfinder.init();
        this.timeline.init();
        this.contactForm.init();
        this.customSelect.init();
        this.keyboardNav.init();

        // Log initialization (can be removed in production)
        console.log('✅ Consultor Tech App initialized');
        
        // Emit app ready event
        EventBus.emit('app:ready');
    }

    /**
     * Cleanup all modules (useful for SPA navigation or testing)
     */
    destroy() {
        this.timeline.destroy();
        this.customSelect.destroy();
        this.keyboardNav.destroy();
    }
}

// Bootstrap application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();

    // Expose app instance for debugging (optional, remove in production)
    window.__app = app;
});
