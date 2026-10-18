import type { PhrasingContent, Root, RootContent } from "mdast";
import type { Directives } from "mdast-util-directive";
import type { MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx-jsx";
import type { MdxjsEsm } from "mdast-util-mdxjs-esm";
import type { Plugin } from "unified";
import { SKIP, visit } from "unist-util-visit";

export interface EmbedOption {
	componentName: string;
	importPath: string;
	urlArgument?: string;
	urlMatcher?: (url: string) => string | undefined | null;
	directiveName: string | string[];
}

function isDirective(
	node: Root | RootContent | PhrasingContent,
): node is Directives {
	return (
		node.type === "textDirective" ||
		node.type === "leafDirective" ||
		node.type === "containerDirective"
	);
}

const remarkEmbeds: Plugin<[{ embeds: EmbedOption[] }], Root> =
	({ embeds }) =>
	(tree, file) => {
		const isMdx = file.extname === ".mdx";
		const source = String(file);
		const findEmbed = (name: string) =>
			embeds.find(({ directiveName }) =>
				typeof directiveName === "string"
					? directiveName === name
					: directiveName.includes(name),
			);

		const imports = new Map<EmbedOption, string>();
		const reservedNames = new Set<string>();
		for (const node of tree.children) {
			if (node.type !== "mdxjsEsm") continue;
			for (const statement of node.data?.estree?.body ?? []) {
				if (statement.type === "ImportDeclaration") {
					for (const specifier of statement.specifiers)
						reservedNames.add(specifier.local.name);
				}
			}
		}

		function element(
			embed: EmbedOption,
			attributes: Record<string, string | null | undefined>,
			inline = false,
		): MdxJsxFlowElement | MdxJsxTextElement {
			let name = imports.get(embed);
			if (!name) {
				name = `BlogEmbed_${embed.componentName}`;
				while (reservedNames.has(name)) name += "_";
				reservedNames.add(name);
				imports.set(embed, name);
			}
			return {
				type: inline ? "mdxJsxTextElement" : "mdxJsxFlowElement",
				name,
				attributes: Object.entries(attributes).map(([name, value]) => ({
					type: "mdxJsxAttribute",
					name,
					value: value ?? "",
				})),
				children: [],
			};
		}

		function directive(node: Directives, inline = false) {
			const embed = findEmbed(node.name);
			if (!embed) return;
			const attributes = { ...node.attributes };
			const child = node.children.length === 1 ? node.children[0] : undefined;
			const label =
				child?.type === "text"
					? child.value
					: child?.type === "link" &&
							child.children.length === 1 &&
							child.children[0].type === "text"
						? child.url
						: undefined;
			if (label !== undefined) attributes[embed.urlArgument ?? "href"] = label;
			return element(embed, attributes, inline);
		}

		visit(tree, (node, index, parent) => {
			if (!parent || index === undefined) return;
			// Unknown colon sequences (gemma3:270m, arXiv:2605, 1:1) are prose.
			if (node.type === "textDirective" && (!isMdx || !findEmbed(node.name))) {
				const start = node.position?.start.offset;
				const end = node.position?.end.offset;
				if (start !== undefined && end !== undefined) {
					parent.children[index] = {
						type: "text",
						value: source.slice(start, end),
					};
				}
				return SKIP;
			}
			// Plain Markdown cannot import components.
			if (!isMdx) return;
			let replacement: MdxJsxFlowElement | MdxJsxTextElement | undefined;
			if (node.type === "paragraph" && node.children.length === 1) {
				const child = node.children[0];
				if (isDirective(child)) {
					replacement = directive(child);
				} else if (
					child.type === "link" &&
					child.url.startsWith("http") &&
					child.children.length === 1 &&
					child.children[0].type === "text" &&
					child.children[0].value === child.url
				) {
					for (const embed of embeds) {
						const value = embed.urlMatcher?.(child.url);
						if (!value) continue;
						replacement = element(embed, {
							[embed.urlArgument ?? "href"]: value,
						});
						break;
					}
				}
			} else if (isDirective(node)) {
				replacement = directive(node, node.type === "textDirective");
			}
			if (!replacement) return;
			parent.children[index] = replacement;
			return SKIP;
		});

		for (const [embed, name] of imports) {
			const declaration: MdxjsEsm = {
				type: "mdxjsEsm",
				value: `import { ${embed.componentName} as ${name} } from ${JSON.stringify(embed.importPath)};`,
				data: {
					estree: {
						type: "Program",
						sourceType: "module",
						body: [
							{
								type: "ImportDeclaration",
								attributes: [],
								source: { type: "Literal", value: embed.importPath },
								specifiers: [
									{
										type: "ImportSpecifier",
										imported: { type: "Identifier", name: embed.componentName },
										local: { type: "Identifier", name },
									},
								],
							},
						],
					},
				},
			};
			tree.children.unshift(declaration);
		}
	};

export default remarkEmbeds;
