"use strict";

const ICON_MUTE_URL = "#icon-mute";
const ICON_SOUND_URL = "#icon-sound";

function init() {
  const actionButton = document.getElementById("action");
  actionButton.addEventListener("click", activateActionButton);
  actionButton.addEventListener("keydown", actionButtonKeydownHandler);
  actionButton.addEventListener("keyup", actionButtonKeyupHandler);

  const toggleButton = document.getElementById("toggle");
  toggleButton.addEventListener("click", toggleButtonClickHandler);
  toggleButton.addEventListener("keydown", toggleButtonKeydownHandler);
  toggleButton.addEventListener("keyup", toggleButtonKeyupHandler);
}

function actionButtonKeydownHandler(event) {
  // The action button is activated by space on the keyup event, but the
  // default action for space is already triggered on keydown. It needs to be
  // prevented to stop scrolling the page before activating the button.
  if (event.key === " ") {
    event.preventDefault();
  }
  // If enter is pressed, activate the button
  else if (event.key === "Enter") {
    event.preventDefault();
    activateActionButton();
  }
}

/**
 * Activates the action button with the space key.
 */
function actionButtonKeyupHandler(event) {
  if (event.key === " ") {
    event.preventDefault();
    activateActionButton();
  }
}

function activateActionButton() {
  window.print();
}

/**
 * Toggles the toggle button’s state if it’s actually a button element or has
 * the `role` attribute set to `button`.
 */
function toggleButtonClickHandler(event) {
  if (
    event.currentTarget.tagName === "button" ||
    event.currentTarget.getAttribute("role") === "button"
  ) {
    toggleButtonState(event.currentTarget);
  }
}

/**
 * Toggles the toggle button’s state with the enter key.
 */
function toggleButtonKeydownHandler(event) {
  if (event.key === " ") {
    event.preventDefault();
  } else if (event.key === "Enter") {
    event.preventDefault();
    toggleButtonState(event.currentTarget);
  }
}

/**
 * Toggles the toggle button’s state with space key.
 */
function toggleButtonKeyupHandler(event) {
  if (event.key === " ") {
    event.preventDefault();
    toggleButtonState(event.currentTarget);
  }
}

/**
 * Toggles the toggle button’s state between *pressed* and *not pressed*.
 */
function toggleButtonState(button) {
  const isAriaPressed = button.getAttribute("aria-pressed") === "true";

  button.setAttribute("aria-pressed", isAriaPressed ? "false" : "true");

  const icon = button.querySelector("use");
  icon.setAttribute(
    "xlink:href",
    isAriaPressed ? ICON_SOUND_URL : ICON_MUTE_URL
  );
}

window.onload = init;
