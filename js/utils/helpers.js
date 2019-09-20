export function sanitize({ text, quantity, unit }) {
  var sanitized = {};

  if (text.value) {
    sanitized.text = text.value.trim();
  }

  if (quantity.value) {
    sanitized.quantity = parseInt(quantity.value, 10);
  }

  if (["g", "kg", "ml", "l", "pieces"].includes(unit.value)) {
    sanitized.unit = unit.value;
  }

  return sanitized;
}

export function parsePastedContent(data) {
  return data
    .split(/\n/g)
    .map(item => {
      var quantityAndUnit = item.match(/\d+\s?(g|ml|l|kg)/gi);

      if (quantityAndUnit) {
        var [quantity, unit] = quantityAndUnit[0].split(/(g|ml|l|kg)/i, 2);

        return {
          quantity: +quantity,
          unit: unit.toLowerCase(),
          text: item
            .substr(quantityAndUnit[0].length)
            .replace(/\(.+\)/gi, "")
            .trim()
        };
      } else if (!item.includes(":")) {
        return {
          text: item,
          quantity: null,
          unit: null
        };
      }
    })
    .filter(item => typeof item === "object");
}
