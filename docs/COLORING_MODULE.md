
# Documentação Técnica: Módulo Kids Zone & IA

Este documento detalha a implementação técnica das funcionalidades infantis localizadas em `pages/Illustrations.tsx` e `components/ColoringBook.tsx`.

## 🎨 1. Criador Mágico (Geração de Imagens IA)

O sistema permite que a criança solicite qualquer desenho e a IA gera uma imagem preto e branco otimizada para colorir (Line Art).

### Fluxo de Dados
1.  **Input**: Usuário digita um prompt ou seleciona uma ideia pronta.
2.  **API Call**: `ai.models.generateContent` é chamado usando o modelo `gemini-2.5-flash-image`.
3.  **Prompt Engineering**: O prompt do usuário é injetado em um template de sistema: *"Crie um desenho para colorir infantil (line art, preto e branco, sem preenchimento, traços grossos) sobre: {prompt}. Estilo cartoon fofo."*.
4.  **Processamento**: A resposta da API (base64) é convertida para DataURL e renderizada em um Canvas HTML5.

## 🖌 2. Livro de Colorir (ColoringBook.tsx)

Implementa um motor de pintura digital capaz de colorir tanto vetores (SVG) quanto imagens rasterizadas (PNG/JPG gerados pela IA).

### Algoritmo: Flood Fill (Preenchimento de Balde)
Para permitir o preenchimento de áreas delimitadas por linhas pretas, utilizamos um algoritmo **Flood Fill baseado em Pilha (Stack-based)** operando diretamente nos pixels do Canvas.

**Lógica do Algoritmo:**
1.  **Acesso aos Pixels**: Utilizamos `ctx.getImageData()` para acessar o array `Uint8ClampedArray` de pixels.
2.  **Verificação de Cor**: Ao clicar, a cor do pixel alvo é registrada. Se for igual à cor atual da paleta, a operação é abortada.
3.  **Expansão (Stack)**:
    *   Inicia no pixel clicado.
    *   Verifica pixels vizinhos (4 direções).
    *   Compara a cor do vizinho com a cor alvo usando uma **tolerância** (para lidar com *anti-aliasing* das imagens geradas por IA, que não têm preto absoluto nas bordas).
    *   Pinta o pixel e adiciona vizinhos válidos à pilha.
4.  **Renderização**: O novo estado é aplicado via `ctx.putImageData()`.

### Gerenciamento de Memória
*   **Histórico (Undo)**: O estado completo do Canvas é salvo em um array. Limitamos o histórico a **10 passos** para evitar consumo excessivo de memória RAM no dispositivo do usuário.

## 📸 3. Cabine Divertida (Photo Booth)

Funcionalidade de Realidade Aumentada simulada usando APIs Web padrão.

### Arquitetura
1.  **Media Stream**: Acesso à webcam via `navigator.mediaDevices.getUserMedia`.
2.  **Espelhamento**: O vídeo é invertido horizontalmente (`scaleX(-1)`) via CSS para experiência natural de espelho.
3.  **Composição**:
    *   Molduras e Stickers são sobrepostos via HTML/CSS absoluto sobre o vídeo.
    *   Ao capturar ("Tirar Foto"), o frame atual do vídeo é desenhado em um Canvas off-screen.
    *   Os elementos gráficos (molduras, textos) são redesenhados programaticamente no Canvas Context 2D sobre o frame do vídeo.
    *   O resultado final é exportado como PNG de alta resolução.

## 🧠 4. Quiz Kids

Máquina de estados simples para fluxo linear:
*   **Estado**: `menu` -> `activeTheme` -> `question[index]` -> `finished`.
*   **Feedback**: Feedback visual imediato (Verde/Vermelho) sem bloqueio, mantendo o fluxo lúdico.
*   **Design**: Uso de fontes arredondadas (`Fredoka`) e cores saturadas para apelo infantil.
