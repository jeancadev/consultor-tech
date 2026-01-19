/**
 * DOM Utilities
 * Reusable DOM manipulation helpers
 * Single Responsibility: DOM operations abstraction
 */

const DOM = {
    /**
     * Select a single element
     * @param {string} selector - CSS selector
     * @param {Element} [parent=document] - Parent element
     * @returns {Element|null}
     */
    select(selector, parent = document) {
        return parent.querySelector(selector);
    },

    /**
     * Select multiple elements
     * @param {string} selector - CSS selector
     * @param {Element} [parent=document] - Parent element
     * @returns {NodeList}
     */
    selectAll(selector, parent = document) {
        return parent.querySelectorAll(selector);
    },

    /**
     * Add class to element
     * @param {Element} element - Target element
     * @param {string} className - Class to add
     */
    addClass(element, className) {
        if (element) {
            element.classList.add(className);
        }
    },

    /**
     * Remove class from element
     * @param {Element} element - Target element
     * @param {string} className - Class to remove
     */
    removeClass(element, className) {
        if (element) {
            element.classList.remove(className);
        }
    },

    /**
     * Toggle class on element
     * @param {Element} element - Target element
     * @param {string} className - Class to toggle
     */
    toggleClass(element, className) {
        if (element) {
            element.classList.toggle(className);
        }
    },

    /**
     * Check if element has class
     * @param {Element} element - Target element
     * @param {string} className - Class to check
     * @returns {boolean}
     */
    hasClass(element, className) {
        return element ? element.classList.contains(className) : false;
    },

    /**
     * Create a promise-based delay
     * @param {number} ms - Milliseconds to wait
     * @returns {Promise}
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Execute callback after delay
     * @param {Function} callback - Function to execute
     * @param {number} ms - Delay in milliseconds
     * @returns {number} - Timeout ID
     */
    defer(callback, ms = 0) {
        return setTimeout(callback, ms);
    },

    /**
     * Add event listener with automatic cleanup
     * @param {Element} element - Target element
     * @param {string} event - Event type
     * @param {Function} handler - Event handler
     * @param {Object} [options] - Event listener options
     * @returns {Function} - Cleanup function
     */
    on(element, event, handler, options) {
        if (!element) return () => {};
        
        element.addEventListener(event, handler, options);
        return () => element.removeEventListener(event, handler, options);
    }
};

export { DOM };
