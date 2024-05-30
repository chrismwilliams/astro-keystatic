import type { APIContext, InferGetStaticPropsType } from "astro";

import { getAllPosts } from "@/data/post";
import { siteConfig } from "@/site-config";
import { getFormattedDate } from "@/utils";
import { ImageResponse } from "@vercel/og";

const html = (title: string, pubDate: string) => ({
	props: {
		children: [
			{
				props: {
					children: [
						{
							props: {
								children: pubDate,
								tw: "text-2xl mb-6",
							},
							type: "p",
						},
						{
							props: {
								children: title,
								tw: "text-6xl font-bold leading-snug text-white",
							},
							type: "h1",
						},
					],
					tw: "flex flex-col flex-1 w-full p-10 justify-center",
				},
				type: "div",
			},
			{
				props: {
					children: [
						{
							props: {
								children: `By ${siteConfig.author}`,
							},
							type: "p",
						},
					],
					tw: "flex items-center gap-4 p-10 text-xl",
				},
				type: "div",
			},
		],
		tw: "flex flex-col w-full h-full bg-[#0E0E0E] text-[#ffffff]",
	},
	type: "div",
});

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export function GET(context: APIContext) {
	const { pubDate, title } = context.props as Props;

	const postDate = getFormattedDate(pubDate, {
		month: "long",
		weekday: "long",
	});
	// @ts-expect-error next-line missing key
	return new ImageResponse(html(title, postDate), {
		// debug: true,
		height: 630,
		width: 1200,
	});
}

export async function getStaticPaths() {
	const posts = await getAllPosts();
	return posts.map((post) => ({
		params: { slug: post.slug },
		props: {
			pubDate: post.updatedDate ?? post.publishedDate,
			title: post.title,
		},
	}));
}
