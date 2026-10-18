import type { EmbedOption } from "../remark-embeds";
import ExcalidrawMatcher from "./matcher";

const ExcalidrawEmbed: EmbedOption = {
	componentName: "Excalidraw",
	urlArgument: "src",
	urlMatcher: ExcalidrawMatcher,
	directiveName: "excalidraw",
	importPath: "src/embeds",
};

export default ExcalidrawEmbed;
