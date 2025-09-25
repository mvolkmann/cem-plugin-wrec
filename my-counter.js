import Wrec from "wrec";

/**
 * This is a counter web component.
 */
class MyCounter extends Wrec {
  static properties = {
    count: { doc: "initial value", type: Number, reflect: true, value: 0 },
  };

  css() {
    return /*css*/ `
       .counter {
         display: flex;
         align-items: center;
         gap: 0.5rem;
       }

       button {
         background-color: lightgreen;
       }

       button:disabled {
         background-color: gray;
       }
     `;
  }

  html() {
    return /*html*/ `
      <div>
        <button onClick="decrement" type="button"
          disabled="this.count === 0">-</button>
        <span>this.count</span>
        <button onClick="this.count++" type="button">+</button>
        <span>(this.count < 10 ? "single" : "double") + " digit"</span>
      </div>
    `;
  }

  decrement() {
    if (this.count > 0) this.count--;
  }
}

MyCounter.register();
