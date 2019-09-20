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
    groceryList = document.querySelector("grocery-list"),
    btnClearList = document.querySelector('[data-action="clear-list"]');

  function handlePaste(evt) {
    evt.preventDefault();

    var data = evt.clipboardData.getData("text").split(/\n/g);
    if (data.length) {
      data.forEach(entry => {
        if (!entry.includes(":")) {
          groceryList.add({ text: entry });
        }
      });

      form.reset();
    }
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();

    var { text, quantity, unit } = form;

    groceryList.add({
      text: text.value,
      quantity: quantity.value,
      unit: unit.value
    });

    form.reset();
    form.text.focus();
  }

  function handleListClear() {
    groceryList.reset();
  }

  form.addEventListener("submit", handleFormSubmit);
  form.addEventListener("paste", handlePaste);
  btnClearList.addEventListener("click", handleListClear);
})();
