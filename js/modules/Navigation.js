/**
 * Navigation Module
 * Single Responsibility: Handle all navigation between sections
 */

import { DOM } from '../core/DOMUtils.js';
import { EventBus } from '../core/EventBus.js';

class Navigation {
    constructor() {
        this.mainMenu = DOM.select('#main-menu');
        this.backBtn = DOM.select('#btn-back');
        this.sections = DOM.selectAll('.section');
        this.menuItems = DOM.selectAll('.menu-item');
    }

    /**
     * Show a specific section
     * @param {string} sectionId - ID of the section to show
     */
    showSection(sectionId) {
        // Hide main menu
        DOM.addClass(this.mainMenu, 'hidden-menu');

        // Hide all sections
        this.sections.forEach(section => {
            DOM.removeClass(section, 'active');
        });

        // Show target section
        const targetSection = DOM.select(`#${sectionId}`);
        if (targetSection) {
            DOM.defer(() => {
                DOM.addClass(targetSection, 'active');
            }, 150);
        }

        // Show back button
        DOM.defer(() => {
            DOM.addClass(this.backBtn, 'visible');
        }, 300);

        // Update active menu item
        this.menuItems.forEach(item => {
            DOM.removeClass(item, 'active');
        });

        // Emit event for other modules
        EventBus.emit('section:changed', { sectionId });
    }

    /**
     * Show main menu
     */
    showMainMenu() {
        // Hide back button
        DOM.removeClass(this.backBtn, 'visible');

        // Hide all sections
        this.sections.forEach(section => {
            DOM.removeClass(section, 'active');
        });

        // Show main menu
        DOM.defer(() => {
            DOM.removeClass(this.mainMenu, 'hidden-menu');
        }, 150);

        // Emit event
        EventBus.emit('menu:shown');
    }

    /**
     * Initialize navigation - expose methods globally for HTML onclick handlers
     */
    init() {
        // Make methods available globally for inline handlers
        window.showSection = (sectionId) => this.showSection(sectionId);
        window.showMainMenu = () => this.showMainMenu();
    }
}

export { Navigation };
