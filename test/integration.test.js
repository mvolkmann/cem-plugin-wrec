// This uses the uvu test runner at https://github.com/lukeed/uvu.
import { execSync } from "child_process";
import { readFileSync } from "fs";
import { test } from "uvu";
import * as assert from "uvu/assert";

test("CEM generation", () => {
  // .toString() is needed because execSync returns a Buffer.
  const output = execSync("cem analyze").toString();
  assert.ok(
    output.includes("@custom-elements-manifest/analyzer: Created new manifest"),
  );
  const cem = "custom-elements.json";
  const actual = readFileSync(cem, "utf-8");
  const expected = readFileSync(`./fixtures/expected-${cem}`, "utf-8");
  assert.is(
    actual,
    expected,
    `generated ${cem} does not have expected contents`,
  );
});

test.run();
