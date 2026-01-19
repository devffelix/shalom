
export interface Psalm {
    id: number;
    title: string;
    number: number;
    explanation: string;
    verse: string;
    practicalApplication: string;
    historicalContext?: string;
    deeperInsight?: string;
    prayerPrompt?: string;
    tags: string[];
}

export const PSALMS: Psalm[] = [
    {
        id: 1,
        title: "O Senhor é meu Pastor",
        number: 23,
        explanation: "O Salmo 23 é talvez o texto mais conhecido da Bíblia. Ele descreve Deus como um pastor cuidadoso que não deixa faltar nada às suas ovelhas. Mesmo em vales escuros (momentos de depressão, medo ou perda), Sua mão nos guia. Este salmo mostra que Deus não é um Deus distante, mas um pastor presente que caminha conosco através dos vales mais profundos da vida.",
        historicalContext: "Davi, antes de ser rei, foi pastor de ovelhas. Ele conhecia intimamente os perigos que as ovelhas enfrentavam: lobos, precipícios, falta de água. Quando escreveu este salmo, ele transferiu sua experiência com ovelhas para sua relação com Deus, mostrando que Deus o protegia da mesma forma que ele protegia suas ovelhas.",
        deeperInsight: "A palavra 'faltará' no original hebraico significa 'diminuir' ou 'ser insuficiente'. Davi está dizendo que com Deus como pastor, nunca haverá uma diminuição na provisão divina – seja material, emocional ou espiritual. O 'vale da sombra da morte' não significa necessariamente morte física, mas qualquer situação onde parece não haver luz ou esperança.",
        verse: "O Senhor é o meu pastor; nada me faltará. Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.",
        practicalApplication: "Quando o desespero bater, feche os olhos e imagine Jesus como esse pastor. Ele não está longe nas nuvens; Ele está no campo com você, pronto para te defender e te alimentar. Descanse na provisão d'Ele hoje. Se você sente que não tem forças para mais nada, lembre-se: ovelhas não trabalham para o pastor – elas simplesmente seguem. Você não precisa fazer tudo sozinho.",
        prayerPrompt: "Senhor, eu me entrego como uma ovelha nas Tuas mãos de Pastor. Guia-me hoje aos pastos verdes de Tua provisão e às águas tranquilas do Teu descanso. Mesmo quando eu passar por vales escuros, eu sei que Tu estás comigo. Amém.",
        tags: ["Segurança", "Provisão", "Paz"]
    },
    {
        id: 2,
        title: "Socorro bem presente",
        number: 46,
        explanation: "Este salmo foi escrito em um momento de crise nacional, possivelmente durante uma invasão militar. Ele nos lembra que mesmo que a terra mude ou os montes caiam no mar (metáforas para grandes tragédias), Deus é nosso refúgio e fortaleza. Ele é maior que qualquer problema. A mensagem central é: 'Aquieta-te e sabe que eu sou Deus' – uma ordem divina para parar de lutar em nossas próprias forças e confiar n'Ele.",
        historicalContext: "Este salmo provavelmente foi escrito durante o reinado do rei Ezequias, quando o exército assírio cercou Jerusalém. A cidade estava completamente rodeada de inimigos, sem esperança humana. Mas Deus enviou um anjo que destruiu o exército inimigo em uma noite, salvando Jerusalém milagrosamente.",
        deeperInsight: "A frase 'Deus está no meio dela; nunca vacilará' refere-se a Jerusalém, mas também simboliza o crente individual. Quando Deus habita em nós, somos inabaláveis. A palavra hebraica para 'refúgio' (machseh) significa literalmente 'lugar de abrigo da tempestade'. Deus não apenas nos protege – Ele SE TORNA nossa proteção.",
        verse: "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia. Por isso não temeremos, ainda que a terra se mude, e ainda que os montes se transportem para o meio dos mares.",
        practicalApplication: "Se você recebeu uma notícia ruim hoje, ou se sente que o seu mundo está desmoronando, lembre-se: Deus é um castelo inabalável. Entre nesse castelo através da oração e fique protegido. Quando tudo ao seu redor parece desabar, pare, respire fundo e repita: 'Deus está comigo. Eu sou inabalável n'Ele.' Não tente resolver tudo sozinho – aquiete-se e deixe Deus agir.",
        prayerPrompt: "Deus, Tu és meu refúgio inabalável. Quando meu mundo parece desmoronar, eu corro para Ti. Aquieta meu coração agora, lembrando-me que Tu estás no controle. Sê meu socorro nesta angústia. Amém.",
        tags: ["Proteção", "Força", "Refúgio"]
    },
    {
        id: 3,
        title: "Onde vem o meu socorro?",
        number: 121,
        explanation: "Olhar para os montes era olhar para o perigo (onde ficavam assaltantes e exércitos inimigos). O salmista declara que seu socorro não vem de lugares altos ou de homens poderosos, mas do Criador de tudo. Ele não dorme e nos guarda de todo mal. Este é um salmo de peregrinação, cantado por viajantes subindo a Jerusalém.",
        historicalContext: "Este é um dos 'Cânticos de Romagem' (Salmos 120-134), cantados pelos israelitas enquanto viajavam para Jerusalém três vezes ao ano para as festas sagradas. A jornada era perigosa, com ladrões nos montes e sol escaldante no deserto. Este salmo era um lembrete de que Deus protegia cada passo da jornada.",
        deeperInsight: "A repetição da palavra 'guardar' (shamar em hebraico) aparece seis vezes neste curto salmo, enfatizando a vigilância constante de Deus. Ele guarda nossa 'saída e entrada' – ou seja, todas as nossas atividades, do começo ao fim. O fato de que Deus 'não dormirá nem tosquenejará' contrasta radicalmente com os deuses pagãos da época, que eram vistos como dormindo ou desatentos.",
        verse: "Elevo os meus olhos para os montes; de onde me virá o socorro? O meu socorro vem do Senhor, que fez os céus e a terra. Ele não permitirá que os teus pés vacilem; não dormitará aquele que te guarda.",
        practicalApplication: "Pare de procurar soluções apenas em pessoas ou no seu próprio esforço. Olhe para cima. Deus está vigiando cada passo seu, cuidando da sua entrada e da sua saída agora mesmo. Quando você estiver prestes a tomar uma decisão importante, lembre-se: há Um que não dorme, que está te vigiando e preparando o melhor caminho. Confie n'Ele, não em suas próprias estratégias.",
        prayerPrompt: "Senhor, criador dos céus e da terra, Tu és meu Guardador vigilante. Enquanto eu durmo, Tu velas por mim. Protege minha entrada e saída hoje, em cada decisão e em cada passo. Obrigado por nunca me deixar sozinho. Amém.",
        tags: ["Vigilância", "Cuidado", "Fé"]
    },
    {
        id: 4,
        title: "Deus me conhece por inteiro",
        number: 139,
        explanation: "Este é o salmo da intimidade profunda com Deus. Ele diz que Deus nos viu antes mesmo de nascermos e conhece cada pensamento nosso antes de falarmos. Não há lugar onde possamos fugir da Sua presença – nem nas alturas do céu, nem nas profundezas do mar. Este conhecimento íntimo de Deus sobre nós não é invasivo, mas amoroso e protetor.",
        historicalContext: "Davi escreveu este salmo em um momento de intensa reflexão sobre a onisciência e onipresença de Deus. Provavelmente depois de escapar de algum perigo, ele maravilhou-se ao perceber que Deus sempre soube onde ele estava e o que precisava, mesmo antes dele pedir.",
        deeperInsight: "A palavra hebraica 'sondar' (chaqar) significa 'investigar profundamente', como um mineiro procurando ouro. Deus não apenas nos conhece superficialmente – Ele investiga cada camada do nosso ser. O verso sobre ser 'tecido no ventre materno' usa terminologia médica surpreendentemente precisa para a época, mostrando que Deus estava ativamente envolvido em cada detalhe da nossa formação.",
        verse: "Senhor, tu me sondas e me conheces. Sabes quando me assento e quando me levanto; de longe entendes o meu pensamento. Esquadrinhas o meu andar e o meu deitar e conheces todos os meus caminhos.",
        practicalApplication: "Você nunca está sozinho, nem quando se sente incompreendido. Deus te entende melhor do que você mesmo. Fale com Ele com sinceridade, Ele já sabe de tudo e mesmo assim te ama profundamente. Não há pensamento ou sentimento que você precise esconder d'Ele – Ele já conhece e continua te amando. Viva essa liberdade hoje.",
        prayerPrompt: "Deus, Tu me conheces completamente – meus pensamentos, minhas palavras antes de eu falar, meus segredos mais profundos. E mesmo assim, Tu me amas. Obrigado por me formar com tanto cuidado e por estar sempre presente. Amém.",
        tags: ["Intimidade", "Amor", "Presença"]
    },
    {
        id: 5,
        title: "A felicidade do justo",
        number: 1,
        explanation: "O Salmo 1 abre o livro de Salmos mostrando o contraste entre dois caminhos: o caminho dos ímpios (que leva à destruição) e o caminho do justo (que leva à vida abundante). Quem segue os conselhos do mundo é como palha levada pelo vento – sem raiz, sem substância. Mas quem medita na Palavra de Deus é como uma árvore plantada junto a águas: sempre verde, sempre frutífera, mesmo em tempos de seca.",
        historicalContext: "Este salmo serve como introdução a todo o livro de Salmos, estabelecendo o princípio fundamental: a bem-aventurança vem da meditação constante na Palavra de Deus. Na cultura hebraica, 'meditar' (hagah) significa murmurar, repetir em voz baixa, mastigar – uma imersão total na verdade divina.",
        deeperInsight: "A imagem da árvore plantada junto aos ribeiros de águas é poderosa. Em Israel, a maioria das árvores dependia apenas da chuva sazonal, mas uma árvore plantada perto de água tinha suprimento constante. Da mesma forma, quem se mantém conectado à fonte da Palavra de Deus não seca, mesmo quando as circunstâncias externas são áridas. O 'fruto' mencionado não é apenas prosperidade material, mas também frutos do Espírito: amor, paz, paciência, etc.",
        verse: "Bem-aventurado o homem que não anda segundo o conselho dos ímpios, nem se detém no caminho dos pecadores, nem se assenta na roda dos escarnecedores. Antes, o seu prazer está na lei do Senhor, e na sua lei medita de dia e de noite.",
        practicalApplication: "Cuidado com quem você ouve. Seus 'conselheiros' moldam seu futuro. Escolha passar mais tempo ouvindo a voz de Deus (na Bíblia) do que o barulho das redes sociais. Suas folhas não murcharão. Pergunte-se hoje: estou plantado perto da água ou apenas dependendo de chuvas ocasionais? Comprometa-se a meditar na Palavra diariamente, mesmo que por apenas 10 minutos.",
        prayerPrompt: "Senhor, planta-me junto aos ribeiros de Tua Palavra. Ajuda-me a resistir aos conselhos que me afastam de Ti. Que eu medite em Tua verdade dia e noite, produzindo frutos na estação certa. Amém.",
        tags: ["Escolhas", "Sabedoria", "Prosperidade"]
    },
    {
        id: 6,
        title: "Um coração quebrantado",
        number: 51,
        explanation: "Davi escreveu este salmo após cometer adultério com Bate-Seba e mandar matar seu marido, Urias. É a oração mais profunda de arrependimento na Bíblia. Ele nos ensina que Deus não despreza um coração quebrantado e contrito. Não há pecado grande demais para o perdão de Deus quando há verdadeiro arrependimento. Este salmo mostra que Deus não quer sacrifícios religiosos – Ele quer um coração transformado.",
        historicalContext: "Depois do profeta Natã confrontar Davi sobre seu pecado com uma parábola poderosa, Davi caiu em si e percebeu a gravidade do que havia feito. Este salmo foi sua resposta – não uma desculpa, não uma racionalização, mas um reconhecimento total de sua falha e um clamor por misericórdia divina.",
        deeperInsight: "A frase 'cria em mim um coração puro' usa a palavra hebraica 'bara', que é a mesma usada em Gênesis 1:1 para 'criou'. Davi está pedindo que Deus faça uma criação totalmente nova dentro dele, não apenas um conserto do velho coração. O 'espírito quebrantado' que Deus não despreza é literalmente um espírito 'esmagado' – totalmente humilhado diante de Deus.",
        verse: "Compadece-te de mim, ó Deus, segundo a tua benignidade; apaga as minhas transgressões, segundo a multidão das tuas misericórdias. Cria em mim, ó Deus, um coração puro e renova dentro de mim um espírito inabalável.",
        practicalApplication: "Errou feio? Não se esconda de Deus. O arrependimento verdadeiro é a chave para a restauração. Ele não quer te punir; Ele quer te limpar e te dar um novo começo. Peça perdão e recomece hoje. Não carregue culpa do passado – se você se arrependeu sinceramente, Deus já te purificou. Aceite esse perdão e ande em liberdade.",
        prayerPrompt: "Deus, eu pequei contra Ti. Lava-me completamente e cria em mim um coração puro. Não me rejeites por causa dos meus erros. Restaura-me à alegria da Tua salvação. Eu me arrependo de verdade. Amém.",
        tags: ["Perdão", "Arrependimento", "Restauração"]
    },
    {
        id: 7,
        title: "Sob a sombra do Onipotente",
        number: 91,
        explanation: "O 'Salmo da Proteção'. Ele fala sobre habitar no esconderijo do Altíssimo – um lugar secreto de comunhão íntima. É uma promessa de livramento contra pragas, guerras, terrores noturnos e inimigos para aqueles que fazem de Deus a sua habitação permanente. Este salmo foi citado pelo próprio satanás ao tentar Jesus no deserto, mostrando seu poder e reconhecimento universal.",
        historicalContext: "Tradicionalmente atribuído a Moisés, este salmo teria sido escrito durante as peregrinações no deserto, onde Israel enfrentou serpentes, escorpiões, pragas e ataques de nações inimigas. A proteção de Deus era literal e diária. Este salmo permanece relevante para todo tipo de perigo – físico, espiritual ou emocional.",
        deeperInsight: "A frase 'mil cairão ao teu lado' não é apenas poética – é uma promessa específica de que mesmo quando o juízo de Deus cai sobre os ímpios, aqueles que habitam n'Ele são protegidos. O número 'mil' representa uma multidão incontável. A proteção não é apenas física; os 'anjos' mencionados no verso 11 são reais e ativos, guardando os fiéis em todos os seus caminhos.",
        verse: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará. Direi do Senhor: Ele é o meu Deus, o meu refúgio, a minha fortaleza, e nele confiarei.",
        practicalApplication: "Fazer de Deus sua 'habitação' significa viver em constante conversa com Ele. Não é apenas visitar aos domingos. Quando você mora com Deus, o medo perde o poder sobre sua casa. Hoje, escolha 'habitar' n'Ele – não apenas visitá-Lo. Fale com Ele ao acordar, ao trabalhar, antes de dormir. Transforme sua vida em uma oração contínua.",
        prayerPrompt: "Senhor, eu escolho habitar em Ti, não apenas te visitar. Sob Tuas asas eu me refugio. Protege-me de todo mal, de toda praga, de todo terror. Envia Teus anjos para me guardar em todos os meus caminhos. Amém.",
        tags: ["Proteção Divina", "Segurança", "Descanso"]
    },
    {
        id: 8,
        title: "A alegria vem pela manhã",
        number: 30,
        explanation: "Um salmo de gratidão após uma cura ou livramento milagroso. Ele reconhece que embora a tristeza possa durar uma noite inteira, ela tem hora para acabar. Deus transforma nosso pranto em dança, nosso lamento em júbilo. A 'noite' representa períodos de sofrimento, mas sempre dá lugar à 'manhã' da alegria renovada.",
        historicalContext: "Davi escreveu este salmo após ser curado de uma doença grave ou escapar de um perigo mortal. Ele usa linguagens de 'descer à cova' e 'subir das profundezas', indicando que esteve à beira da morte. O título do salmo indica que foi usado na dedicação do templo, tornando-se um hino de vitória coletiva.",
        deeperInsight: "A palavra 'momento' (rega em hebraico) literalmente significa 'um piscar de olhos'. Mesmo quando parece que o juízo de Deus dura muito, em comparação com Sua bondade eterna, é apenas um instante. A transformação de 'pranto em dança' não é gradual – é instantânea quando a alegria de Deus chega. Ele não apenas acalma nossa tristeza; Ele a substitui por júbilo ativo.",
        verse: "O choro pode durar uma noite, mas a alegria vem pela manhã. Tu converteste o meu pranto em folguedo; tiraste o meu pano de saco e me cingiste de alegria.",
        practicalApplication: "Sua 'noite' de dor está demorando a passar? Não desista. O sol de Deus vai nascer. A fase que você está vivendo não é o fim da sua história. Aguente firme, o amanhecer está chegando. Lembre-se: a noite mais escura é justo antes do amanhecer. A sua vitória está mais perto do que você imagina.",
        prayerPrompt: "Senhor, eu sei que esta noite de dor vai passar. Tu prometeste que a alegria vem pela manhã. Converte meu pranto em dança. Tira meu lamento e me vista de alegria. Eu confio que o amanhecer está chegando. Amém.",
        tags: ["Esperança", "Superação", "Alegria"]
    },
    {
        id: 9,
        title: "Espera no Senhor",
        number: 27,
        explanation: "Davi declara que não tem medo de exércitos porque Deus é sua luz e salvação. O segredo dele é 'esperar no Senhor' – não com passividade, mas com confiança ativa. Ele pede apenas uma coisa: habitar na casa de Deus para sempre, contemplando Sua formosura. Este salmo une coragem militar com adoração devota.",
        historicalContext: "Escrito possivelmente durante a perseguição de Saul ou durante uma das revoltas contra seu reinado, este salmo reflete a mentalidade de um guerreiro que encontra sua força não nas armas, mas em Deus. Mesmo cercado de inimigos, Davi mantém a adoração como prioridade.",
        deeperInsight: "A frase 'uma coisa pedi ao Senhor' é revolucionária. Em meio a tantas necessidades (proteção, vitória, provisão), Davi pede apenas intimidade com Deus. A palavra 'contemplar' (chazah) significa olhar fixamente com admiração, como se estivesse em êxtase. Davi encontrou a fonte de sua coragem na beleza de Deus, não em seus exércitos.",
        verse: "O Senhor é a minha luz e a minha salvação; de quem terei medo? O Senhor é a força da minha vida; de quem me recearei? Ainda que um exército me cercasse, o meu coração não temeria.",
        practicalApplication: "O medo é o barulho da falta de confiança. Quando você foca na luz de Deus, os gigantes ao redor ficam pequenos. Se você se sente pressionado hoje, pare e simplesmente adore. O medo fugirá. Não se concentre no tamanho do problema, mas na glória de Deus. Ele é maior que qualquer exército que te cerca.",
        prayerPrompt: "Senhor, Tu és minha luz e salvação. Não temerei exército algum. Ensina-me a esperar em Ti com confiança. Que minha maior busca seja contemplar Tua beleza e habitar em Tua presença para sempre. Amém.",
        tags: ["Coragem", "Confiança", "Luz"]
    },
    {
        id: 10,
        title: "O valor da Palavra",
        number: 119,
        explanation: "O capítulo mais longo da Bíblia é totalmente dedicado à Palavra de Deus. Com 176 versículos, este salmo é um poema acróstico em hebraico, onde cada seção começa com uma letra diferente do alfabeto hebraico. Ele diz que os mandamentos são lâmpada para os pés e luz para o caminho, nos guiando quando não conseguimos ver o futuro.",
        historicalContext: "Este salmo foi escrito por alguém que estava sendo intensamente perseguido, possivelmente durante o exílio babilônico. Em meio à opressão, o salmista encontrou refúgio e direção na Palavra de Deus, que permanecia verdadeira mesmo quando tudo ao redor mudava.",
        deeperInsight: "A Palavra é chamada por diversos nomes neste salmo: lei, testemunhos, preceitos, estatutos, mandamentos, juízos. Cada termo destaca um aspecto diferente da revelação divina. A frase 'escondi tua palavra no meu coração' usa a palavra 'tsaphan', que significa 'guardar como tesouro precioso'. A Palavra não deve apenas ser lida, mas internalizada, memorizada, vivida.",
        verse: "Lâmpada para os meus pés é tua palavra e luz, para o meu caminho. Escondi a tua palavra no meu coração, para eu não pecar contra ti.",
        practicalApplication: "Não sabe que decisão tomar? A Bíblia tem a resposta. Ela não te dá o mapa do futuro inteiro, mas te dá luz para o 'próximo passo'. Leia um pouco e você verá o caminho clarear. Memorize versículos-chave – eles serão sua arma contra a tentação e sua bússola nas decisões difíceis.",
        prayerPrompt: "Senhor, Tua Palavra é lâmpada para meus pés. Ilumina meu próximo passo. Ajuda-me a esconder Tua verdade no meu coração, guardando-a como tesouro. Que ela me guie em toda decisão. Amém.",
        tags: ["Direção", "Bíblia", "Luz"]
    },
    {
        id: 11,
        title: "Esperei confiantemente",
        number: 40,
        explanation: "Davi relembra como Deus o tirou de um 'poço horrível' e do 'lodo profundo', firmando seus pés sobre a rocha. Este salmo mostra a jornada da angústia à adoração. Deus não apenas nos salva; Ele nos dá um novo cântico e um testemunho que faz outros confiarem n'Ele.",
        historicalContext: "Este salmo é messiânico – o verso 'sacrifício e oferta não quiseste' é citado em Hebreus 10, aplicado a Jesus Cristo. Davi profeticamente aponta para o Messias que viria para fazer a vontade perfeita de Deus, não através de rituais, mas através da obediência completa.",
        deeperInsight: "O 'poço horrível' (bor shaon em hebraico) significa literalmente 'poço de tumulto e destruição'. Não é apenas um lugar físico, mas um estado mental e espiritual de caos total. Deus não apenas ajuda a sair do poço – Ele põe os pés do resgatado sobre a 'rocha', que é Cristo, o fundamento inabalável.",
        verse: "Esperei confiantemente pelo Senhor; ele se inclinou para mim e ouviu o meu clamor. Tirou-me dum lago horrível, dum charco de lodo, pôs os meus pés sobre uma rocha e firmou os meus passos.",
        practicalApplication: "Se você está em um 'poço' hoje – seja depressão, vício, dívidas ou relacionamentos tóxicos – clame a Deus. Ele pode te tirar e firmar seus pés em terreno sólido. Não aceite viver no lodo. Deus tem um lugar de firmeza esperando por você. Confie que Ele pode e vai te restaurar.",
        prayerPrompt: "Senhor, tira-me deste poço horrível onde me sinto preso. Firma meus pés sobre a rocha que é Cristo. Dá-me um novo cântico de vitória. Eu espero confiantemente em Ti. Amém.",
        tags: ["Libertação", "Novos Começos", "Esperança"]
    },
    {
        id: 12,
        title: "O Deus da minha salvação",
        number: 18,
        explanation: "Um dos salmos mais longos e dramáticos de Davi, celebrando livramentos espetaculares de seus inimigos. Ele descreve Deus em termos cósmicos: 'tremeu a terra', 'desceram trevas sob seus pés', 'trovejou o Senhor nos céus'. Este é Deus guerreiro lutando por Seu povo.",
        historicalContext: "Davi escreveu este salmo após Deus o livrar de todos os seus inimigos e especialmente de Saul. Ele olha para trás em sua vida e vê a mão protetora de Deus em cada batalha. Este mesmo salmo aparece em 2 Samuel 22, mostrando sua importância na vida de Davi.",
        deeperInsight: "Deus é descrito com múltiplas metáforas militares: rocha, fortaleza, libertador, escudo, força, alto refúgio. Cada imagem destaca um aspecto diferente da proteção divina. A frase 'com o meu Deus saltarei muralhas' indica que com Deus, o impossível se torna possível – não por força própria, mas por capacitação divina.",
        verse: "O Senhor é a minha rocha, a minha cidadela, o meu libertador; o meu Deus, a minha fortaleza, em quem confio; o meu escudo, a força da minha salvação e o meu alto refúgio.",
        practicalApplication: "Hoje, declare sobre sua vida: 'O Senhor é minha rocha'. Quando tudo ao redor parece incerto, Deus permanece firme. Ele não é apenas uma força abstrata; Ele é SEU libertador pessoal. Que batalha você está enfrentando? Peça a Deus para lutar por você e veja as muralhas caírem.",
        prayerPrompt: "Senhor, Tu és minha rocha inabalável, minha fortaleza inexpugnável. Luta por mim hoje. Com Teu poder, eu posso saltar muralhas impossíveis. Obrigado por ser meu libertador. Amém.",
        tags: ["Vitória", "Proteção", "Poder"]
    },
    {
        id: 13,
        title: "Bem-aventurado o perdoado",
        number: 32,
        explanation: "Outro salmo de arrependimento de Davi, mas com foco diferente do Salmo 51. Aqui, ele descreve as consequências físicas e emocionais de guardar pecado não confessado: seus ossos se consumiam, sua vitalidade se esgotava. Mas quando confessou, experimentou perdão e alegria indescritíveis.",
        historicalContext: "Alguns estudiosos acreditam que este salmo foi escrito no mesmo contexto do Salmo 51, após o pecado com Bate-Seba. Davi passou meses carregando culpa antes de ser confrontado pelo profeta Natã. Este salmo reflete o alívio imenso que sentiu ao finalmente confessar.",
        deeperInsight: "A palavra 'bem-aventurado' (ashrei) aparece duas vezes no início, criando ênfase dupla. O perdão de Deus não é parcial – Ele 'cobre' o pecado completamente. A confissão não informa Deus de algo que Ele não sabe; ela concorda com o que Ele já sabe e aceita Sua solução: perdão através do sacrifício.",
        verse: "Bem-aventurado aquele cuja transgressão é perdoada, e cujo pecado é coberto. Confessei-te o meu pecado e a minha maldade não encobri. Disse: Confessarei ao Senhor as minhas transgressões; e tu perdoaste a maldade do meu pecado.",
        practicalApplication: "Guardar pecado não confessado é como veneno no corpo. Confesse hoje e experimente o alívio físico, mental e espiritual. Deus não está esperando para te condenar; Ele está ansioso para te perdoar. Não carregue mais esse peso – deixe-o aos pés da cruz.",
        prayerPrompt: "Senhor, eu confesso meus pecados a Ti. Não quero esconder nada. Perdoa minha transgressão e cobre meu pecado. Obrigado pelo alívio que vem da confissão sincera. Amém.",
        tags: ["Perdão", "Alívio", "Confissão"]
    },
    {
        id: 14,
        title: "Os céus proclamam",
        number: 19,
        explanation: "Este salmo está dividido em duas partes: a revelação de Deus na natureza (versículos 1-6) e na Palavra (versículos 7-14). Os céus pregam um sermão silencioso 24 horas por dia sobre a glória de Deus. Mas a Palavra de Deus vai além, restaurando a alma e dando sabedoria.",
        historicalContext: "Davi, como pastor, passava noites inteiras sob o céu estrelado. Ele viu na criação uma evidência inquestionável de um Criador magnífico. Mais tarde, como rei, ele valorizou ainda mais a revelação específica que Deus deu através de Sua Palavra escrita.",
        deeperInsight: "A frase 'não há linguagem... onde não se ouça a sua voz' significa que a criação comunica universalmente, sem depender de idiomas humanos. Todo ser humano, em qualquer cultura, pode olhar para o céu e sentir que há um Criador. Mas essa revelação geral precisa ser completada pela revelação especial da Palavra.",
        verse: "Os céus manifestam a glória de Deus e o firmamento anuncia a obra das suas mãos. Um dia faz declaração a outro dia, e uma noite mostra sabedoria a outra noite.",
        practicalApplication: "Hoje, pare por alguns minutos e olhe para o céu. Deixe a criação te lembrar da grandeza de Deus. Depois, abra a Bíblia e deixe a Palavra te falar especificamente sobre a vontade d'Ele para sua vida. A natureza revela que Deus existe; a Bíblia revela quem Ele é.",
        prayerPrompt: "Senhor, os céus declaram Tua glória. Abre meus olhos para ver Tua mão na criação. Abre meu coração para receber Tua Palavra que restaura minha alma e me dá sabedoria. Amém.",
        tags: ["Criação", "Glória", "Revelação"]
    },
    {
        id: 15,
        title: "O Bom Pastor dá a vida",
        number: 23,
        explanation: "Retornando ao Salmo 23 com uma perspectiva adicional: Jesus disse 'Eu sou o bom pastor. O bom pastor dá a sua vida pelas ovelhas' (João 10:11). Este salmo não é apenas poesia; é profecia sobre o Messias que morreria por Suas ovelhas.",
        historicalContext: "Davi, tendo sido literalmente um pastor antes de ser rei, compreendeu profundamente o sacrifício que um verdadeiro pastor faz. Ele sabia que um bom pastor estaria disposto a morrer para proteger suas ovelhas de lobos e leões.",
        deeperInsight: "A frase 'a tua vara e o teu cajado me consolam' se refere aos instrumentos do pastor. A vara era uma clava para defesa contra predadores; o cajado era usado para guiar gentilmente as ovelhas. Deus nos consola tanto na disciplina (vara) quanto na direção suave (cajado). Ambos demonstram Seu amor.",
        verse: "O Senhor é o meu pastor; nada me faltará... Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo.",
        practicalApplication: "Jesus é o cumprimento deste salmo. Ele deu Sua vida por você. Quando você se sente desprotegido ou com medo, lembre-se: seu Pastor já enfrentou o vale da morte por você e venceu. Você não está sozinho no vale – Ele está com você.",
        prayerPrompt: "Jesus, Bom Pastor, obrigado por dar Tua vida por mi. Guia-me hoje pelos campos verdes de Tua vontade. Mesmo nos vales escuros, eu sei que Tu estás comigo. Amém.",
        tags: ["Segurança", "Sacrifício", "Amor"]
    },
    {
        id: 16,
        title: "Confia e espera no Senhor",
        number: 37,
        explanation: "O Salmo 37 é um hino de sabedoria que nos ensina a não nos desesperarmos com o sucesso dos injustos. A mensagem central é a confiança paciente: entregar o caminho a Deus e descansar n'Ele. Ele nos lembra que a justiça divina pode demorar em nossa perspectiva, mas é infalível. Quem confia no Senhor habitará na terra e se deleitará em abundância de paz.",
        historicalContext: "Escrito por Davi na sua velhice ('Fui moço, e agora sou velho...'), este salmo reflete uma vida inteira observando a fidelidade de Deus. Davi viu muitos ímpios prosperarem temporariamente e depois desaparecerem, enquanto os justos, mesmo em dificuldades, eram sustentados pela mão de Deus.",
        deeperInsight: "A frase 'Deleita-te também no Senhor, e ele te concederá os desejos do teu coração' é muitas vezes mal interpretada. Deleitar-se no Senhor significa encontrar n'Ele a sua maior alegria. Quando fazemos isso, nossos desejos são alinhados com a vontade d'Ele, e assim Ele pode atendê-los, pois o que queremos é o que Ele quer para nós.",
        verse: "Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará. Deleita-te também no Senhor, e ele te concederá os desejos do teu coração.",
        practicalApplication: "Muitas vezes ficamos ansiosos tentando 'dar um jeitinho' nas situações. O Salmo 37 nos desafia a soltar o controle. Entregar o caminho significa tirar o peso dos seus ombros e colocar nos de Deus. Hoje, identifique o que mais te preocupa e diga: 'Senhor, eu te entrego isso e escolho descansar'.",
        prayerPrompt: "Senhor, eu te entrego meus planos, minhas ansiedades e meu futuro. Perdoa-me por tentar carregar o mundo sozinho. Eu escolho me deleitar em Ti e confiar que Tu estás agindo em meu favor, mesmo quando eu não vejo. Amém.",
        tags: ["Confiança", "Paciência", "Justiça"]
    },
    {
        id: 17,
        title: "Sede de Deus",
        number: 42,
        explanation: "Este salmo expressa a saudade profunda de Deus em tempos de isolamento e tristeza. A imagem da corça que anseia pelas correntes de águas descreve uma alma que sente falta da presença manifesta do Criador. É um diálogo interno onde o salmista pergunta à sua própria alma: 'Por que estás abatida?'. Ele conclui que, mesmo na dor, a esperança em Deus é o único remédio.",
        historicalContext: "Provavelmente escrito por um dos filhos de Corá (levitas que serviam no templo) enquanto estava exilado ou impedido de ir ao santuário em Jerusalém. Ele ouvia as zombarias dos inimigos perguntando 'Onde está o teu Deus?', enquanto lembrava com saudade das festas religiosas passadas.",
        deeperInsight: "A frase 'Um abismo chama outro abismo' refere-se ao som das cataratas e ondas que parecem submergir o salmista. É uma metáfora para quando os problemas vêm em cascata. No entanto, o termo 'abismo' (tehom) também remete à profundidade de Deus. Nossas profundas necessidades chamam as profundas misericórdias de Deus.",
        verse: "Assim como a corça anseia pelas correntes das águas, assim a minha alma anseia por ti, ó Deus. A minha alma tem sede de Deus, do Deus vivo. Por que estás abatida, ó minha alma, e por que te perturbas dentro de mim? Espera em Deus, pois ainda o louvarei.",
        practicalApplication: "É normal ter dias de abatimento emocional. O segredo do Salmo 42 não é ignorar a tristeza, mas falar com ela. Quando se sentir triste, pergunte-se: 'Minha alma, por que você está assim?'. E então, dê a resposta da fé: 'Espere em Deus'. Transforme sua sede em oração e lembre-se que o louvor é a chave para a restauração da alma.",
        prayerPrompt: "Deus vivo, minha alma tem sede de Ti. Em meio ao meu abatimento, eu escolho esperar em Teu socorro. Consola meu coração e restaura a alegria da Tua presença em minha vida. Eu ainda te louvarei por Tua salvação. Amém.",
        tags: ["Esperança", "Sede de Deus", "Consolo"]
    },
    {
        id: 18,
        title: "Bendize ao Senhor",
        number: 103,
        explanation: "Um salmo de puro louvor e gratidão. Davi convoca todo o seu ser (sua 'alma' e tudo o que há nele) para bendizer a Deus e não esquecer de NENHUM de seus benefícios. Ele lista as maiores bênçãos: perdão, cura, redenção, coroamento com graça e renovação de forças. É um lembrete poderoso de que Deus é compassivo, lento em irar-se e rico em misericórdia.",
        historicalContext: "Este é um salmo de Davi, possivelmente escrito após um período de reflexão sobre a bondade sustentadora de Deus ao longo de sua vida. Ele destaca que Deus conhece a nossa estrutura e sabe que somos pó, agindo com a ternura de um pai que se compadece de seus filhos.",
        deeperInsight: "A expressão 'como o oriente está longe do ocidente, assim afasta de nós as nossas transgressões' é matematicamente fascinante. Ao contrário do norte e sul (que se encontram nos polos), o oriente e o ocidente nunca se encontram. Davi está dizendo que o perdão de Deus remove nossos pecados para uma distância infinita, onde nunca mais serão lembrados contra nós.",
        verse: "Bendize, ó minha alma, ao Senhor, e tudo o que há em mim bendiga o seu santo nome. Bendize, ó minha alma, ao Senhor, e não te esqueças de nenhum de seus benefícios.",
        practicalApplication: "Temos a tendência de lembrar dos problemas e esquecer das bênçãos. Hoje, faça uma lista de 5 benefícios que Deus te deu recentemente (perdoou um erro, te deu saúde, te protegeu, etc.). Quando você se focar no que Deus JÁ fez, terá muito mais fé para o que Ele AINDA vai fazer.",
        prayerPrompt: "Senhor, bendigo o Teu santo nome com tudo o que sou. Obrigado por perdoar minhas iniquidades, sarar minhas enfermidades e me coroar com bondade e misericórdia. Não permitas que eu me esqueça de nenhum dos Teus benefícios. Amém.",
        tags: ["Gratidão", "Louvor", "Misericórdia"]
    }
];
