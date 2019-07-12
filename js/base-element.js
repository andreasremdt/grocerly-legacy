import { render, html } from '../node_modules/lit-html/lit-html.js';

class BaseElement extends HTMLElement {
  constructor() {
    super();

    this.state = {};
  }

  connectedCallback() {
    var hasRendered = false;

    for (let key in this.state) {
      var data = localStorage.getItem(key);

      if (data) {
        try {
          this.setState({
            [key]: JSON.parse(data)
          });

          hasRendered = true;
        } catch(ex) {
          console.warn(ex);
        }
      }
    }

    if (!hasRendered) {
      this.render();
    }
  }

  setState(state, options = {}) {
    this.state = state;

    if (options.persist) {
      for (let key in state) {
        localStorage.setItem(key, JSON.stringify(state[key]));
      }
    }

    this.render();
  }

  render() {
    render(this.template(), this, { eventContext: this });
  }
}

export default BaseElement;
export { html };