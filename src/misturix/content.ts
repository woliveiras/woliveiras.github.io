export const locales = ["pt-BR", "en", "es", "it"] as const;
export type Locale = (typeof locales)[number];
export const contact = {
	label: "contact@woliveiras.com",
	href: "mailto:contact@woliveiras.com",
};
export const updated = "2026-09-17";
export const githubPrivacy =
	"https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement";
export const googlePrivacy = "https://policies.google.com/privacy";

interface Copy {
	name: string;
	path: string;
	privacyPath: string;
	title: string;
	description: string;
	nav: [string, string, string];
	languageLabel: string;
	skip: string;
	back: string;
	eyebrow: string;
	headline: [string, string];
	intro: string;
	cta: string;
	status: string;
	gameLanguage: string;
	plateNote: string;
	artAlt: string;
	storyLabel: string;
	storyTitle: string;
	story: string[];
	gameplayLabel: string;
	gameplayTitle: string;
	steps: { title: string; text: string }[];
	galleryTitle: string;
	galleryNote: string;
	screenshots: { title: string; text: string; alt: string }[];
	invitation: string;
	invitationText: string;
	contact: string;
	footer: string;
	privacy: {
		title: string;
		description: string;
		date: string;
		intro: string;
		summary: string;
		sections: { title: string; paragraphs: string[] }[];
		providers: string;
		github: string;
		google: string;
		contactTitle: string;
		contactText: string;
	};
}

export const copy: Record<Locale, Copy> = {
	"pt-BR": {
		name: "Português",
		path: "/misturix/",
		privacyPath: "/misturix/privacidade/",
		title: "Misturix · Um gostinho de casa",
		description:
			"Um jogo de combinar ingredientes em homenagem à cultura brasileira, às comidas que amamos e à saudade de casa. Conheça o Misturix.",
		nav: ["O jogo", "Como jogar", "Na tela"],
		languageLabel: "Idioma",
		skip: "Pular para o conteúdo",
		back: "Voltar ao jogo",
		eyebrow: "Um jogo. Muitas lembranças à mesa.",
		headline: ["Um gostinho", "de casa."],
		intro:
			"Tem comida que aproxima, mesmo quando estamos longe. Misturix é uma homenagem à cultura brasileira e aos sabores que levamos com a gente.",
		cta: "Conheça o jogo",
		status: "Chegando ao Google Play",
		gameLanguage:
			"Capturas da versão em português do Brasil. Site disponível em quatro idiomas.",
		plateNote: "Feijoada, pudim, bolinho de chuva…",
		artAlt: "Ilustrações do jogo de feijoada, pudim e bolinhos de chuva",
		storyLabel: "Feito de comida e memória",
		storyTitle: "A saudade também tem sabor.",
		story: [
			"O brigadeiro de festa. A feijoada que reúne gente à mesa. O bolinho de chuva que pede uma pausa. A comida brasileira carrega histórias, sotaques e jeitos de cuidar.",
			"Misturix transforma esse carinho em um jogo de combinar ingredientes. Uma homenagem às comidas de que tanto gostamos e das quais sentimos falta quando estamos longe de casa. E um convite para quem ainda está descobrindo esses sabores.",
		],
		gameplayLabel: "Bora misturar?",
		gameplayTitle: "Da feira para o caderno de receitas.",
		steps: [
			{
				title: "Combine ingredientes",
				text: "Troque peças vizinhas e forme combinações de três ou mais. Cumpra os objetivos antes de acabar as jogadas.",
			},
			{
				title: "Conquiste receitas",
				text: "Avance pelas missões do caderno e descubra 80 pratos brasileiros. Cada receita conquistada abre caminho para a próxima.",
			},
			{
				title: "Leve um pouco do Brasil",
				text: "Resgate animais para o Quintal, descubra tesouros culturais e compartilhe suas conquistas quando quiser.",
			},
		],
		galleryTitle: "Um passeio pelo Misturix.",
		galleryNote: "Capturas reais do jogo. Versão em português do Brasil.",
		screenshots: [
			{
				title: "A partida",
				text: "Ingredientes, combinações e uma missão por vez.",
				alt: "Partida de Misturix com tabuleiro de ingredientes e objetivos",
			},
			{
				title: "Seu caminho",
				text: "O caderno acompanha cada passo da campanha.",
				alt: "Caderno de campanha do Misturix com a progressão das missões",
			},
			{
				title: "As receitas",
				text: "Pratos que fazem parte da nossa memória.",
				alt: "Tela de conquista de uma receita brasileira no Misturix",
			},
			{
				title: "A conquista",
				text: "Uma vitória com sabor de próxima receita.",
				alt: "Tela de resultado de uma missão do Misturix",
			},
		],
		invitation: "Pode chegar. A mesa é nossa.",
		invitationText:
			"O Misturix está em preparação para o Google Play. Enquanto isso, conheça o projeto e fale com quem está fazendo o jogo.",
		contact: "Fale com o William",
		footer: "Um jogo de William Oliveira, em homenagem à cultura brasileira.",
		privacy: {
			title: "Política de privacidade",
			description:
				"Como o Misturix trata o progresso salvo, o apelido opcional e o compartilhamento de conquistas.",
			date: "Atualizada em 17 de setembro de 2026",
			intro:
				"Esta política descreve o jogo Misturix para Android (com.woliveiras.misturix) e estas páginas de apresentação. O responsável pelo projeto é William Oliveira.",
			summary:
				"O Misturix funciona offline. Seu progresso fica no aparelho. O jogo não tem cadastro, anúncios, rastreamento de uso ou servidor para receber seus dados de partida.",
			sections: [
				{
					title: "O que fica no aparelho",
					paragraphs: [
						"O jogo salva progresso das missões, receitas e coleções conquistadas, moedas do jogo, personalizações, recordes e a partida em andamento. Também guarda suas preferências de som, vibração e movimento, além de um apelido opcional escolhido por você.",
						"Essas informações são usadas para continuar a partida e manter suas escolhas. Ficam no armazenamento local do aplicativo, com cópias locais de recuperação. O desenvolvedor não as recebe. Não há sincronização de progresso em um serviço de nuvem do Misturix.",
					],
				},
				{
					title: "Quando você compartilha",
					paragraphs: [
						"O compartilhamento só acontece por sua iniciativa. O jogo prepara uma imagem e um texto com o recorde ou a conquista e, se você definiu um apelido, pode incluí-lo no cartão. O Android abre o seletor para você escolher outro aplicativo.",
						"O aplicativo escolhido recebe o cartão e o texto, não o arquivo de progresso. O uso posterior desse conteúdo segue a política do serviço que você escolheu. Evite usar nome completo ou outras informações pessoais no apelido se não quiser divulgá-las.",
						"Os cartões preparados ficam localmente no aplicativo. Ao preparar um novo compartilhamento, o Misturix remove os cartões locais gerados há mais de sete dias. Cópias que você já enviou ou salvou em outro aplicativo não são apagadas por essa limpeza.",
					],
				},
				{
					title: "Permissões e serviços do Android",
					paragraphs: [
						"O jogo usa a vibração para dar retorno às suas ações, quando essa opção está ligada. Não pede acesso à localização, aos contatos, à câmera ou ao microfone. A configuração Android atual não solicita permissão de internet.",
						"O Android, o Google Play e os aplicativos usados para compartilhar podem tratar informações segundo suas próprias configurações e políticas. Eventuais recursos de backup do aparelho também são controlados pelo sistema; o Misturix não opera um serviço próprio de backup em nuvem.",
					],
				},
				{
					title: "Por quanto tempo os dados ficam salvos",
					paragraphs: [
						"O progresso e as preferências permanecem no aparelho enquanto os dados do aplicativo forem mantidos. Para apagá-los, use as configurações do Android: Aplicativos → Misturix → Armazenamento → Limpar dados. Os nomes podem variar conforme o aparelho. Isso apaga o progresso local.",
						"A desinstalação normalmente remove os dados locais. Backups do sistema e cópias de cartões compartilhados devem ser gerenciados nos respectivos serviços. Como o desenvolvedor não recebe seu progresso, não pode recuperá-lo ou apagá-lo remotamente.",
					],
				},
				{
					title: "Estas páginas na internet",
					paragraphs: [
						"As páginas do Misturix não incluem ferramentas próprias de análise de visitas, publicidade, formulários ou cookies de rastreamento. Fontes e imagens são servidas pelo próprio site.",
						"O site é hospedado no GitHub Pages. Ao acessar uma página, o provedor pode processar dados técnicos da conexão, como endereço IP, para prestar e proteger o serviço. Isso é separado dos dados locais do jogo. Links externos seguem as políticas dos respectivos sites.",
					],
				},
				{
					title: "Contato e mudanças nesta política",
					paragraphs: [
						"Se você entrar em contato, as informações que decidir enviar serão usadas para responder à solicitação. Não envie dados sensíveis nem publique seu arquivo de progresso em uma conversa pública. Questões sobre privacidade ou exclusão de informações enviadas ao desenvolvedor podem ser encaminhadas pelo contato abaixo.",
						"O jogo não exibe publicidade. Esta política será atualizada se a forma de tratar dados mudar. A data no início indica a revisão mais recente.",
					],
				},
			],
			providers: "Políticas dos serviços citados",
			github: "Privacidade do GitHub",
			google: "Privacidade do Google",
			contactTitle: "Contato de privacidade",
			contactText: "William Oliveira · responsável pelo Misturix",
		},
	},
	en: {
		name: "English",
		path: "/misturix/en/",
		privacyPath: "/misturix/en/privacy/",
		title: "Misturix · A little taste of home",
		description:
			"A match-three game celebrating Brazilian culture, the food we love and the flavors we miss when we are far from home. Meet Misturix.",
		nav: ["The game", "How to play", "Screenshots"],
		languageLabel: "Language",
		skip: "Skip to content",
		back: "Back to the game",
		eyebrow: "A game full of memories around the table.",
		headline: ["A little taste", "of home."],
		intro:
			"Some food makes home feel closer, wherever we are. Misturix is a tribute to Brazilian culture and the flavors we carry with us.",
		cta: "Meet the game",
		status: "Coming to Google Play",
		gameLanguage:
			"Screenshots show the Brazilian Portuguese version. This site is available in four languages.",
		plateNote: "Feijoada, pudim, bolinho de chuva…",
		artAlt:
			"Game illustrations of Brazilian bean stew, caramel flan and sweet fritters",
		storyLabel: "Food, memory and a little saudade",
		storyTitle: "Missing home has a flavor, too.",
		story: [
			"Brigadeiro at a birthday party. A pot of feijoada bringing everyone to the table. Bolinho de chuva, little sweet fritters, with an afternoon break. Brazilian food carries stories, regional voices and ways of caring for each other.",
			"Misturix turns that affection into a game of matching ingredients. It celebrates the food we love and miss when we are far from home. And it welcomes anyone discovering those flavors for the first time.",
		],
		gameplayLabel: "Let's mix things up",
		gameplayTitle: "From the market to the recipe book.",
		steps: [
			{
				title: "Match ingredients",
				text: "Swap neighboring pieces and match three or more. Complete the objectives before you run out of moves.",
			},
			{
				title: "Discover recipes",
				text: "Work through the recipe book's missions and discover 80 Brazilian dishes. Each completed recipe opens the way to the next.",
			},
			{
				title: "Keep a little of Brazil",
				text: "Rescue animals for the backyard, discover cultural treasures and share your achievements whenever you choose.",
			},
		],
		galleryTitle: "A look inside Misturix.",
		galleryNote: "Actual game screenshots. Brazilian Portuguese version.",
		screenshots: [
			{
				title: "The puzzle",
				text: "Ingredients, combinations and one mission at a time.",
				alt: "Misturix puzzle with an ingredient board and mission objectives",
			},
			{
				title: "Your progress",
				text: "The recipe book keeps track of your campaign.",
				alt: "Misturix recipe book showing campaign mission progress",
			},
			{
				title: "The recipes",
				text: "Dishes that bring memories back to the table.",
				alt: "A Brazilian recipe unlocked in Misturix",
			},
			{
				title: "The achievement",
				text: "One win closer to the next recipe.",
				alt: "Misturix mission result screen",
			},
		],
		invitation: "Come on in. There's room at the table.",
		invitationText:
			"Misturix is getting ready for Google Play. In the meantime, meet the project and get in touch with the person making the game.",
		contact: "Say hello to William",
		footer: "A game by William Oliveira, celebrating Brazilian culture.",
		privacy: {
			title: "Privacy policy",
			description:
				"How Misturix handles saved progress, your optional nickname and achievement sharing.",
			date: "Updated September 17, 2026",
			intro:
				"This policy covers the Misturix Android game (com.woliveiras.misturix) and these presentation pages. William Oliveira is responsible for the project.",
			summary:
				"Misturix works offline. Your progress stays on your device. The game has no account registration, ads, usage tracking or server that receives your gameplay data.",
			sections: [
				{
					title: "What stays on your device",
					paragraphs: [
						"The game saves mission progress, unlocked recipes and collections, in-game coins, customizations, high scores and your current game. It also stores your sound, vibration and motion preferences, plus an optional nickname you choose.",
						"This information lets you resume playing and keeps your choices. It stays in the app's local storage, with local recovery copies. The developer does not receive it. Misturix does not sync progress through its own cloud service.",
					],
				},
				{
					title: "When you choose to share",
					paragraphs: [
						"Sharing only starts when you request it. The game creates an image and text with your score or achievement. If you have set a nickname, it may appear on the card. Android opens its share chooser so you can select another app.",
						"The selected app receives the card and text, not your saved progress file. Further use follows the policy of the service you choose. Avoid using your full name or personal information as a nickname if you do not want to make it public.",
						"Prepared cards are stored locally in the app. When preparing a new share, Misturix removes generated local cards older than seven days. Copies already sent or saved in another app are not removed by this cleanup.",
					],
				},
				{
					title: "Android permissions and services",
					paragraphs: [
						"The game uses vibration to respond to your actions when you enable that option. It does not request location, contacts, camera or microphone access. The current Android configuration does not request internet permission.",
						"Android, Google Play and apps used for sharing may process information under their own settings and policies. Device backup features are also controlled by the operating system; Misturix does not run its own cloud backup service.",
					],
				},
				{
					title: "Retention and deletion",
					paragraphs: [
						"Progress and preferences remain on your device while the app's data is kept. To delete them, open Android settings: Apps → Misturix → Storage → Clear data. Labels vary by device. This erases your local progress.",
						"Uninstalling normally removes local app data. Manage system backups and shared-card copies with the relevant services. Because the developer does not receive your progress, they cannot restore or delete it remotely.",
					],
				},
				{
					title: "These web pages",
					paragraphs: [
						"The Misturix pages do not include our own visit analytics, advertising, forms or tracking cookies. Fonts and images are served by this site.",
						"The site is hosted on GitHub Pages. When you visit a page, the hosting provider may process technical connection data, such as your IP address, to deliver and protect the service. This is separate from the game's local data. External links follow the policies of their respective sites.",
					],
				},
				{
					title: "Contact and policy changes",
					paragraphs: [
						"If you contact us, the information you choose to send will be used to respond to your request. Do not send sensitive data or post your saved progress file in a public conversation. You can use the contact below for privacy questions or requests to delete information you sent to the developer.",
						"The game does not display advertising. This policy will be updated if data handling changes. The date at the top shows its latest revision.",
					],
				},
			],
			providers: "Policies of the services mentioned",
			github: "GitHub privacy",
			google: "Google privacy",
			contactTitle: "Privacy contact",
			contactText: "William Oliveira · Misturix developer",
		},
	},
	es: {
		name: "Español",
		path: "/misturix/es/",
		privacyPath: "/misturix/es/privacidad/",
		title: "Misturix · Un sabor que sabe a casa",
		description:
			"Un juego de combinar ingredientes que homenajea la cultura brasileña, la comida que nos encanta y los sabores que echamos de menos lejos de casa.",
		nav: ["El juego", "Cómo jugar", "Capturas"],
		languageLabel: "Idioma",
		skip: "Ir al contenido",
		back: "Volver al juego",
		eyebrow: "Un juego. Muchos recuerdos alrededor de la mesa.",
		headline: ["Un sabor que", "sabe a casa."],
		intro:
			"Hay comidas que nos acercan a casa, aunque estemos lejos. Misturix es un homenaje a la cultura brasileña y a los sabores que llevamos con nosotros.",
		cta: "Conoce el juego",
		status: "Próximamente en Google Play",
		gameLanguage:
			"Las capturas muestran la versión en portugués de Brasil. Esta web está disponible en cuatro idiomas.",
		plateNote: "Feijoada, pudim, bolinho de chuva…",
		artAlt: "Ilustraciones del juego de feijoada, flan y buñuelos brasileños",
		storyLabel: "Comida, recuerdos y saudade",
		storyTitle: "Echar de menos también tiene sabor.",
		story: [
			"El brigadeiro de los cumpleaños. La feijoada que reúne a todos en la mesa. El bolinho de chuva, un pequeño buñuelo dulce, para hacer una pausa por la tarde. La comida brasileña guarda historias, acentos y formas de cuidar.",
			"Misturix convierte ese cariño en un juego de combinar ingredientes. Un homenaje a las comidas que tanto nos gustan y echamos de menos cuando estamos lejos de casa. Y una invitación para quienes aún están descubriendo esos sabores.",
		],
		gameplayLabel: "Vamos a mezclar",
		gameplayTitle: "Del mercado al cuaderno de recetas.",
		steps: [
			{
				title: "Combina ingredientes",
				text: "Intercambia piezas vecinas y combina tres o más. Cumple los objetivos antes de quedarte sin movimientos.",
			},
			{
				title: "Descubre recetas",
				text: "Avanza por las misiones del cuaderno y descubre 80 platos brasileños. Cada receta conseguida abre paso a la siguiente.",
			},
			{
				title: "Llévate un poco de Brasil",
				text: "Rescata animales para el patio, descubre tesoros culturales y comparte tus logros cuando quieras.",
			},
		],
		galleryTitle: "Un paseo por Misturix.",
		galleryNote: "Capturas reales del juego. Versión en portugués de Brasil.",
		screenshots: [
			{
				title: "La partida",
				text: "Ingredientes, combinaciones y una misión cada vez.",
				alt: "Partida de Misturix con tablero de ingredientes y objetivos",
			},
			{
				title: "Tu camino",
				text: "El cuaderno acompaña cada paso de la campaña.",
				alt: "Cuaderno de Misturix con el progreso de las misiones",
			},
			{
				title: "Las recetas",
				text: "Platos que forman parte de nuestros recuerdos.",
				alt: "Pantalla de una receta brasileña conseguida en Misturix",
			},
			{
				title: "El logro",
				text: "Una victoria más cerca de la siguiente receta.",
				alt: "Pantalla de resultados de una misión de Misturix",
			},
		],
		invitation: "Pasa. Hay sitio en la mesa.",
		invitationText:
			"Misturix se está preparando para llegar a Google Play. Mientras tanto, conoce el proyecto y habla con quien está creando el juego.",
		contact: "Habla con William",
		footer: "Un juego de William Oliveira, en homenaje a la cultura brasileña.",
		privacy: {
			title: "Política de privacidad",
			description:
				"Cómo trata Misturix el progreso guardado, el apodo opcional y los logros que compartes.",
			date: "Actualizada el 17 de septiembre de 2026",
			intro:
				"Esta política se aplica al juego Misturix para Android (com.woliveiras.misturix) y a estas páginas de presentación. William Oliveira es el responsable del proyecto.",
			summary:
				"Misturix funciona sin conexión. Tu progreso permanece en tu dispositivo. El juego no tiene registro de cuentas, anuncios, seguimiento de uso ni un servidor que reciba los datos de tus partidas.",
			sections: [
				{
					title: "Qué se guarda en tu dispositivo",
					paragraphs: [
						"El juego guarda el progreso de las misiones, las recetas y colecciones conseguidas, las monedas del juego, las personalizaciones, los récords y la partida en curso. También guarda tus preferencias de sonido, vibración y movimiento, y un apodo opcional elegido por ti.",
						"Estos datos permiten continuar la partida y conservar tus elecciones. Permanecen en el almacenamiento local de la aplicación, con copias locales de recuperación. El desarrollador no los recibe. Misturix no sincroniza el progreso mediante un servicio propio en la nube.",
					],
				},
				{
					title: "Cuando decides compartir",
					paragraphs: [
						"Solo se comparte cuando tú lo solicitas. El juego prepara una imagen y un texto con tu récord o logro. Si has elegido un apodo, puede incluirlo en la tarjeta. Android abre su selector para que elijas otra aplicación.",
						"La aplicación elegida recibe la tarjeta y el texto, no el archivo de progreso. El uso posterior sigue la política del servicio que hayas elegido. Evita usar tu nombre completo u otros datos personales como apodo si no quieres hacerlos públicos.",
						"Las tarjetas preparadas se guardan localmente en la aplicación. Al preparar un nuevo envío, Misturix elimina las tarjetas locales generadas hace más de siete días. Esta limpieza no elimina las copias que ya hayas enviado o guardado en otra aplicación.",
					],
				},
				{
					title: "Permisos y servicios de Android",
					paragraphs: [
						"El juego utiliza la vibración para responder a tus acciones cuando activas esa opción. No solicita acceso a la ubicación, los contactos, la cámara ni el micrófono. La configuración actual de Android no solicita permiso de internet.",
						"Android, Google Play y las aplicaciones utilizadas para compartir pueden tratar información según sus propias configuraciones y políticas. Las copias de seguridad del dispositivo también dependen del sistema operativo; Misturix no gestiona un servicio propio de copias en la nube.",
					],
				},
				{
					title: "Conservación y eliminación",
					paragraphs: [
						"El progreso y las preferencias permanecen en el dispositivo mientras se conserven los datos de la aplicación. Para borrarlos, abre Ajustes de Android: Aplicaciones → Misturix → Almacenamiento → Borrar datos. Los nombres pueden variar según el dispositivo. Esto elimina tu progreso local.",
						"La desinstalación normalmente elimina los datos locales. Gestiona las copias de seguridad del sistema y las tarjetas compartidas en los servicios correspondientes. Como el desarrollador no recibe tu progreso, no puede recuperarlo ni eliminarlo a distancia.",
					],
				},
				{
					title: "Estas páginas web",
					paragraphs: [
						"Las páginas de Misturix no incluyen herramientas propias de análisis de visitas, publicidad, formularios ni cookies de seguimiento. Las fuentes y las imágenes se sirven desde este sitio.",
						"La web se aloja en GitHub Pages. Al visitar una página, el proveedor puede tratar datos técnicos de conexión, como tu dirección IP, para prestar y proteger el servicio. Esto es independiente de los datos locales del juego. Los enlaces externos siguen las políticas de sus respectivos sitios.",
					],
				},
				{
					title: "Contacto y cambios en esta política",
					paragraphs: [
						"Si contactas con nosotros, la información que decidas enviar se utilizará para responder a tu solicitud. No envíes datos sensibles ni publiques tu archivo de progreso en una conversación pública. Usa el contacto indicado abajo para preguntas de privacidad o para solicitar la eliminación de información enviada al desarrollador.",
						"El juego no muestra publicidad. Esta política se actualizará si cambia el tratamiento de los datos. La fecha del inicio indica la revisión más reciente.",
					],
				},
			],
			providers: "Políticas de los servicios mencionados",
			github: "Privacidad de GitHub",
			google: "Privacidad de Google",
			contactTitle: "Contacto de privacidad",
			contactText: "William Oliveira · responsable de Misturix",
		},
	},
	it: {
		name: "Italiano",
		path: "/misturix/it/",
		privacyPath: "/misturix/it/privacy/",
		title: "Misturix · Un assaggio di casa",
		description:
			"Un gioco di abbinamenti dedicato alla cultura brasiliana, ai cibi che amiamo e ai sapori che ci mancano quando siamo lontani da casa. Scopri Misturix.",
		nav: ["Il gioco", "Come si gioca", "Schermate"],
		languageLabel: "Lingua",
		skip: "Vai al contenuto",
		back: "Torna al gioco",
		eyebrow: "Un gioco. Tanti ricordi intorno alla tavola.",
		headline: ["Un assaggio", "di casa."],
		intro:
			"Ci sono cibi che ci fanno sentire a casa, anche da lontano. Misturix è un omaggio alla cultura brasiliana e ai sapori che portiamo con noi.",
		cta: "Scopri il gioco",
		status: "In arrivo su Google Play",
		gameLanguage:
			"Le schermate mostrano la versione in portoghese brasiliano. Il sito è disponibile in quattro lingue.",
		plateNote: "Feijoada, pudim, bolinho de chuva…",
		artAlt:
			"Illustrazioni del gioco di feijoada, budino al caramello e frittelle brasiliane",
		storyLabel: "Cibo, ricordi e saudade",
		storyTitle: "Anche la nostalgia ha un sapore.",
		story: [
			"Il brigadeiro alle feste di compleanno. La feijoada che riunisce tutti a tavola. Il bolinho de chuva, una piccola frittella dolce, per una pausa pomeridiana. La cucina brasiliana custodisce storie, accenti e modi di prendersi cura degli altri.",
			"Misturix trasforma questo affetto in un gioco in cui abbinare ingredienti. Un omaggio ai cibi che amiamo e che ci mancano quando siamo lontani da casa. E un invito per chi sta ancora scoprendo questi sapori.",
		],
		gameplayLabel: "Mescoliamo?",
		gameplayTitle: "Dal mercato al quaderno di ricette.",
		steps: [
			{
				title: "Abbina gli ingredienti",
				text: "Scambia tessere vicine e abbina tre o più ingredienti. Completa gli obiettivi prima di esaurire le mosse.",
			},
			{
				title: "Scopri le ricette",
				text: "Avanza nelle missioni del quaderno e scopri 80 piatti brasiliani. Ogni ricetta conquistata apre la strada alla successiva.",
			},
			{
				title: "Porta con te un po' di Brasile",
				text: "Salva animali per il cortile, scopri tesori culturali e condividi i tuoi traguardi quando vuoi.",
			},
		],
		galleryTitle: "Un giro dentro Misturix.",
		galleryNote:
			"Schermate reali del gioco. Versione in portoghese brasiliano.",
		screenshots: [
			{
				title: "La partita",
				text: "Ingredienti, abbinamenti e una missione alla volta.",
				alt: "Partita di Misturix con griglia di ingredienti e obiettivi",
			},
			{
				title: "Il tuo percorso",
				text: "Il quaderno segue ogni passo della campagna.",
				alt: "Quaderno di Misturix con i progressi delle missioni",
			},
			{
				title: "Le ricette",
				text: "Piatti che fanno parte dei nostri ricordi.",
				alt: "Schermata di una ricetta brasiliana conquistata in Misturix",
			},
			{
				title: "Il traguardo",
				text: "Una vittoria più vicini alla prossima ricetta.",
				alt: "Schermata dei risultati di una missione di Misturix",
			},
		],
		invitation: "Entra. C'è posto a tavola.",
		invitationText:
			"Misturix si sta preparando per arrivare su Google Play. Nel frattempo, scopri il progetto e contatta chi sta creando il gioco.",
		contact: "Scrivi a William",
		footer: "Un gioco di William Oliveira, in omaggio alla cultura brasiliana.",
		privacy: {
			title: "Informativa sulla privacy",
			description:
				"Come Misturix gestisce i progressi salvati, il soprannome facoltativo e la condivisione dei traguardi.",
			date: "Aggiornata il 17 settembre 2026",
			intro:
				"Questa informativa riguarda il gioco Misturix per Android (com.woliveiras.misturix) e queste pagine di presentazione. Il responsabile del progetto è William Oliveira.",
			summary:
				"Misturix funziona offline. I progressi restano sul tuo dispositivo. Il gioco non prevede registrazione, pubblicità, tracciamento dell'utilizzo o un server che riceve i dati delle tue partite.",
			sections: [
				{
					title: "Cosa resta sul dispositivo",
					paragraphs: [
						"Il gioco salva i progressi delle missioni, le ricette e le collezioni conquistate, le monete del gioco, le personalizzazioni, i record e la partita in corso. Conserva anche le preferenze per suono, vibrazione e movimento, oltre a un soprannome facoltativo scelto da te.",
						"Queste informazioni permettono di riprendere la partita e conservare le tue scelte. Restano nella memoria locale dell'app, con copie locali di recupero. Lo sviluppatore non le riceve. Misturix non sincronizza i progressi tramite un proprio servizio cloud.",
					],
				},
				{
					title: "Quando scegli di condividere",
					paragraphs: [
						"La condivisione avviene solo su tua richiesta. Il gioco prepara un'immagine e un testo con il record o il traguardo. Se hai impostato un soprannome, può comparire nella cartolina. Android apre il selettore per scegliere un'altra app.",
						"L'app scelta riceve la cartolina e il testo, non il file dei progressi. L'uso successivo segue l'informativa del servizio scelto. Evita di usare il tuo nome completo o dati personali come soprannome se non vuoi renderli pubblici.",
						"Le cartoline preparate sono conservate localmente nell'app. Quando prepari una nuova condivisione, Misturix rimuove le cartoline locali generate da più di sette giorni. Questa pulizia non elimina le copie già inviate o salvate in un'altra app.",
					],
				},
				{
					title: "Autorizzazioni e servizi Android",
					paragraphs: [
						"Il gioco usa la vibrazione per rispondere alle tue azioni quando l'opzione è attiva. Non richiede accesso a posizione, contatti, fotocamera o microfono. La configurazione Android attuale non richiede l'autorizzazione per internet.",
						"Android, Google Play e le app usate per condividere possono trattare informazioni secondo le proprie impostazioni e informative. Anche i backup del dispositivo dipendono dal sistema operativo; Misturix non gestisce un proprio servizio di backup cloud.",
					],
				},
				{
					title: "Conservazione e cancellazione",
					paragraphs: [
						"I progressi e le preferenze restano sul dispositivo finché vengono conservati i dati dell'app. Per eliminarli, apri le impostazioni Android: App → Misturix → Spazio di archiviazione → Cancella dati. I nomi possono variare. Questa operazione cancella i progressi locali.",
						"La disinstallazione normalmente rimuove i dati locali. Gestisci i backup del sistema e le copie delle cartoline condivise nei rispettivi servizi. Poiché lo sviluppatore non riceve i tuoi progressi, non può recuperarli o cancellarli a distanza.",
					],
				},
				{
					title: "Queste pagine web",
					paragraphs: [
						"Le pagine di Misturix non includono strumenti propri di analisi delle visite, pubblicità, moduli o cookie di tracciamento. Caratteri e immagini sono serviti da questo sito.",
						"Il sito è ospitato su GitHub Pages. Quando visiti una pagina, il fornitore può trattare dati tecnici della connessione, come l'indirizzo IP, per erogare e proteggere il servizio. Questi dati sono separati da quelli locali del gioco. I collegamenti esterni seguono le informative dei rispettivi siti.",
					],
				},
				{
					title: "Contatti e modifiche all'informativa",
					paragraphs: [
						"Se ci contatti, le informazioni che scegli di inviare saranno usate per rispondere alla richiesta. Non inviare dati sensibili e non pubblicare il file dei progressi in una conversazione pubblica. Usa il contatto qui sotto per domande sulla privacy o per richiedere la cancellazione di informazioni inviate allo sviluppatore.",
						"Il gioco non mostra pubblicità. Questa informativa sarà aggiornata se cambierà il trattamento dei dati. La data all'inizio indica l'ultima revisione.",
					],
				},
			],
			providers: "Informative dei servizi citati",
			github: "Privacy di GitHub",
			google: "Privacy di Google",
			contactTitle: "Contatto per la privacy",
			contactText: "William Oliveira · responsabile di Misturix",
		},
	},
};
