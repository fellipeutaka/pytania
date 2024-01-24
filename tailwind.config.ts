import { cyanA, cyanDarkA } from "@radix-ui/colors";
import typography from "@tailwindcss/typography";
import { createShadcnPreset, overrideShadcnTheme } from "mizuhara/plugins";
import type { Config } from "tailwindcss";
import { createPlugin } from "windy-radix-palette";

const colors = createPlugin();

const config: Config = {
  content: ["./src/{app,components}/**/*.tsx"],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap, 1rem)))" },
        },
      },
      animation: {
        marquee: "marquee var(--duration, 20s) linear infinite",
      },
    },
  },
  plugins: [colors.plugin, typography],
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
