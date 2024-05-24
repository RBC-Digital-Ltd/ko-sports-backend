import { configure, processCLIArgs, run } from "@japa/runner";
import { expect } from "@japa/expect";

processCLIArgs(process.argv.splice(2));
configure({
  files: ["**/*.test.ts"],
  plugins: [expect()],
});

run();
