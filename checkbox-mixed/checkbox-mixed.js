'use strict';

class CheckboxMixed {
    constructor(domNode) {
        this.mixedNode = domNode.querySelector('[role="checkbox"]');
        this.checkboxNodes = domNode.querySelectorAll('input[type="checkbox"]');

        this.mixedNode.addEventListener('keydown', this.onMixedKeydown.bind(this));
        this.mixedNode.addEventListener('keyup', this.onMixedKeyup.bind(this));
        this.mixedNode.addEventListener('click', this.onMixedClick.bind(this));
        this.mixedNode.addEventListener('focus', this.onMixedFocus.bind(this));
        this.mixedNode.addEventListener('blur', this.onMixedBlur.bind(this));

        for (let i = 0; i < this.checkboxNodes.length; i++) {
            const checkboxNode = this.checkboxNodes[i];

            checkboxNode.addEventListener('click', this.onCheckboxClick.bind(this));
            checkboxNode.addEventListener('focus', this.onCheckboxFocus.bind(this));
            checkboxNode.addEventListener('blur', this.onCheckboxBlur.bind(this));
            checkboxNode.setAttribute('data-last-state', checkboxNode.checked);
        }

        this.updateMixed();
    }

    updateMixed() {
        let count = 0;

        for (let i = 0; i < this.checkboxNodes.length; i++) {
            if (this.checkboxNodes[i].checked) {
                count++;
            }
        }

        if (count === 0) {
            this.mixedNode.setAttribute('aria-checked', 'false');
        } else {
            if (count === this.checkboxNodes.length) {
                this.mixedNode.setAttribute('aria-checked', 'true');
            } else {
                this.mixedNode.setAttribute('aria-checked', 'mixed');
                this.updateCheckboxStates();
            }
        }
    }

    updateCheckboxStates() {
        for (let i = 0; i < this.checkboxNodes.length; i++) {
            const checkboxNode = this.checkboxNodes[i];
            checkboxNode.setAttribute('data-last-state', checkboxNode.checked);
        }
    }

    anyLastChecked() {
        let count = 0;

        for (let i = 0; i < this.checkboxNodes.length; i++) {
            if (this.checkboxNodes[i].getAttribute('data-last-state') == 'true') {
                count++;
            }
        }

        return count > 0;
    }

    setCheckboxes(value) {
        for (let i = 0; i < this.checkboxNodes.length; i++) {
            const checkboxNode = this.checkboxNodes[i];

            switch (value) {
                case 'last':
                    checkboxNode.checked =
                        checkboxNode.getAttribute('data-last-state') === 'true';
                    break;

                case 'true':
                    checkboxNode.checked = true;
                    break;

                default:
                    checkboxNode.checked = false;
                    break;
            }
        }
        this.updateMixed();
    }

    toggleMixed() {
        const state = this.mixedNode.getAttribute('aria-checked');

        if (state === 'false') {
            if (this.anyLastChecked()) {
                this.setCheckboxes('last');
            } else {
                this.setCheckboxes('true');
            }
        } else {
            if (state === 'mixed') {
                this.setCheckboxes('true');
            } else {
                this.setCheckboxes('false');
            }
        }

        this.updateMixed();
    }

    /* EVENT HANDLERS */

    // Prevent page scrolling on space down
    onMixedKeydown(event) {
        if (event.key === ' ') {
            event.preventDefault();
        }
    }

    onMixedKeyup(event) {
        switch (event.key) {
            case ' ':
                this.toggleMixed();
                event.stopPropagation();
                break;

            default:
                break;
        }
    }

    onMixedClick() {
        this.toggleMixed();
    }

    onMixedFocus() {
        this.mixedNode.classList.add('focus');
    }

    onMixedBlur() {
        this.mixedNode.classList.remove('focus');
    }

    onCheckboxClick(event) {
        event.currentTarget.setAttribute(
            'data-last-state',
            event.currentTarget.checked
        );
        this.updateMixed();
    }

    onCheckboxFocus(event) {
        event.currentTarget.parentNode.classList.add('focus');
    }

    onCheckboxBlur(event) {
        event.currentTarget.parentNode.classList.remove('focus');
    }
}

// Initialize mixed checkboxes on the page
window.addEventListener('load', function () {
    const mixed = document.querySelectorAll('.checkbox-mixed');
    for (let i = 0; i < mixed.length; i++) {
        new CheckboxMixed(mixed[i]);
    }
});
