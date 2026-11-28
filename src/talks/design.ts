export type TalkDesign = { theme: "dark-lime" | "paper" };

const designs = import.meta.glob<TalkDesign>("../content/talks/*/talk.ts", {
	eager: true,
	import: "default",
});

export function getTalkTheme(slug: string) {
	return designs[`../content/talks/${slug}/talk.ts`]?.theme ?? "dark-lime";
}
