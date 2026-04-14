import colors from "tailwindcss/colors";
import plugin from "tailwindcss/plugin";
import { ACCENT_COLOR, BASE_COLOR } from "./src/config.json";

/** @type {import('tailwindcss').Config} */
export default {
	theme: {
		extend: {
			colors: {
				accent: colors[ACCENT_COLOR.toLowerCase()],
				base: colors[BASE_COLOR.toLowerCase()],
			},
			typography: {
				DEFAULT: {
					css: {
						"code::before": {
							content: "none",
						},
						"code::after": {
							content: "none",
						},
						"blockquote p:first-of-type::before": {
							content: "none",
						},
						"blockquote p:first-of-type::after": {
							content: "none",
						},
					},
				},
			},
		},
	},
	plugins: [
		plugin(({ addVariant }) => {
			addVariant(
				"prose-inline-code",
				'&.prose :where(:not(pre)>code):not(:where([class~="not-prose"] *))',
			);
		}),
	],
};
