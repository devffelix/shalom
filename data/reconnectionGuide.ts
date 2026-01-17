
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
    }
];
