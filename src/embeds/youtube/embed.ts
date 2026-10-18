import type { EmbedOption } from "../remark-embeds";
import YoutubeMatcher from "./matcher";

const YoutubeEmbed: EmbedOption = {
	componentName: "YouTube",
	urlArgument: "id",
	urlMatcher: YoutubeMatcher,
	directiveName: "youtube",
	importPath: "src/embeds",
};

export default YoutubeEmbed;
