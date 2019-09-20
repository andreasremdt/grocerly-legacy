import "./grocery-list.js";
import { parsePastedContent, sanitize } from "./utils/helpers.js";

(function() {
  "use strict";

  var form = document.querySelector("form"),
    groceryList = document.querySelector("grocery-list"),
    btnClearList = document.querySelector('[data-action="clear-list"]');

  function handlePaste(evt) {
    evt.preventDefault();

    var items = parsePastedContent(evt.clipboardData.getData("text"));

    items.forEach(item => {
      groceryList.add(item);
    });

    form.reset();
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();

    var { text, quantity, unit } = form;

    groceryList.add(sanitize({ text, quantity, unit }));

    form.reset();
    form.text.focus();
  }

  function handleListClear() {
    groceryList.clear();
  }

  form.addEventListener("submit", handleFormSubmit);
  form.addEventListener("paste", handlePaste);
  btnClearList.addEventListener("click", handleListClear);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
  }
})();
