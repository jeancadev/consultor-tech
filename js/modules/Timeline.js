/**
 * Timeline Module
 * Single Responsibility: Handle timeline animation in the Process section
 */

import { DOM } from '../core/DOMUtils.js';
import { EventBus } from '../core/EventBus.js';

class Timeline {
    constructor() {
        this.items = null;
        this.progress = null;
        this.processSection = null;
        this.observer = null;
    }

    /**
     * Activate timeline items progressively with animation
     */
    activateItems() {
        this.items.forEach((item, index) => {
            DOM.defer(() => {
                DOM.addClass(item, 'active');
                // Update progress line
                const progress = ((index + 1) / this.items.length) * 100;
                this.progress.style.height = `${progress}%`;
            }, index * 200); // 200ms delay between each item
        });
    }

    /**
     * Reset timeline to initial state
     */
    reset() {
        this.items.forEach(item => {
            DOM.removeClass(item, 'active');
        });
        this.progress.style.height = '0%';
    }

    /**
     * Handle section visibility change
     * @param {MutationRecord[]} mutations
     */
    handleMutation(mutations) {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (DOM.hasClass(this.processSection, 'active')) {
                    // Small delay to let the section appear first
                    DOM.defer(() => this.activateItems(), 300);
                } else {
                    this.reset();
                }
            }
        });
    }

    /**
     * Initialize timeline
     */
    init() {
        this.items = DOM.selectAll('.timeline-item');
        this.progress = DOM.select('#timeline-progress');
        this.processSection = DOM.select('#process');

        if (!this.items.length || !this.progress || !this.processSection) {
            return;
        }

        // Use MutationObserver to detect when process section becomes visible
        this.observer = new MutationObserver((mutations) => this.handleMutation(mutations));
        this.observer.observe(this.processSection, { attributes: true });

        // Activate first timeline item by default
        const firstTimelineItem = DOM.select('.timeline-item');
        if (firstTimelineItem) {
            DOM.addClass(firstTimelineItem, 'active');
        }
    }

    /**
     * Cleanup observer
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

export { Timeline };
