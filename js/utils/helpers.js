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
