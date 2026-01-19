/**
 * Keyboard Navigation Module
 * Single Responsibility: Handle keyboard shortcuts
 */

import { DOM } from '../core/DOMUtils.js';
import { EventBus } from '../core/EventBus.js';

class KeyboardNav {
    constructor(navigation) {
        this.navigation = navigation;
        this.cleanup = null;
    }

    /**
     * Handle keydown events
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleKeydown(e) {
        // ESC to go back to menu
        if (e.key === 'Escape') {
            const mainMenu = DOM.select('#main-menu');
            if (DOM.hasClass(mainMenu, 'hidden-menu')) {
                this.navigation.showMainMenu();
                EventBus.emit('keyboard:escape');
            }
        }
    }

    /**
     * Initialize keyboard navigation
     */
    init() {
        this.cleanup = DOM.on(document, 'keydown', (e) => this.handleKeydown(e));
    }

    /**
     * Remove event listener
     */
    destroy() {
        if (this.cleanup) {
            this.cleanup();
        }
    }
}

export { KeyboardNav };
