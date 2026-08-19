import type { MicrositeDefinition } from "./types";

export const baselineSite: MicrositeDefinition = {
	name: "Baseline",
	monogram: "B_",
	description:
		"The portable minimum for disciplined, proportional software engineering with coding agents.",
	homeHref: "/baseline/",
	ownerName: "William Oliveira",
	ownerHref: "/",
	navigation: [
		{ label: "Overview", href: "/baseline/" },
		{ label: "Skills", href: "/baseline/skills/" },
		{ label: "Methodology", href: "/baseline/methodology/" },
		{ label: "Install", href: "/baseline/install/" },
		{
			label: "GitHub",
			href: "https://github.com/woliveiras/baseline",
			external: true,
		},
	],
	theme: {
		accent: "#8af5b5",
		accentStrong: "#b8ffd2",
		accentMuted: "rgba(138, 245, 181, 0.1)",
		background: "#070a09",
		surface: "#0d1210",
		text: "#f1f7f3",
		mutedText: "#9ba8a0",
		border: "#202923",
	},
};
