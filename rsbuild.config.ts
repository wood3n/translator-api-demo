import { defineConfig } from "@rsbuild/core";
import { pluginBasicSsl } from "@rsbuild/plugin-basic-ssl";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSvgr } from "@rsbuild/plugin-svgr";

export default defineConfig({
  plugins: [pluginReact(), pluginSvgr(), pluginBasicSsl()],
  html: {
    favicon: "./public/favicon.svg",
    title: "Translator API Dem"
  }
});
