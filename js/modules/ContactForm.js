/**
 * Contact Form Module
 * Single Responsibility: Handle contact form submission
 */

import { DOM } from '../core/DOMUtils.js';
import { EventBus } from '../core/EventBus.js';

class ContactForm {
    constructor() {
        this.form = null;
        this.submitBtn = null;
        this.successMessage = null;
    }

    /**
     * Handle form submission
     * @param {Event} e - Submit event
     */
    async handleSubmit(e) {
        e.preventDefault();

        // Show loading state
        DOM.addClass(this.submitBtn, 'loading');
        this.submitBtn.disabled = true;

        try {
            const formData = new FormData(this.form);

            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                this.form.style.display = 'none';
                DOM.addClass(this.successMessage, 'show');

                // Reset form
                this.form.reset();

                // Emit success event
                EventBus.emit('contact:submitted', { success: true });
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');

            // Emit error event
            EventBus.emit('contact:error', { error });
        } finally {
            DOM.removeClass(this.submitBtn, 'loading');
            this.submitBtn.disabled = false;
        }
    }

    /**
     * Initialize contact form
     */
    init() {
        this.form = DOM.select('#contact-form');
        if (!this.form) return;

        this.submitBtn = DOM.select('.submit-btn', this.form);
        this.successMessage = DOM.select('#form-success');

        DOM.on(this.form, 'submit', (e) => this.handleSubmit(e));
    }
}

export { ContactForm };
