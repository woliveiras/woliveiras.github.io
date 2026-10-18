import type { EmbedOption } from "../remark-embeds";
import LinkMatcher from "./matcher";

const LinkCardEmbed: EmbedOption = {
	componentName: "LinkCard",
	urlMatcher: LinkMatcher,
	directiveName: "link",
	importPath: "src/embeds",
};

export default LinkCardEmbed;
