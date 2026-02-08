import { css, html, Wrec } from "wrec";

/**
 * This is a counter web component implemented with wrec.
 */
class CounterWrec extends Wrec {
  static properties = {
    count: { doc: "initial value", type: Number, value: 0 },
  };

  static css = css`
    :host {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    button {
      background-color: lightgreen;
    }

    button:disabled {
      opacity: 0.8;
    }
  `;

  static html = html`
    <button onClick="this.count--" type="button" disabled="this.count === 0">
      -
    </button>
    <span>this.count</span>
    <button onClick="this.count++" type="button">+</button>
    <span>this.count < 10 ? "single" : "double"</span>-digit
  `;
}

CounterWrec.register();
