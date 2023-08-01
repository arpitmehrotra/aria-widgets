"use strict";

/* Get button element */
window.addEventListener("load", function () {
  const button = document.getElementById("alert-trigger");
  /* Add click event listener */
  button.addEventListener("click", addAlert);
});

/* Click event handler */
function addAlert() {
  const example = document.getElementById("example");
  const template = document.getElementById("alert-template").innerHTML;
  example.innerHTML = template;
}
