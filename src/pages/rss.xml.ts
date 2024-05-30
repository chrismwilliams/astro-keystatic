import { getAllPosts } from "@/data/post";
import { siteConfig } from "@/site-config";
import rss from "@astrojs/rss";

export const GET = async () => {
	const posts = await getAllPosts();

	return rss({
		description: siteConfig.description,
		items: posts.map((post) => ({
			...(post.updatedDate ? { customData: `<updated>${post.updatedDate}</updated>` } : {}),
			description: post.description,
			link: `posts/${post.slug}`,
			pubDate: post.publishedDate,
			title: post.title,
		})),
		site: import.meta.env.SITE,
		title: siteConfig.title,
	});
};
