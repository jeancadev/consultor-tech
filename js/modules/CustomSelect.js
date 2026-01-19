/**
 * Custom Select Module
 * Single Responsibility: Handle custom dropdown select component
 */

import { DOM } from '../core/DOMUtils.js';
import { EventBus } from '../core/EventBus.js';

class CustomSelect {
    constructor() {
        this.customSelect = null;
        this.trigger = null;
        this.options = null;
        this.hiddenInput = null;
        this.valueDisplay = null;
        this.cleanupFunctions = [];
    }

    /**
     * Toggle dropdown open/closed
     * @param {Event} e - Click event
     */
    toggleDropdown(e) {
        e.stopPropagation();
        DOM.toggleClass(this.customSelect, 'open');
    }

    /**
     * Handle option selection
     * @param {Element} option - Selected option element
     */
    selectOption(option) {
        const value = option.dataset.value;
        const text = DOM.select('span:last-child', option).textContent;

        // Update hidden input
        this.hiddenInput.value = value;

        // Update display
        this.valueDisplay.textContent = text;
        DOM.removeClass(this.valueDisplay, 'placeholder');

        // Mark as selected
        DOM.selectAll('.select-option', this.options).forEach(opt => {
            DOM.removeClass(opt, 'selected');
        });
        DOM.addClass(option, 'selected');

        // Close dropdown
        DOM.removeClass(this.customSelect, 'open');

        // Emit event
        EventBus.emit('select:changed', { value, text });
    }

    /**
     * Close dropdown when clicking outside
     * @param {Event} e - Click event
     */
    handleOutsideClick(e) {
        if (this.customSelect && !this.customSelect.contains(e.target)) {
            DOM.removeClass(this.customSelect, 'open');
        }
    }

    /**
     * Close dropdown on ESC key
     * @param {Event} e - Keyboard event
     */
    handleEscape(e) {
        if (e.key === 'Escape') {
            DOM.removeClass(this.customSelect, 'open');
        }
    }

    /**
     * Initialize custom select
     */
    init() {
        this.customSelect = DOM.select('#custom-select');
        this.trigger = DOM.select('#select-trigger');
        this.options = DOM.select('#select-options');
        this.hiddenInput = DOM.select('#project-type');
        this.valueDisplay = DOM.select('.select-value', this.trigger);

        if (!this.customSelect || !this.trigger || !this.options) {
            return;
        }

        // Toggle dropdown on trigger click
        this.cleanupFunctions.push(
            DOM.on(this.trigger, 'click', (e) => this.toggleDropdown(e))
        );

        // Handle option selection
        DOM.selectAll('.select-option', this.options).forEach(option => {
            this.cleanupFunctions.push(
                DOM.on(option, 'click', () => this.selectOption(option))
            );
        });

        // Close on outside click
        this.cleanupFunctions.push(
            DOM.on(document, 'click', (e) => this.handleOutsideClick(e))
        );

        // Close on ESC
        this.cleanupFunctions.push(
            DOM.on(document, 'keydown', (e) => this.handleEscape(e))
        );
    }

    /**
     * Cleanup event listeners
     */
    destroy() {
        this.cleanupFunctions.forEach(cleanup => cleanup());
        this.cleanupFunctions = [];
    }
}

export { CustomSelect };
