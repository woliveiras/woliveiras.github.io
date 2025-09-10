import type { Element, Root } from "hast";
import type { Plugin } from "unified";
import { CONTINUE, visit } from "unist-util-visit";

// biome-ignore lint/suspicious/noExplicitAny: usage of 'any' required for dynamic data
const visitor = (node: any) => {
	const dataLanguageMermaid = "mermaid";
	const typeElement = "element";
	const tagNamePre = "pre";
	const classMermaid = dataLanguageMermaid;

	// biome-ignore lint/suspicious/noExplicitAny: usage of 'any' required for dynamic data
	const isPreElement = (node: any) =>
		// biome-ignore lint/correctness/useValidTypeof: false positive
		typeof node.type !== undefined &&
		node.type === typeElement &&
		node.tagName !== undefined &&
		node.tagName === tagNamePre &&
		node.properties !== undefined &&
		node.properties.dataLanguage === dataLanguageMermaid;

	if (!isPreElement(node)) {
		return CONTINUE;
	}

	const element = node as Element;
	const properties = element.properties;
	let className = properties.className;
	if (typeof className === "string") {
		className = [className];
	} else if (!Array.isArray(className)) {
		className = [];
	}
	properties.className = [...className, classMermaid];

	return CONTINUE;
};

const addMermaidClass: Plugin<undefined[], Root> = () => (ast: Root) =>
	visit(ast, visitor);

export default addMermaidClass;
