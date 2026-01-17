
export interface Psalm {
    id: number;
    title: string;
    number: number;
    explanation: string;
    verse: string;
    practicalApplication: string;
    tags: string[];
}

export const PSALMS: Psalm[] = [
    {
        id: 1,
        title: "O Senhor é meu Pastor",
        number: 23,
        explanation: "O Salmo 23 é talvez o texto mais conhecido da Bíblia. Ele descreve Deus como um pastor cuidadoso que não deixa faltar nada às suas ovelhas. Mesmo em vales escuros (momentos de depressão, medo ou perda), Sua mão nos guia.",
        verse: "O Senhor é o meu pastor; nada me faltará.",
        practicalApplication: "Quando o desespero bater, feche os olhos e imagine Jesus como esse pastor. Ele não está longe nas nuvens; Ele está no campo com você, pronto para te defender e te alimentar. Descanse na provisão d'Ele hoje.",
        tags: ["Segurança", "Provisão", "Paz"]
    },
    {
        id: 2,
        title: "Socorro bem presente",
        number: 46,
        explanation: "Este salmo foi escrito em um momento de crise nacional. Ele nos lembra que mesmo que a terra mude ou os montes caiam no mar (metáforas para grandes tragédias), Deus é nosso refúgio e fortaleza. Ele é maior que qualquer problema.",
        verse: "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.",
        practicalApplication: "Se você recebeu uma notícia ruim hoje, ou se sente que o seu mundo está desmoronando, lembre-se: Deus é um castelo inabalável. Entre nesse castelo através da oração e fique protegido.",
        tags: ["Proteção", "Força", "Refúgio"]
    },
    {
        id: 3,
        title: "Onde vem o meu socorro?",
        number: 121,
        explanation: "Olhar para os montes era olhar para o perigo (onde ficavam assaltantes). O salmista declara que seu socorro não vem de lugares altos ou de homens, mas do Criador de tudo. Ele não dorme e nos guarda de todo mal.",
        verse: "Elevo os meus olhos para os montes; de onde me virá o socorro? O meu socorro vem do Senhor, que fez os céus e a terra.",
        practicalApplication: "Pare de procurar soluções apenas em pessoas ou no seu próprio esforço. Olhe para cima. Deus está vigiando cada passo seu, cuidando da sua entrada e da sua saída agora mesmo.",
        tags: ["Vigilância", "Cuidado", "Fé"]
    },
    {
        id: 4,
        title: "Deus me conhece por inteiro",
        number: 139,
        explanation: "Este é o salmo da intimidade. Ele diz que Deus nos viu antes mesmo de nascermos e conhece cada pensamento nosso antes de falarmos. Não há lugar onde possamos fugir da Sua presença.",
        verse: "Senhor, tu me sondas e me conheces... Para onde me irei do teu Espírito?",
        practicalApplication: "Você nunca está sozinho, nem quando se sente incompreendido. Deus te entende melhor do que você mesmo. Fale com Ele com sinceridade, Ele já sabe de tudo e mesmo assim te ama profundamente.",
        tags: ["Intimidade", "Amor", "Presença"]
    },
    {
        id: 5,
        title: "A felicidade do justo",
        number: 1,
        explanation: "O Salmo 1 abre o livro de Salmos mostrando o contraste entre quem segue os conselhos do mundo e quem medita na Palavra de Deus. Quem vive com Deus é como uma árvore plantada junto a águas: sempre verde e com frutos.",
        verse: "Bem-aventurado o homem que não anda segundo o conselho dos ímpios... antes, o seu prazer está na lei do Senhor.",
        practicalApplication: "Cuidado com quem você ouve. Seus 'conselheiros' moldam seu futuro. Escolha passar mais tempo ouvindo a voz de Deus (na Bíblia) do que o barulho das redes sociais. Suas folhas não murcharão.",
        tags: ["Escolhas", "Sabedoria", "Prosperidade"]
    },
    {
        id: 6,
        title: "Um coração quebrantado",
        number: 51,
        explanation: "Davi escreveu este salmo após cometer um erro grave. É a oração de alguém que reconhece que falhou e pede por um novo coração. Ele nos ensina que Deus não despreza alguém que se arrepende de verdade.",
        verse: "Cria em mim, ó Deus, um coração puro e renova dentro de mim um espírito inabalável.",
        practicalApplication: "Errou feio? Não se esconda de Deus. O arrependimento é a chave para a restauração. Ele não quer te punir; Ele quer te limpar e te dar um novo começo. Peça perdão e recomece hoje.",
        tags: ["Perdão", "Arrependimento", "Restauração"]
    },
    {
        id: 7,
        title: "Sob a sombra do Onipotente",
        number: 91,
        explanation: "O 'Salmo da Proteção'. Ele fala sobre habitar no esconderijo do Altíssimo. É uma promessa de livramento contra pragas, guerras e inimigos para aqueles que fazem de Deus a sua habitação.",
        verse: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.",
        practicalApplication: "Fazer de Deus sua 'habitação' significa viver em constante conversa com Ele. Não é apenas visitar aos domingos. Quando você mora com Deus, o medo perde o poder sobre sua casa.",
        tags: ["Proteção Divina", "Segurança", "Descanso"]
    },
    {
        id: 8,
        title: "A alegria vem pela manhã",
        number: 30,
        explanation: "Um salmo de gratidão após uma cura ou livramento. Ele reconhece que embora a tristeza possa durar uma noite inteira, ela tem hora para acabar. Deus transforma nosso pranto em dança.",
        verse: "O choro pode durar uma noite, mas a alegria vem pela manhã.",
        practicalApplication: "Sua 'noite' de dor está demorando a passar? Não desista. O sol de Deus vai nascer. A fase que você está vivendo não é o fim da sua história. Aguente firme, o amanhecer está chegando.",
        tags: ["Esperança", "Superação", "Alegria"]
    },
    {
        id: 9,
        title: "Espera no Senhor",
        number: 27,
        explanation: "Davi declara que não tem medo de exércitos porque Deus é sua luz e salvação. O segredo dele é 'esperar no Senhor'. Ele pede apenas uma coisa: habitar na casa de Deus para sempre.",
        verse: "O Senhor é a minha luz e a minha salvação; de quem terei medo?",
        practicalApplication: "O medo é o barulho da falta de confiança. Quando você foca na luz de Deus, os gigantes ao redor ficam pequenos. Se você se sente pressionado hoje, pare e simplesmente adore. O medo fugirá.",
        tags: ["Coragem", "Confiança", "Luz"]
    },
    {
        id: 10,
        title: "O valor da Palavra",
        number: 119,
        explanation: "O capítulo mais longo da Bíblia é totalmente dedicado à Palavra de Deus. Ele diz que os mandamentos são lâmpada para os pés e luz para o caminho, nos guiando no escuro.",
        verse: "Lâmpada para os meus pés é tua palavra e luz, para o meu caminho.",
        practicalApplication: "Não sabe que decisão tomar? A Bíblia tem a resposta. Ela não te dá o mapa do futuro inteiro, mas te dá luz para o 'próximo passo'. Leia um pouco e você verá o caminho clarear.",
        tags: ["Direção", "Bíblia", "Luz"]
    }
];
