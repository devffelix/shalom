
# Shalom - Jornada Espiritual & Microsaas

Shalom é uma aplicação web progressiva (PWA) completa focada em bem-estar espiritual, combinando leitura bíblica, gamificação, inteligência artificial e ferramentas interativas para toda a família.

## 🚀 Módulos e Funcionalidades

### 1. Bíblia e Leitura (Core)
- **Leitura Completa**: Integração com API bíblica para leitura de todos os livros (`https://bible-api.com`).
- **Navegação Otimizada**: Componente `BookSelector` para troca rápida de livros e capítulos.
- **Progresso**: Rastreamento visual de capítulos lidos e barra de progresso global.
- **Timer de Estudo**: Cronômetro flutuante (`StudyTimer`) que converte tempo de leitura em XP.
- **Anotações**: Sistema de highlight e notas pessoais nos versículos.

### 2. Gamificação (Engajamento)
- **Sistema de Níveis**: 10 níveis hierárquicos (de "Peregrino" a "Embaixador").
- **Badges (Conquistas)**:
  - *Jornada*: Desbloqueados ao completar desafios temáticos.
  - *Bíblia*: Desbloqueados ao ler livros inteiros da Bíblia.
- **Streak (Ofensiva)**: Contador de dias consecutivos para incentivar o hábito.

### 3. Kids Zone (Módulo Infantil)
Um ambiente seguro e lúdico para crianças, separado do app principal.
- **Criador Mágico (GenAI)**: Gera desenhos para colorir inéditos baseados em prompts (ex: "Leão jogando bola") usando Google Gemini `gemini-2.5-flash-image`.
- **Livro de Colorir Digital**: Algoritmo "Flood Fill" para pintura inteligente no navegador.
- **Câmera Divertida**: Molduras e efeitos de Realidade Aumentada (via CSS/Canvas) para fotos temáticas.
- **Quiz Kids**: Perguntas bíblicas simplificadas com feedback visual imediato.

### 4. Funil de Vendas & Quiz (Marketing)
- **Quiz Interativo**: 18 perguntas para traçar o perfil espiritual do usuário.
- **Geração de Lead**: Captura de dados e criação de plano personalizado.
- **Página de Oferta**: Checkout integrado com timers de escassez e prova social.
- **Simulação de WhatsApp**: Demonstração visual do produto "Mentor Espiritual".

### 5. Admin Dashboard (Gestão)
Painel administrativo para visualização de métricas em tempo real (conectado ao Supabase).
- **Métricas Chave**: Total de sessões, taxa de conclusão, usuários ativos agora.
- **Análise de Funil**: Visualização de onde os usuários desistem no quiz.
- **Origem de Tráfego**: Rastreamento de UTMs (Instagram, Facebook, Google).

## 🛠 Stack Tecnológica

- **Frontend**: React 18, TypeScript, Vite.
- **Estilização**: Tailwind CSS (com suporte nativo a Dark Mode).
- **Ícones**: Lucide React.
- **Inteligência Artificial**: Google GenAI SDK (Gemini 2.5 Flash & Pro).
- **Backend & Dados**: 
  - **Supabase**: Banco de dados Postgres (Sessões, Respostas, Assinaturas).
  - **Bible API**: Texto bíblico.

## 📂 Estrutura de Pastas

- `/components`: Componentes reutilizáveis.
  - `/bible`: Sub-componentes da Bíblia (`BookSelector`, `BibleReader`, `BibleControls`, `StudyTimer`).
  - `/quiz`: Componentes do funil.
  - `ColoringBook.tsx`: Motor de pintura.
- `/pages`: Rotas principais (App, Quiz, Admin, KidsZone).
- `/services`: 
  - `api.ts`: Integração BibleAPI e Gemini.
  - `supabase.ts`: Lógica de banco de dados e analytics.
  - `gamification.ts`: Lógica de XP e Níveis.
- `/contexts`: Estados globais (Audio, Language).
- `/docs`: Documentação técnica.

## 🔒 Segurança e Performance

- **Environment Variables**: Chaves de API gerenciadas via `process.env`.
- **Lazy Loading**: Otimização de imagens e componentes pesados.
- **Fallback**: Tratamento de erros para APIs externas (fallback de versículos offline).
- **Limitação de Query**: O Dashboard administrativo possui limites de busca para não sobrecarregar o cliente.
