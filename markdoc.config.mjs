import { component, defineMarkdocConfig, nodes } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
	nodes: {
		document: {
			...nodes.document, // Apply defaults for other options
			render: null, // defaults to 'article'
		},
		fence: {
			attributes: {
				...nodes.fence.attributes,
				class: { render: "class", type: String },
				del: { render: "del", type: Array | Number },
				frame: { render: "frame", type: String },
				ins: { render: "ins", type: Array | Number },
				mark: { render: "mark", type: Array | Number },
				title: { render: "title", type: String },
			},
			render: component("./src/components/Code.astro"),
		},
	},
});
