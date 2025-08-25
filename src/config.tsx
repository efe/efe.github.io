import { DiscordIcon } from "@/components/icons/discord";
import { GithubIcon } from "@/components/icons/github";
import { LinkedInIcon } from "@/components/icons/linkedin";
import { TwitchIcon } from "@/components/icons/twitch";
import { MastodonIcon } from "@/components/icons/mastodon";
import { YouTubeIcon } from "@/components/icons/youtube";
import type React from "react";

export type Image = {
	src: string;
	alt?: string;
	caption?: string;
};

export type Social = {
	platform: string;
	link: string;
	icon: React.ReactNode;
};

export type Category = {
	title: string;
	page: string | undefined;
	href: string;
};

export type Meta = {
	title: string;
	description: string;
	image: Image;
};

export type SiteConfig = {
	meta: Meta;
	name: string;
	headshot: string;
	title: string;
	description: string;
	socials: Array<Social>;
	categories: Array<Category>;
};

export const CONFIG: SiteConfig = {
	meta: {
		title: "Efe Öge",
		description: "Tech Tales from a Software Craftsman",
		image: {
			src: "/headshot.jpg",
			alt: "Efe Öge",
		},
	},
	name: "Efe Öge",
	headshot: "/headshot.jpg",
	title: "Software Engineer",
	description: `I'm a software developer currently living in the Netherlands. I specialize in building and deploying web applications, ensuring the delivery of high-quality, scalable and maintainable software products with 'boring technology'. I mainly develop with Python & Javascript. I'm a co-organizer of PyIstanbul and PyCon Turkey.`,
	socials: [
		{
			platform: "GitHub",
			link: "https://github.com/efe",
			icon: <GithubIcon />,
		},
		{
			platform: "LinkedIn",
			link: "https://www.linkedin.com/in/efeoge",
			icon: <LinkedInIcon />,
		},
		{
			platform: "Mastodon",
			link: "https://mastodon.social/@efeoge",
			icon: <MastodonIcon />,
		},
		{
			platform: "YouTube",
			link: "https://www.youtube.com/playlist?list=PLIEF_o6_Vupr9T1xwskABFiMNtTyasDuw",
			icon: <YouTubeIcon />,
		},
	],
	categories: [
		{
			title: "All",
			page: undefined,
			href: "/posts",
		},
		{
			title: "Conference Talks",
			page: "conference-talks",
			href: "/posts/conference-talks",
		},
		{
			title: "Django",
			page: "django",
			href: "/posts/django",
		},
		{
			title: "Company Culture",
			page: "company-culture",
			href: "/posts/company-culture",
		},
		{
			title: "Career",
			page: "career",
			href: "/posts/career",
		},
		{
			title: "Book",
			page: "book",
			href: "/posts/book",
		},
	],
};
