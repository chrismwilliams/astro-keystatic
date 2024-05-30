import { collection, config, fields } from "@keystatic/core";

export default config({
	collections: {
		posts: collection({
			format: { contentField: "content" },
			label: "Posts",
			path: "src/content/posts/*",
			schema: {
				content: fields.markdoc({
					label: "Content",
					options: { image: { directory: "src/assets" } },
				}),
				description: fields.text({
					description: "SEO description of post",
					label: "Description",
					validation: { isRequired: true, length: { max: 160, min: 50 } },
				}),
				draft: fields.checkbox({
					defaultValue: false,
					description: "Set this post as draft to prevent it from being published",
					label: "Draft",
				}),
				publishedDate: fields.date({ label: "Published Date", validation: { isRequired: true } }),
				title: fields.slug({
					name: { label: "Title", validation: { isRequired: true, length: { max: 60 } } },
				}),
				updatedDate: fields.date({ label: "Updated Date" }),
			},
			slugField: "title",
		}),
	},
	storage: {
		kind: "local",
	},
});
