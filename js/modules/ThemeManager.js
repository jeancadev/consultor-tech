/**
 * Theme Manager Module
 * Single Responsibility: Handle dark/light mode toggle and persistence
 */

import { DOM } from '../core/DOMUtils.js';
import { EventBus } from '../core/EventBus.js';

class ThemeManager {
    constructor() {
        this.toggleElement = null;
        this.body = document.body;
        this.storageKey = 'darkMode';
    }

    /**
     * Toggle between dark and light mode
     */
    toggleTheme() {
        DOM.toggleClass(this.toggleElement, 'active');
        DOM.toggleClass(this.body, 'light-mode');

        // Save preference
        const isDarkMode = DOM.hasClass(this.toggleElement, 'active');
        localStorage.setItem(this.storageKey, isDarkMode);

        // Emit event
        EventBus.emit('theme:changed', { isDarkMode });
    }

    /**
     * Load saved theme preference from localStorage
     */
    loadPreference() {
        const savedPreference = localStorage.getItem(this.storageKey);

        if (savedPreference === 'false') {
            DOM.removeClass(this.toggleElement, 'active');
            DOM.addClass(this.body, 'light-mode');
        }
    }

    /**
     * Check if dark mode is active
     * @returns {boolean}
     */
    isDarkMode() {
        return DOM.hasClass(this.toggleElement, 'active');
    }

    /**
     * Initialize theme manager
     */
    init() {
        this.toggleElement = DOM.select('#dark-mode-toggle');
        this.loadPreference();
        
        // Make toggle available globally for inline handler
        window.toggleDarkMode = () => this.toggleTheme();
    }
}

export { ThemeManager };
