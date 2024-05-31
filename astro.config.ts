import markdoc from "@astrojs/markdoc";
import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import keystatic from "@keystatic/astro";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import { readFileSync } from "node:fs";

import { expressiveCodeOptions } from "./src/site.config";

// https://astro.build/config
export default defineConfig({
	adapter: netlify(),
	integrations: [
		expressiveCode(expressiveCodeOptions),
		icon(),
		tailwind({
			applyBaseStyles: false,
		}),
		sitemap(),
		mdx(),
		react(),
		markdoc({
			allowHTML: true,
		}),
		...(import.meta.env.PROD ? [] : [keystatic()]),
	],
	output: "hybrid",
	// https://docs.astro.build/en/guides/prefetch/
	prefetch: true,
	// ! Please remember to replace the following site property with your own domain
	site: "https://astrokeystatic.netlify.app/",
	vite: {
		plugins: [rawFonts([".ttf", ".woff"])],
	},
});
function rawFonts(ext: string[]) {
	return {
		name: "vite-plugin-raw-fonts",
		// @ts-expect-error:next-line
		transform(_, id) {
			// eslint-disable-next-line
			if (ext.some((e) => id.endsWith(e))) {
				// eslint-disable-next-line
				const buffer = readFileSync(id);
				return {
					code: `export default ${JSON.stringify(buffer)}`,
					map: null,
				};
			}
		},
	};
}
