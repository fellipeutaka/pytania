import { cyanA, cyanDarkA } from "@radix-ui/colors";
import { createShadcnPreset, overrideShadcnTheme } from "mizuhara/plugins";
import type { Config } from "tailwindcss";
import { createPlugin } from "windy-radix-palette";

const colors = createPlugin();

const config: Config = {
  content: ["./src/{app,components}/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [colors.plugin],
  presets: [
    createShadcnPreset({
      theme: overrideShadcnTheme({
        light: {
          primary: cyanDarkA.cyanA9,
          primaryForeground: cyanA.cyanA12,
        },
        dark: {
          primary: cyanA.cyanA12,
          primaryForeground: cyanDarkA.cyanA9,
        },
      }),
    }),
  ],
};

export default config;
