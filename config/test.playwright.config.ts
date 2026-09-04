import { defineConfig, devices } from "@playwright/test";
import { baseConfig } from "../playwright.config";
import { EnvConfig } from "../tests/helpers/config-fixtures";
import path from "node:path";

export default defineConfig<EnvConfig>({
  ...baseConfig, //Loads all the existing config values..
  testDir: path.resolve(process.cwd(), "./tests"),

  use: {
    ...baseConfig.use, //Loading all the existing use object
    envName: "test",
    appURL: "https://katalon-demo-cura.herokuapp.com/",
    dbConfig: {
      server: "",
      dbname: "",
      connectionStr: "",
    },
  },
});
