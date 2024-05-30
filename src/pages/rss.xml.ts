import { getAllPosts } from "@/data/post";
import { siteConfig } from "@/site-config";
import rss from "@astrojs/rss";

export const GET = async () => {
	const posts = await getAllPosts();

	return rss({
		description: siteConfig.description,
		items: posts.map((post) => ({
			...(post.data.updatedDate
				? { customData: `<updated>${post.data.updatedDate}</updated>` }
				: {}),
			description: post.data.description,
			link: `posts/${post.slug}`,
			pubDate: post.data.publishedDate,
			title: post.data.title,
		})),
		site: import.meta.env.SITE,
		title: siteConfig.title,
	});
};
