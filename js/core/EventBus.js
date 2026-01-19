/**
 * EventBus - Pub/Sub Pattern Implementation
 * Enables decoupled communication between modules
 * 
 * @example
 * EventBus.on('section:changed', (data) => console.log(data));
 * EventBus.emit('section:changed', { sectionId: 'home' });
 */

const EventBus = {
    events: {},

    /**
     * Subscribe to an event
     * @param {string} event - Event name
     * @param {Function} callback - Handler function
     * @returns {Function} - Unsubscribe function
     */
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);

        // Return unsubscribe function
        return () => {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        };
    },

    /**
     * Publish an event
     * @param {string} event - Event name
     * @param {*} data - Event data
     */
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event handler for "${event}":`, error);
                }
            });
        }
    },

    /**
     * Subscribe to an event only once
     * @param {string} event - Event name
     * @param {Function} callback - Handler function
     */
    once(event, callback) {
        const unsubscribe = this.on(event, (data) => {
            callback(data);
            unsubscribe();
        });
    },

    /**
     * Remove all listeners for an event
     * @param {string} event - Event name
     */
    off(event) {
        delete this.events[event];
    }
};

export { EventBus };
