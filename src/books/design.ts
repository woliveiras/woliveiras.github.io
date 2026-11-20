import type { ImageMetadata } from "astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

type BookPalette = {
	paper: string;
	ink: string;
	muted: string;
	accent: string;
	rule: string;
};

type BookTheme = {
	light?: Partial<BookPalette>;
	dark?: Partial<BookPalette>;
	fontFamily?: string;
};

type BookCover =
	| { image: ImageMetadata; alt: string; artwork?: never }
	| { artwork: AstroComponentFactory; image?: never; alt?: never };

export type BookDefinition = {
	title: string;
	author: string;
	path: `/books/${string}/`;
	description: string;
	published?: boolean;
	parts?: readonly { number: number; title: string; description: string }[];
	license?: { name: string; href: string };
	theme?: BookTheme;
	cover?: BookCover;
	share?: {
		subtitle?: string;
		image?: { file: `src/books/cards/${string}.png`; alt: string };
	};
};

export function isBookAvailable(book: BookDefinition, mode: string) {
	return book.published === true || mode === "book-preview";
}

export function bookShareImagePath(path: BookDefinition["path"]) {
	return `/open-graph${path.slice(0, -1)}.png`;
}
