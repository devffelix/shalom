
# Shalom - Jornada Espiritual & Microsaas

Shalom é uma aplicação web progressiva (PWA) focada em bem-estar espiritual, combinando leitura bíblica, gamificação, música e ferramentas interativas para toda a família.

## 🚀 Funcionalidades Principais

### 1. Bíblia e Leitura
- Leitura completa da Bíblia (API bible-api.com).
- Acompanhamento de progresso por livro e capítulo.
- Sistema de XP por capítulo lido.
- Anotações e marcações de versículos.

### 2. Gamificação
- **Sistema de Níveis**: De "Peregrino da Fé" a "Embaixador do Céu".
- **Badges/Conquistas**: Desbloqueáveis por leitura (livros completos) ou jornadas.
- **Ofensiva (Streak)**: Contador de dias consecutivos.
- **Trivia**: Quiz bíblico com pontuação, combos e feedback imediato.

### 3. Louvor & Adoração
- Player de música integrado.
- Visualizador de áudio simulado.
- Playlist curada com foco espiritual.

### 4. Jornadas (Desafios)
- Planos de leitura temáticos (Ansiedade, Gratidão, Sabedoria, etc.).
- Acompanhamento diário com reflexões e ações práticas geradas via IA.

### 5. Kids Zone (Novo Módulo Completo)
- **Criador Mágico (IA)**: Geração de desenhos para colorir inéditos usando Google Gemini.
- **Coloring Book Digital**: Algoritmo de preenchimento inteligente (Flood Fill) para pintar as imagens geradas.
- **Cabine Divertida**: Uso da câmera do dispositivo para tirar fotos com molduras cristãs e stickers.
- **Quiz Kids**: Perguntas bíblicas simplificadas com interface lúdica.

## 🛠 Stack Tecnológica

- **Frontend**: React 18, TypeScript, Vite.
- **Estilização**: Tailwind CSS (Dark Mode nativo).
- **Ícones**: Lucide React.
- **Backend/Serviços**: 
  - **Supabase**: Autenticação, Banco de Dados (Postgres) e Analytics em tempo real.
  - **Google Gemini AI**: Geração de orações, reflexões e imagens para colorir (`gemini-2.5-flash-image`).
  - **Bible API**: Texto bíblico.

## 📂 Estrutura de Pastas Importantes

- `/components`: Componentes reutilizáveis (Layout, Players, ColoringBook, BibleTrivia).
- `/pages`: Rotas principais da aplicação (incluindo `Illustrations.tsx` que contém o Kids Zone).
- `/services`: Integrações com APIs externas (Supabase, Gemini) e lógica de gamificação.
- `/contexts`: Gerenciamento de estado global (AudioContext).
- `/docs`: Documentação técnica e funcional.
