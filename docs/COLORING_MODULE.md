
# Documentação Técnica: Módulo Kids Zone

Este documento detalha a implementação técnica das funcionalidades infantis localizadas em `pages/Illustrations.tsx` e `components/ColoringBook.tsx`.

## 🎨 1. Criador Mágico (Geração de Imagens IA)

O sistema permite que a criança solicite qualquer desenho (ex: "Leão jogando bola") e a IA gera uma imagem preto e branco otimizada para colorir.

### Fluxo de Dados
1.  **Input**: Usuário digita um prompt ou seleciona um preset.
2.  **API Call**: `ai.models.generateContent` é chamado usando o modelo `gemini-2.5-flash-image`.
3.  **Prompt Engineering**: O prompt do usuário é enriquecido com instruções técnicas: *"desenho para colorir infantil, preto e branco, traços grossos, fundo branco puro"*.
4.  **Processamento**: A resposta (base64) é convertida para DataURL e injetada no componente `ColoringBook`.

## 🖌 2. Livro de Colorir (ColoringBook.tsx)

Diferente de versões anteriores baseadas em SVG vetorial, a nova versão suporta imagens rasterizadas geradas por IA utilizando manipulação de pixels direta no HTML5 Canvas.

### Algoritmo: Flood Fill (Preenchimento de Balde)
Para permitir que a criança clique em uma área branca e ela seja preenchida respeitando as linhas pretas do desenho, implementamos um algoritmo **Flood Fill baseado em Pilha (Stack-based)**.

**Como funciona:**
1.  **Captura**: Ao clicar no canvas, capturamos a cor do pixel alvo `(r,g,b,a)`.
2.  **Verificação**: Se a cor alvo for igual à cor selecionada na paleta, aborta.
3.  **Expansão**:
    *   O algoritmo varre pixels vizinhos (horizontal e vertical).
    *   Verifica se a cor do vizinho corresponde à cor alvo (dentro de uma tolerância para lidar com *anti-aliasing* das imagens geradas por IA).
    *   Pinta o pixel e adiciona vizinhos à pilha.
4.  **Otimização**: Processamento direto no `Uint8ClampedArray` (buffer de imagem) para performance em tempo real, evitando recursão excessiva que causaria *stack overflow*.

### Histórico (Undo)
*   O estado do canvas (`ImageData`) é salvo em um array `history` a cada preenchimento.
*   Permite desfazer as últimas 10 ações.

## 📸 3. Cabine Divertida (Photo Booth)

Funcionalidade que utiliza a API `navigator.mediaDevices.getUserMedia` para acessar a câmera frontal.

### Arquitetura de Camadas
A composição da foto final é feita através da sobreposição de elementos HTML/CSS para preview e posterior "renderização" em um Canvas oculto para download.

1.  **Camada de Vídeo**: Elemento `<video>` com `transform: scaleX(-1)` para efeito de espelho.
2.  **Camada de Filtros**: Filtros CSS (`grayscale`, `sepia`, `contrast`) aplicados dinamicamente baseados no tema escolhido.
3.  **Camada de Overlay**: Molduras e stickers SVG renderizados via CSS absoluto sobre o vídeo.
4.  **Captura**:
    *   Ao clicar em "Tirar Foto", o script desenha o frame atual do vídeo em um `<canvas>` off-screen.
    *   Redesenha programaticamente as molduras, gradientes e textos sobre o canvas usando a API 2D Context.
    *   Exporta para PNG.

## 🧠 4. Quiz Kids

Uma máquina de estados simples dentro de `pages/Illustrations.tsx` gerencia o fluxo:
*   **Estado**: `menu` -> `activeTheme` -> `question[index]` -> `finished`.
*   **Feedback**: Visual imediato (verde/vermelho) com delay de 1.5s antes de avançar para a próxima pergunta.
*   **UI**: Uso de fontes arredondadas (`Fredoka`) e cores vibrantes via Tailwind.

## ⚠️ Considerações de Performance

*   **Imagens IA**: As imagens são redimensionadas para no máximo 1024px no cliente antes de serem colocadas no canvas de pintura para garantir que o algoritmo Flood Fill rode suavemente em dispositivos móveis.
*   **Câmera**: O stream de vídeo é encerrado (`track.stop()`) assim que o componente é desmontado para economizar bateria e liberar o hardware.
