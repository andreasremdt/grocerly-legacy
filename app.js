/*
Watermelon Smoothie Bowl
300 g (2 cups) strawberry, stems removed
65 g (⅓ cup) banana, sliced
230 g (1 ½ cup) watermelon, peeled and cubed
60 mL (¼ cup) coconut water
215 g (1 cup) ice
Toppings:
kiwi
mango
pomegranate seeds
*/

import "./js/grocery-list.js";

(function() {
  "use strict";

  var form = document.querySelector("form"),
      toggle = document.querySelector('[data-action="menu-toggle"]'),
      groceryList = document.querySelector("grocery-list");

  function handlePaste(evt) {
    evt.preventDefault();

    var data = evt.clipboardData.getData("text").split(/\n/g);

    if (data.length) {
      data.forEach(entry => {
        if (!entry.includes(":")) {
          groceryList.add(entry)
        }
      });

      form.reset();
    }
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();

    var { text, quantity, unit } = form;
    
    groceryList.add({ text: text.value, quantity: quantity.value, unit: unit.value });

    form.reset();
    form.text.focus();
  }

  function handleMenuToggle(evt) {
    var target = document.querySelector(evt.target.dataset.target);

    if (target) {
      target.classList.toggle("-visible");
    }
  }

  form.addEventListener("submit", handleFormSubmit);
  form.addEventListener("paste", handlePaste);
  toggle.addEventListener("click", handleMenuToggle);
})();

