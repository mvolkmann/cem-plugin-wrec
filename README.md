# cem-plugin-wrec

This is a Custom Elements Manifest (CEM) plugin
for the [wrec](https://github.com/mvolkmann/wrec) library.

## Installing

```bash
npm i -D @custom-elements-manifest/analyzer
npm i -D cem-plugin-wrec
```

## Configuring

Add the following scripts in your `package.json` file:

```json
"cem": "custom-elements-manifest analyze",
"cem:watch": "custom-elements-manifest analyze --watch",
```

Create the file `custom-elements-manifest.config.js` containing the following:

```js
import wrecPlugin from "cem-plugin-wrec";

export default {
  plugins: [wrecPlugin()],
};
```

## Supported syntax

This plugin supports web components implementing using the wrec library.
See the example component defined in `my-counter.js`.

## Expected output

Document an example of the expected output custom elements manifest

```diff
{
  "schemaVersion": "1.0.0",
  "readme": "",
  "modules": [
    {
      "kind": "javascript-module",
      "path": "src/my-element.js",
      "declarations": [
        {
          "kind": "class",
          "description": "This is a counter web component.",
          "name": "MyCounter",
          "members": [
            {
              "kind": "method",
              "name": "decrement"
            }
          ],
          "attributes": [
            {
              "default": 0,
              "description": "initial value",
              "fieldName": "count",
              "name": "count",
              "type": "Number"
            }
          ],
          "superclass": {
            "name": "Wrec",
            "package": "wrec"
          },
          "tagName": "my-counter",
          "customElement": true
        }
      ],
      "exports": [
        {
          "kind": "custom-element-definition",
          "name": "my-counter",
          "declaration": {
            "name": "MyCounter",
            "module": "src/my-element.js"
          }
        }
      ]
    }
  ]
}
```
