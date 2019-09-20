import { render, html } from "../node_modules/lit-html/lit-html.js";

class BaseElement extends HTMLElement {
  constructor() {
    super();

    this.state = {};
  }

  connectedCallback() {
    for (let key in this.state) {
      var data = localStorage.getItem(key);

      if (data) {
        try {
          this.setState({
            [key]: JSON.parse(data)
          });

          render(this.render(), this, { eventContext: this });
        } catch (ex) {
          console.warn(ex);
        }
      }
    }
  }

  setState(state, options = {}) {
    this.state = Object.assign({}, state);
    console.log(this.state);
    if (options.persist) {
      for (let key in state) {
        localStorage.setItem(key, JSON.stringify(state[key]));
      }
    }

    render(this.render(), this, { eventContext: this });
  }
}

export default BaseElement;
export { html };
