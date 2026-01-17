import React, { useState } from 'react';
import { BookOpen, ArrowLeft, Heart, Star, Sun, CloudRain, Shield, Fish, Crown, Sparkles, Gift, Smile, Leaf, Users, Flame, Baby, Cross, Waves, Wheat, TreePine, X } from 'lucide-react';

/* --- TYPES --- */
type Story = {
    id: string;
    title: string;
    icon: React.ElementType;
    color: string;
    bgGradient: string;
    description: string;
    panels: {
        text: string;
        image: string;
    }[];
    mission: string;
    missionIcon: React.ElementType;
};

/* --- CONTENT --- */
const STORIES: Story[] = [
    {
        id: 'creation',
        title: 'A Criação do Mundo',
        icon: Sun,
        color: 'text-orange-600',
        bgGradient: 'from-orange-400 to-yellow-300',
        description: 'Como Deus criou todas as coisas lindas que vemos.',
        panels: [
            {
                text: "No começo, não existia nada. Estava tudo escuro. Mas Deus teve uma ideia incrível!",
                image: "https://files.catbox.moe/frihf9.png" // Galaxy
            },
            {
                text: "Ele disse: 'Haja luz!', e a luz apareceu. Ele criou o sol brilhante, a lua e as estrelinhas no céu.",
                image: "https://files.catbox.moe/jhi0hn.png" // Sun
            },
            {
                text: "Deus também criou as árvores, as flores cheirosas e os animais fofinhos. Leões, gatinhos e muito mais!",
                image: "https://files.catbox.moe/naoca1.png" // Animals
            },
            {
                text: "E por último, Deus criou você e eu, para sermos amigos d'Ele e cuidarmos de tudo isso.",
                image: "https://files.catbox.moe/butqr8.png" // Children Nature
            }
        ],
        mission: 'A missão de hoje é cuidar da natureza! Que tal ajudar a regar uma plantinha ou fazer carinho no seu bichinho de estimação?',
        missionIcon: Leaf
    },
    {
        id: 'noah',
        title: 'A Arca de Noé',
        icon: CloudRain,
        color: 'text-blue-600',
        bgGradient: 'from-blue-400 to-cyan-300',
        description: 'Um grande barco e muitos animais!',
        panels: [
            {
                text: "Deus pediu para Noé construir um barco gigante, chamado arca. Todo mundo achou estranho, mas Noé obedeceu.",
                image: "https://files.catbox.moe/ddpe4u.png" // Boat model/Painting
            },
            {
                text: "Ele colocou um casal de cada bichinho lá dentro: dois elefantes, duas girafas, dois passarinhos...",
                image: "https://files.catbox.moe/ov3kbq.png" // Animals
            },
            {
                text: "Então, começou a chover muito! Mas Noé, sua família e os bichinhos estavam seguros dentro da arca.",
                image: "https://files.catbox.moe/4hl4qa.png" // Stormy Sea
            },
            {
                text: "Depois da chuva, Deus colocou um arco-íris lindo no céu como uma promessa de amor.",
                image: "https://files.catbox.moe/q8kmok.png" // Rainbow
            }
        ],
        mission: 'Obedecer é muito importante! Hoje, quando o papai ou a mamãe pedirem algo, obedeça rapidinho e com um sorriso!',
        missionIcon: Heart
    },
    {
        id: 'david',
        title: 'Davi e o Gigante',
        icon: Shield,
        color: 'text-emerald-700',
        bgGradient: 'from-emerald-500 to-green-400',
        description: 'O pequeno menino que venceu com coragem.',
        panels: [
            {
                text: "Davi era um menino pequeno que cuidava de ovelhas. Mas ele amava muito a Deus.",
                image: "https://files.catbox.moe/v481y3.png" // Sheep
            },
            {
                text: "Um gigante chamado Golias apareceu. Ele era enorme, tinha armadura e assustou todo mundo!",
                image: "https://files.catbox.moe/p6fr28.png" // Armor
            },
            {
                text: "Mas Davi não ficou com medo. Ele disse: 'Deus está comigo!' e pegou uma pedrinha no rio.",
                image: "https://files.catbox.moe/1lzbgg.png" // Stones
            },
            {
                text: "Com coragem e muita fé, Davi venceu o gigante e salvou seu povo! Deus ajuda os corajosos.",
                image: "https://files.catbox.moe/pxqd1b.png" // Sunrise Light
            }
        ],
        mission: 'Você também pode ser corajoso! Se estiver com medo do escuro ou de algo, lembre-se: Jesus está com você!',
        missionIcon: Star
    },
    {
        id: 'jonah',
        title: 'Jonas e o Grande Peixe',
        icon: Fish,
        color: 'text-teal-600',
        bgGradient: 'from-teal-400 to-cyan-500',
        description: 'Uma viagem incrível dentro de um peixe!',
        panels: [
            {
                text: "Deus pediu para Jonas ir a uma cidade. Jonas fugiu e entrou em um barco para outro lugar.",
                image: "https://files.catbox.moe/lt3cdh.png" // Ship Storm
            },
            {
                text: "Uma grande tempestade começou, e Jonas acabou caindo no mar. Glub, glub, glub!",
                image: "https://files.catbox.moe/tz82tl.png" // Underwater
            },
            {
                text: "Sabe o que aconteceu? Um grande peixe engoliu Jonas! Ele orou na barriga do peixe por três dias.",
                image: "https://files.catbox.moe/ce1wng.png" // Whale Tail
            },
            {
                text: "O peixe levou Jonas para a areia. Jonas aprendeu a lição e foi obedecer a Deus feliz.",
                image: "https://files.catbox.moe/k302ba.png" // Beach
            }
        ],
        mission: 'Sempre fale a verdade e peça desculpas quando fizer algo errado. Deus ama quando somos sinceros!',
        missionIcon: Smile
    },
    {
        id: 'jesus',
        title: 'O Nascimento de Jesus',
        icon: Crown,
        color: 'text-purple-600',
        bgGradient: 'from-purple-500 to-pink-400',
        description: 'O maior presente que o mundo já recebeu.',
        panels: [
            {
                text: "Em uma noite estrelada, nasceu o bebê Jesus, o salvador do mundo.",
                image: "https://files.catbox.moe/0u85rj.png" // Starry Night
            },
            {
                text: "Uma estrela muito brilhante guiou pastores e reis até Ele.",
                image: "https://files.catbox.moe/b9aivq.png" // Star
            },
            {
                text: "Jesus não tinha um berço chique, ele dormiu em uma manjedoura, onde os animais comem.",
                image: "https://files.catbox.moe/53064n.png" // Hay
            },
            {
                text: "Ele veio ao mundo para nos ensinar o amor verdadeiro e ser nosso melhor amigo.",
                image: "https://files.catbox.moe/z0u3cf.png" // Baby hand
            }
        ],
        mission: 'Jesus foi o maior presente de Deus. Hoje, faça um desenho bem bonito e dê de presente para alguém que você ama!',
        missionIcon: Gift
    },
    {
        id: 'moses',
        title: 'Moisés e o Mar Vermelho',
        icon: Waves,
        color: 'text-blue-700',
        bgGradient: 'from-blue-500 to-indigo-400',
        description: 'O dia em que o mar se abriu!',
        panels: [
            {
                text: "O povo de Deus estava fugindo, mas chegaram na frente de um mar enorme!",
                image: "https://files.catbox.moe/y26exu.png" // Sea Waves
            },
            {
                text: "Olharam para trás e viram os soldados maus. Ficaram com muito medo.",
                image: "https://files.catbox.moe/hzbedr.png" // Desert
            },
            {
                text: "Moisés orou e Deus fez um milagre: o mar se abriu ao meio!",
                image: "https://files.catbox.moe/ihhqbi.png" // Wave crashing/Opening symbolic
            },
            {
                text: "Eles passaram pelo mar seco e ficaram salvos! Deus sempre cuida dos Seus filhos.",
                image: "https://files.catbox.moe/c9higa.png" // Sunrise Path
            }
        ],
        mission: 'Quando você tiver um problema difícil, ore e confie em Deus. Ele sempre tem uma solução!',
        missionIcon: Heart
    },
    {
        id: 'daniel',
        title: 'Daniel na Cova dos Leões',
        icon: Shield,
        color: 'text-amber-700',
        bgGradient: 'from-amber-500 to-orange-400',
        description: 'Protegido por anjos!',
        panels: [
            {
                text: "Daniel orava a Deus todos os dias. Mas o rei malvado disse que isso era proibido!",
                image: "https://images.unsplash.com/photo-1606834579178-5a23e8020580?auto=format&fit=crop&q=80" // Praying Hands
            },
            {
                text: "Daniel continuou orando. Então jogaram ele numa cova cheia de leões famintos!",
                image: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?auto=format&fit=crop&q=80" // Lion
            },
            {
                text: "Mas Deus mandou um anjo fechar a boca dos leões. Daniel dormiu tranquilo.",
                image: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?auto=format&fit=crop&q=80" // Stars/Angel view
            },
            {
                text: "No dia seguinte, Daniel estava bem! O rei viu que o Deus de Daniel é poderoso.",
                image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80" // Sunrise Freedom
            }
        ],
        mission: 'Ore todos os dias! Fale com Deus de manhã, de tarde e antes de dormir. Ele sempre escuta você!',
        missionIcon: Star
    },
    {
        id: 'feeding',
        title: 'Jesus Alimenta 5 Mil',
        icon: Wheat,
        color: 'text-yellow-700',
        bgGradient: 'from-yellow-400 to-amber-300',
        description: 'Um lanche que virou festa!',
        panels: [
            {
                text: "Muita gente foi ouvir Jesus, mas ficou tarde e todos sentiram fome.",
                image: "https://images.unsplash.com/photo-1464226184884-bb28913025ad?auto=format&fit=crop&q=80" // Crowd
            },
            {
                text: "Um menino compartilhou seu lanche: 5 pães e 2 peixinhos.",
                image: "https://images.unsplash.com/photo-1509440159596-0249088b7280?auto=format&fit=crop&q=80" // Bread
            },
            {
                text: "Jesus agradeceu e a comida multiplicou! Nunca acabava!",
                image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80" // Miracle Light
            },
            {
                text: "Todos comeram e ainda sobraram 12 cestas. Jesus é incrível!",
                image: "https://images.unsplash.com/photo-1563805909946-4cb7577a7dfc?auto=format&fit=crop&q=80" // Baskets
            }
        ],
        mission: 'Compartilhe o que você tem! Divida seus brinquedos, lanches e amor com os amigos.',
        missionIcon: Gift
    },
    {
        id: 'good-samaritan',
        title: 'O Bom Samaritano',
        icon: Users,
        color: 'text-rose-600',
        bgGradient: 'from-rose-400 to-pink-400',
        description: 'Ajudando quem precisa.',
        panels: [
            {
                text: "Um homem viajava e foi machucado por ladrões. Ficou caído na estrada.",
                image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80" // Travel Road
            },
            {
                text: "Pessoas importantes passaram, mas não ajudaram. Que triste!",
                image: "https://images.unsplash.com/photo-1516054719006-2cb33583ae09?auto=format&fit=crop&q=80" // Walking away
            },
            {
                text: "Mas um samaritano parou, cuidou dele e o levou para um lugar seguro.",
                image: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?auto=format&fit=crop&q=80" // Helping hand
            },
            {
                text: "Jesus ensinou: devemos amar e ajudar a todos, sempre.",
                image: "https://images.unsplash.com/photo-1516641396056-07711f18ac0a?auto=format&fit=crop&q=80" // Care
            }
        ],
        mission: 'Seja gentil com TODOS! Ajude quem está triste, compartilhe e seja um bom amigo.',
        missionIcon: Heart
    },
    {
        id: 'resurrection',
        title: 'Jesus Venceu a Morte',
        icon: Cross,
        color: 'text-violet-700',
        bgGradient: 'from-violet-500 to-purple-400',
        description: 'O dia mais feliz de todos!',
        panels: [
            {
                text: "Jesus morreu na cruz por amor a nós. Seus amigos ficaram muito tristes.",
                image: "https://images.unsplash.com/photo-1516496660144-8c887372ba36?auto=format&fit=crop&q=80" // Cross
            },
            {
                text: "Ele foi colocado numa caverna fechada com uma pedra gigante.",
                image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80" // Cave
            },
            {
                text: "Mas no terceiro dia, a pedra rolou e Jesus saiu vivo! Ele venceu!",
                image: "https://images.unsplash.com/photo-1507646580971-f9c9966110f6?auto=format&fit=crop&q=80" // Sun burst light
            },
            {
                text: "Jesus está vivo para sempre e quer ser seu amigo. Aleluia!",
                image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&q=80" // Joy/Field
            }
        ],
        mission: 'Conte para alguém hoje que Jesus está vivo e ama muito essa pessoa!',
        missionIcon: Heart
    }
];

const KidsStories: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [activeStory, setActiveStory] = useState<Story | null>(null);

    // RENDER: STORY COMIC LAYOUT
    if (activeStory) {
        return (
            <div className="min-h-screen bg-stone-100 font-kids fixed inset-0 z-50 overflow-y-auto">
                <div className="bg-white max-w-5xl mx-auto min-h-screen shadow-2xl relative">

                    {/* Header Stick */}
                    <div className={`sticky top-0 z-20 bg-gradient-to-r ${activeStory.bgGradient} p-4 flex items-center gap-4 shadow-md`}>
                        <button
                            onClick={() => setActiveStory(null)}
                            className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-all backdrop-blur-sm"
                        >
                            <ArrowLeft size={32} strokeWidth={3} />
                        </button>
                        <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-md tracking-wide">
                            {activeStory.title}
                        </h2>
                    </div>

                    {/* Comics Grid */}
                    <div className="p-6 md:p-8 space-y-12">

                        {/* Grid de Quadrinhos */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {activeStory.panels.map((panel, index) => (
                                <div
                                    key={index}
                                    className="group relative bg-white border-[6px] border-stone-800 shadow-[8px_8px_0px_0px_rgba(28,25,23,0.2)] rounded-2xl overflow-hidden hover:scale-[1.01] transition-transform duration-300"
                                >
                                    {/* Imagem (Area do Quadrinho) */}
                                    <div className="aspect-[4/3] overflow-hidden relative border-b-[6px] border-stone-800">
                                        <div className="absolute inset-0 bg-stone-200"></div>
                                        <img
                                            src={panel.image}
                                            alt={`Cena ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Badge Numero */}
                                        <div className="absolute top-4 left-4 w-10 h-10 bg-yellow-400 border-4 border-stone-800 rounded-full flex items-center justify-center font-black text-xl text-stone-900 shadow-md z-10">
                                            {index + 1}
                                        </div>
                                    </div>

                                    {/* Legenda (Balão de Texto) */}
                                    <div className="p-5 bg-white relative">
                                        <p className="text-xl md:text-2xl font-bold text-stone-800 leading-snug">
                                            {panel.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mission Box Style Comics */}
                        <div className="bg-yellow-100 border-[6px] border-stone-800 rounded-[2rem] p-8 relative shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transform rotate-1 hover:rotate-0 transition-transform mt-12">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-xl font-black uppercase tracking-wider border-4 border-stone-800 text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                Sua Missão!
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-6 mt-4">
                                <div className={`w-24 h-24 rounded-full border-4 border-stone-800 bg-gradient-to-br ${activeStory.bgGradient} flex items-center justify-center text-white shrink-0 animate-bounce-slow`}>
                                    <activeStory.missionIcon size={40} strokeWidth={3} />
                                </div>
                                <p className="text-2xl md:text-3xl font-black text-stone-800 text-center md:text-left leading-tight">
                                    "{activeStory.mission}"
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    // RENDER: LIST (Menu)
    return (
        <div className="min-h-screen bg-stone-100 p-6 md:p-8 font-kids">

            {/* Header */}
            <div className="max-w-6xl mx-auto mb-10 flex items-center gap-6">
                <button onClick={onBack} className="p-4 bg-white rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] border-4 border-stone-800 text-stone-800 hover:translate-y-1 hover:shadow-none transition-all">
                    <ArrowLeft size={32} strokeWidth={3} />
                </button>
                <div>
                    <h1 className="text-5xl md:text-6xl font-black text-stone-800 uppercase tracking-tight drop-shadow-sm">
                        Histórinhas
                    </h1>
                    <div className="h-4 w-full bg-yellow-400 -mt-4 -z-10 relative opacity-60 rounded-full"></div>
                    <p className="text-stone-500 font-bold text-xl mt-2 ml-1">Toque para ler as aventuras!</p>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {STORIES.map((story) => (
                    <button
                        key={story.id}
                        onClick={() => setActiveStory(story)}
                        className="group relative h-72 bg-white rounded-[2rem] border-[5px] border-stone-800 shadow-[8px_8px_0px_0px_rgba(28,25,23,0.2)] hover:shadow-[12px_12px_0px_0px_rgba(28,25,23,0.2)] hover:-translate-y-1 transition-all overflow-hidden text-left flex flex-col"
                    >
                        {/* Top Color Bar w/ Icon */}
                        <div className={`h-24 bg-gradient-to-r ${story.bgGradient} p-4 flex items-center justify-between border-b-[5px] border-stone-800`}>
                            <div className="bg-white/30 backdrop-blur-md p-3 rounded-xl border-2 border-white/50 text-white">
                                <story.icon size={32} strokeWidth={3} />
                            </div>
                            <BookOpen size={24} className="text-white/60" />
                        </div>

                        {/* Title and Description */}
                        <div className="p-6 flex-1 flex flex-col justify-center relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                            <h3 className={`text-2xl font-black ${story.color} mb-2 uppercase leading-none`}>
                                {story.title}
                            </h3>
                            <p className="text-stone-500 font-bold text-sm leading-tight line-clamp-2">
                                {story.description}
                            </p>

                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                <div className="bg-stone-800 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase">
                                    Ler Agora
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default KidsStories;
