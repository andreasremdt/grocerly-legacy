import BaseElement, { html } from "./base-element.js";

class GroceryList extends BaseElement {
  constructor() {
    super();

    this.state.items = [];
  }

  exists(text, quantity, unit) {
    return this.state.items.findIndex(item => {
      if (
        item.text.toLowerCase() === text.toLowerCase() &&
        item.unit === unit &&
        item.quantity === quantity
      ) {
        return true;
      }
    });
  }

  add({ text, quantity = null, unit }) {
    if (!text) {
      return;
    }

    var duplicate = this.exists(text, quantity, unit);

    if (~duplicate) {
      this.update(duplicate, { text, quantity, unit });
    } else {
      this.setState(
        {
          items: [...this.state.items, { text, quantity, unit, checked: false }]
        },
        { persist: true }
      );

      this.scrollTo({
        top: this.scrollHeight,
        behavior: "smooth"
      });
    }
  }

  reset() {
    this.setState({ items: [] });
  }

  update(index, ingredient) {
    var items = this.state.items;

    if (items[index].unit === ingredient.unit && ingredient.quantity) {
      items[index].quantity += parseInt(ingredient.quantity, 10);
    } else if (ingredient.quantity) {
      items.push(ingredient);
    }

    this.setState({ items }, { persist: true });
  }

  clear() {
    this.setState(
      {
        items: []
      },
      { persist: true }
    );
  }

  handleToggle(evt) {
    var position = parseInt(evt.target.closest("tr").dataset.index);

    this.setState(
      {
        items: this.state.items.map((item, index) => {
          if (index === position) {
            item.checked = !item.checked;
          }

          return item;
        })
      },
      { persist: true }
    );
  }

  handleDelete(evt) {
    var position = parseInt(evt.target.closest("tr").dataset.index);

    this.setState(
      {
        items: this.state.items.filter((item, index) => index !== position)
      },
      { persist: true }
    );
  }

  render() {
    if (!this.state.items.length) {
      return html`
        <div class="empty-message">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            class="icon"
          >
            <path
              fill="currentColor"
              d="M11 21c0-0.552-0.225-1.053-0.586-1.414s-0.862-0.586-1.414-0.586-1.053 0.225-1.414 0.586-0.586 0.862-0.586 1.414 0.225 1.053 0.586 1.414 0.862 0.586 1.414 0.586 1.053-0.225 1.414-0.586 0.586-0.862 0.586-1.414zM22 21c0-0.552-0.225-1.053-0.586-1.414s-0.862-0.586-1.414-0.586-1.053 0.225-1.414 0.586-0.586 0.862-0.586 1.414 0.225 1.053 0.586 1.414 0.862 0.586 1.414 0.586 1.053-0.225 1.414-0.586 0.586-0.862 0.586-1.414zM7.221 7h14.57l-1.371 7.191c-0.046 0.228-0.166 0.425-0.332 0.568-0.18 0.156-0.413 0.246-0.688 0.241h-9.734c-0.232 0.003-0.451-0.071-0.626-0.203-0.19-0.143-0.329-0.351-0.379-0.603zM1 2h3.18l0.848 4.239c0.108 0.437 0.502 0.761 0.972 0.761h1.221l-0.4-2h-0.821c-0.552 0-1 0.448-1 1 0 0.053 0.004 0.105 0.012 0.155 0.004 0.028 0.010 0.057 0.017 0.084l1.671 8.347c0.149 0.751 0.569 1.383 1.14 1.811 0.521 0.392 1.17 0.613 1.854 0.603h9.706c0.748 0.015 1.455-0.261 1.995-0.727 0.494-0.426 0.848-1.013 0.985-1.683l1.602-8.402c0.103-0.543-0.252-1.066-0.795-1.17-0.065-0.013-0.13-0.019-0.187-0.018h-16.18l-0.84-4.196c-0.094-0.462-0.497-0.804-0.98-0.804h-4c-0.552 0-1 0.448-1 1s0.448 1 1 1z"
            ></path>
          </svg>
          <h2 class="title">Nothing here yet.</h2>
          <p class="text">Add an item below or by pasting it into the app.</p>
        </div>
      `;
    }

    return html`
      <table class="grocery-list">
        <tbody>
          ${this.state.items.map(
            (item, index) => html`
              <tr data-index="${index}">
                <td
                  @click=${this.handleToggle}
                  class="${item.checked ? "checked" : ""}"
                >
                  ${item.quantity ? `${item.quantity} ${item.unit}` : ""}
                  ${item.text}
                </td>
                <td>
                  <button
                    class="remove"
                    @click=${this.handleDelete}
                    type="button"
                    aria-label="Remove item from list"
                  >
                    <svg role="img" viewBox="0 0 24 24" width="18" height="18">
                      <path
                        fill="currentColor"
                        d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"
                      ></path>
                    </svg>
                  </button>
                </td>
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }
}

customElements.define("grocery-list", GroceryList);
