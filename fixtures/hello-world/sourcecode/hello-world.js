export class HelloWorld extends HTMLElement {
  static get observedAttributes() {
    return ["name"];
  }

  #name = "World";
  #p = document.createElement("p");

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.#p.textContent = `Hello, ${this.#name}!`;
    this.shadowRoot.replaceChild(this.#p);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attributeChangedCallback", name, oldValue, newValue);
    if (name === "name") {
      this.#name = newValue;
      this.#p.textContent = `Hello, ${this.#name}!`;
    }
  }
}

customElements.define("hello-world", HelloWorld);
