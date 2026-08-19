export interface MicrositeNavigationItem {
	label: string;
	href: string;
	external?: boolean;
}

export interface MicrositeTheme {
	accent: string;
	accentStrong: string;
	accentMuted: string;
	background: string;
	surface: string;
	text: string;
	mutedText: string;
	border: string;
}

export interface MicrositeDefinition {
	name: string;
	monogram: string;
	description: string;
	homeHref: string;
	ownerName: string;
	ownerHref: string;
	navigation: MicrositeNavigationItem[];
	theme: MicrositeTheme;
}
