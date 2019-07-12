import BaseElement, { html } from './base-element.js';

class GroceryList extends BaseElement {
  constructor() {
    super();

    this.state.items = [];
  }

  exists(search) {
    return this.state.items.findIndex((item) => {
      if (item.text.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
    });
  }

  add({ text, quantity = null, unit, checked = false }) {
    var duplicate = this.exists(text);

    if (~duplicate) {
      this.update(duplicate, arguments);
    } else {
      this.setState({
        items: [...this.state.items, { text, quantity: parseInt(quantity) || '', unit, checked }]
      }, { persist: true });
  
      this.scrollTo({
        top: this.scrollHeight,
        behavior: "smooth"
      });
    }

  }

  update(index, data) {
    this.setState({
      items: this.state.items.map((item, i) => {
        if (index === i) {
          if (item.unit === data[0].unit) {
            item.quantity += +data[0].quantity;
          }
        }

        return item;
      })
    }, { persist: true });
  }

  clear() {
    this.setState({
      items: []
    }, { persist: true });
  }

  handleToggle(evt) {
    var position = parseInt(evt.target.closest("tr").dataset.index);

    this.setState({
      items: this.state.items.map((item, index) => {
        if (index === position) {
          item.checked = !item.checked;
        }

        return item;
      })
    }, { persist: true });
  }

  handleDelete(evt) {
    var position = parseInt(evt.target.closest("tr").dataset.index);

    this.setState({
      items: this.state.items.filter((item, index) => index !== position)
    }, { persist: true });
  }

  name(item) {
    return (item.quantity && item.quantity + " " + item.unit) + " " + item.text;
  }

  get template() {
    return () => html`
      <table class="grocery-list">
        <tbody>
          ${this.state.items.map((item, index) => html`
            <tr data-index="${index}">
              <td @click=${this.handleToggle} class="${item.checked ? 'checked' : ''}">${this.name(item)}</td>
              <td>
                <button class="remove" @click=${this.handleDelete} type="button">&times;</button>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }
}

customElements.define("grocery-list", GroceryList);