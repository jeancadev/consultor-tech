/**
 * Pathfinder Module
 * Single Responsibility: Handle the interactive advisor wizard
 * Dependency Inversion: Receives results data via constructor injection
 */

import { DOM } from '../core/DOMUtils.js';
import { EventBus } from '../core/EventBus.js';

class Pathfinder {
    /**
     * @param {Object} resultsData - Pathfinder results configuration
     */
    constructor(resultsData) {
        this.resultsData = resultsData;
        this.options = null;
        this.resetBtn = null;
        this.resultElement = null;
        this.titleElement = null;
        this.descElement = null;
    }

    /**
     * Handle option click
     * @param {Element} option - Clicked option element
     */
    handleOptionClick(option) {
        const nextStep = option.dataset.next;
        const result = option.dataset.result;

        // Hide current step
        const currentStep = option.closest('.pathfinder-step');
        DOM.removeClass(currentStep, 'active');

        if (nextStep === 'result' && result) {
            // Show result
            this.showResult(result);
        } else {
            // Show next step
            const nextStepElement = DOM.select(`[data-step="${nextStep}"]`);
            if (nextStepElement) {
                DOM.defer(() => {
                    DOM.addClass(nextStepElement, 'active');
                }, 100);
            }
        }

        // Emit event
        EventBus.emit('pathfinder:step', { nextStep, result });
    }

    /**
     * Show pathfinder result
     * @param {string} resultKey - Key of the result to display
     */
    showResult(resultKey) {
        const result = this.resultsData[resultKey];

        if (result && this.resultElement) {
            this.titleElement.textContent = result.title;
            this.descElement.textContent = result.description;

            DOM.defer(() => {
                DOM.addClass(this.resultElement, 'active');
            }, 100);

            // Emit event
            EventBus.emit('pathfinder:result', { resultKey, result });
        }
    }

    /**
     * Reset pathfinder to initial state
     */
    reset() {
        // Hide result
        DOM.removeClass(this.resultElement, 'active');

        // Hide all steps
        DOM.selectAll('.pathfinder-step').forEach(step => {
            DOM.removeClass(step, 'active');
        });

        // Show first step
        DOM.defer(() => {
            const firstStep = DOM.select('[data-step="1"]');
            if (firstStep) {
                DOM.addClass(firstStep, 'active');
            }
        }, 100);

        // Emit event
        EventBus.emit('pathfinder:reset');
    }

    /**
     * Initialize pathfinder
     */
    init() {
        this.options = DOM.selectAll('.pf-option');
        this.resetBtn = DOM.select('#pathfinder-reset');
        this.resultElement = DOM.select('#pathfinder-result');
        this.titleElement = DOM.select('#result-title');
        this.descElement = DOM.select('#result-description');

        // Attach event listeners to options
        this.options.forEach(option => {
            DOM.on(option, 'click', () => this.handleOptionClick(option));
        });

        // Attach reset handler
        if (this.resetBtn) {
            DOM.on(this.resetBtn, 'click', () => this.reset());
        }
    }
}

export { Pathfinder };
