const stages = [
	{ percent: 61, en: "Implementation", "pt-BR": "Implementação", es: "Implementación" },
	{ percent: 5, en: "Requirements", "pt-BR": "Requisitos", es: "Requisitos" },
	{ percent: 3, en: "Design", "pt-BR": "Design", es: "Diseño" },
];

export function benchmarkData(lang: "en" | "pt-BR" | "es") {
	const percent = new Intl.NumberFormat(lang, { style: "percent" });
	return stages.map((stage) => ({
		label: stage[lang],
		value: stage.percent,
		displayValue: percent.format(stage.percent / 100),
	}));
}
