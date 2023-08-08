'use strict';

class Checkbox {
    constructor(domNode) {
        this.domNode = domNode;
        this.domNode.tabIndex = 0;

        if (!this.domNode.getAttribute('aria-checked')) {
            this.domNode.setAttribute('aria-checked', 'false');
        }

        this.domNode.addEventListener('keydown', this.onKeydown.bind(this));
        this.domNode.addEventListener('keyup', this.onKeyup.bind(this));
        this.domNode.addEventListener('click', this.onClick.bind(this));
    }

    toggleCheckbox() {
        if (this.domNode.getAttribute('aria-checked') === 'true') {
            this.domNode.setAttribute('aria-checked', 'false');
        }
        else {
            this.domNode.setAttribute('aria-checked', 'true');
        }
    }

    // Make sure to prevent page scrolling on space down
    onKeydown(event) {
        if (event.key === ' ') {
            event.preventDefault();
        }
    }

    onKeyup(event) {
        var flag = false;

        switch (event.key) {
            case ' ':
                this.toggleCheckbox();
                flag = true;
                break;

            default:
                break;
        }

        if (flag) {
            event.stopPropagation();
        }
    }

    onClick() {
        this.toggleCheckbox();
    }
}

// Initialize checkboxes on the page
window.addEventListener('load', function () {
    let checkboxes = document.querySelectorAll('.checkboxes [role="checkbox"]');
    for (let i = 0; i < checkboxes.length; i++) {
        new Checkbox(checkboxes[i]);
    }
});
