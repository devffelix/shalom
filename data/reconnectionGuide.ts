
export interface GuideStep {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    advice: string[];
    verse: string;
    verseRef: string;
    action: string;
}

export const RECONNECTION_GUIDE: GuideStep[] = [
    {
        id: 1,
        title: "A Honestidade do Primeiro Passo",
        subtitle: "Pare de fingir que está tudo bem",
        description: "Deus não se afasta de nós, nós é que nos distraímos. O primeiro passo não é uma oração perfeita, mas uma confissão honesta: 'Pai, eu me sinto longe e não sei como voltar'.",
        advice: [
            "Não espere se sentir 'santo' para falar com Ele.",
            "Deus prefere sua verdade do que sua religiosidade.",
            "Reconhecer o vazio é o início do preenchimento."
        ],
        verse: "Chegai-vos a Deus, e ele se chegará a vós.",
        verseRef: "Tiago 4:8",
        action: "Fale em voz alta agora: 'Senhor, eu quero voltar a ter intimidade contigo. Ajuda-me'."
    },
    {
        id: 2,
        title: "O Maná nas Pequenas Janelas",
        subtitle: "Consistência vence a intensidade",
        description: "Muitos tentam voltar lendo 10 capítulos da Bíblia de uma vez e desistem no segundo dia. Jesus se encontra conosco no pão diário, pedaço por pedaço.",
        advice: [
            "Comece com 5 minutos de manhã e 5 à noite.",
            "Leia o Evangelho de João primeiro para conhecer Jesus.",
            "Não leia por obrigação, leia procurando uma carta de amor."
        ],
        verse: "A tua palavra é lâmpada que ilumina os meus passos.",
        verseRef: "Salmo 119:105",
        action: "Leia apenas 5 versículos hoje e pergunte: 'O que isso diz sobre o Teu amor por mim?'"
    },
    {
        id: 3,
        title: "Limpando os Ruídos",
        subtitle: "Silencie o mundo para ouvir o Céu",
        description: "Vivemos em uma era de barulho constante. Notificações, vídeos curtos e notícias sufocam a 'voz mansa e delicada' do Espírito Santo.",
        advice: [
            "Faça um 'jejum' de redes sociais por 1 hora após acordar.",
            "Aprenda a desfrutar do silêncio; é nele que Deus costuma falar.",
            "Transforme seu trajeto no carro ou ônibus em um altar de louvor."
        ],
        verse: "Aquietai-vos, e sabei que eu sou Deus.",
        verseRef: "Salmo 46:10",
        action: "Tire 10 minutos hoje sem celular, sem música, apenas em silêncio diante de Deus."
    },
    {
        id: 4,
        title: "Conversa entre Amigos",
        subtitle: "A oração não é um monólogo robótico",
        description: "A oração é simplesmente derramar o coração. Fale de seus medos, seus planos e até de suas raivas. Jesus te chama de amigo!",
        advice: [
            "Conte para Ele como foi seu dia, mesmo que Ele já saiba.",
            "Peça conselhos sobre decisões simples (o que comprar, o que dizer).",
            "Agradeça por 3 coisas específicas antes de pedir qualquer coisa."
        ],
        verse: "Já não vos chamo servos... mas tenho-vos chamado amigos.",
        verseRef: "João 15:15",
        action: "Escreva uma carta para Deus hoje contando o que mais te preocupa no momento."
    },
    {
        id: 5,
        title: "O Próximo Passo é Obediência",
        subtitle: "Fé é confiança em movimento",
        description: "Reaproximar-se de Jesus envolve fazer o que Ele pediu. Às vezes o caminho de volta passa por um pedido de perdão ou por ajudar alguém necessitado.",
        advice: [
            "Se o Espírito te lembrar de alguém que você magoou, peça perdão.",
            "O amor a Deus se manifesta no amor ao próximo.",
            "Pequenos atos de obediência geram grandes níveis de intimidade."
        ],
        verse: "Se me amais, guardareis os meus mandamentos.",
        verseRef: "João 14:15",
        action: "Faça algo gentil por alguém hoje sem esperar nada em troca, em nome de Jesus."
    },
    {
        id: 6,
        title: "Não Caminhe Sozinho",
        subtitle: "A brasa longe do fogo se apaga",
        description: "A vida cristã é comunitária. Estar perto de Jesus também significa estar perto do Seu corpo, que é a Igreja.",
        advice: [
            "Procure amigos que te empurrem para mais perto de Deus.",
            "Compartilhe sua jornada com alguém de confiança.",
            "Participe de momentos de oração coletiva, eles renovam as forças."
        ],
        verse: "Onde estiverem dois ou três reunidos em meu nome, ali estou eu.",
        verseRef: "Mateus 18:20",
        action: "Mande uma mensagem para um amigo cristão hoje e peça: 'Ore por mim nesta semana'."
    },
    {
        id: 7,
        title: "Vencendo a Barreira da Culpa",
        subtitle: "Ocupar-se do Perdão, não do erro",
        description: "O maior inimigo da reaproximação é a culpa. O inimigo quer que você olhe para o seu pecado; Deus quer que você olhe para o Seu perdão total e absoluto através da Cruz.",
        advice: [
            "Arrepender-se não é sentir remorso, é mudar de direção.",
            "A voz que te condena nunca vem de Deus. Ele te convence do erro para te curar, não para te destruir.",
            "Se Deus já esqueceu o seu passado, por que você ainda o carrega?"
        ],
        verse: "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar.",
        verseRef: "1 João 1:9",
        action: "Escreva em um papel um pecado que te atormenta, ore pedindo perdão e rasgue-o como símbolo da liberdade que Cristo te deu."
    },
    {
        id: 8,
        title: "Adoração como Arma",
        subtitle: "Louvor muda o ambiente espiritual",
        description: "Muitas vezes não 'sentimos' vontade de orar. É nessas horas que o louvor entra como uma ferramenta de guerra. A música certa alinha seu coração à frequência do Céu.",
        advice: [
            "Cante mesmo sem vontade; o sacrifício de louvor é precioso para Deus.",
            "Deixe o louvor tocar em sua casa, mesmo que você não esteja ouvindo atentamente.",
            "Declare as verdades das letras sobre as suas circunstâncias."
        ],
        verse: "Entrai por suas portas com ações de graças e em seus átrios com louvor.",
        verseRef: "Salmos 100:4",
        action: "Escolha um louvor agora e ouça-o de olhos fechados, focando apenas na grandeza de Deus."
    },
    {
        id: 9,
        title: "A Sentinela da Mente",
        subtitle: "Filtrando o que entra no seu coração",
        description: "Seus olhos e ouvidos são portas. Se você consome apenas ansiedade e futilidade o dia todo, sua fé terá dificuldade em respirar. Proteja seus pensamentos.",
        advice: [
            "Selecione melhor os perfis que você segue nas redes sociais.",
            "Troque 15 minutos de notícias ruins por 15 minutos de conteúdo que edifica.",
            "O que você alimenta, cresce. O que você ignora, morre."
        ],
        verse: "Tudo o que é verdadeiro... nisso pensai.",
        verseRef: "Filipenses 4:8",
        action: "Desinstale ou silencie por 24h uma fonte de conteúdo que costuma te deixar ansioso ou irritado."
    },
    {
        id: 10,
        title: "O Amigo que Mora em Você",
        subtitle: "Dependendo do Espírito Santo",
        description: "Você não precisa de força de vontade, mas de dependência. O Espírito Santo é o seu Ajudador, o Guia que te conduz de volta aos braços do Pai a cada segundo.",
        advice: [
            "Diga 'Bom dia, Espírito Santo' ao acordar.",
            "Peça que Ele te lembre da Palavra nos momentos de teste.",
            "Ele é o seu selo de garantia: você pertence a Deus, não importa o que aconteça."
        ],
        verse: "O Consolador, o Espírito Santo... vos ensinará todas as coisas.",
        verseRef: "João 14:26",
        action: "Feche os olhos por um minuto e apenas diga: 'Espírito Santo, eu dependo de Ti. Guia os meus passos hoje'."
    }
];
