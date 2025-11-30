function InitAsciiAnim(asciiImage, elemento, speed = 30, charsPerFrame = 20) {
  const container = document.getElementById(elemento);
  container.innerHTML = '';
  container.style.fontFamily = 'monospace';

  const pre = document.createElement('pre');
  pre.setAttribute('aria-label', 'my logo as ascii image');
  container.appendChild(pre);

  // =========================================
  // PARÂMETROS DE PERSONALIZAÇÃO GERAIS
  // =========================================
  // const speed = 30;          // Velocidade da digitação
  // const charsPerFrame = 20;  // Blocos por frame na digitação

  // =========================================
  // PARÂMETROS DO EFEITO PISCAR (BLINK)
  // =========================================
  const blinkDuration = 150; // Quanto tempo o caractere fica "apagado" (ms)
  const minBlinkDelay = 1000; // Tempo mínimo de espera até o próximo piscar
  const maxBlinkDelay = 1000; // Tempo máximo de espera até o próximo piscar

  // =========================================
  // PARÂMETROS DO EFEITO MOVER (SHIFT)
  // =========================================
  const shiftDistancePx = 100; // Distância do movimento em PIXELS (ex: 2, 5, 10)
  const shiftDuration = 50;  // Quanto tempo o caractere fica deslocado (ms) (bem rápido fica melhor)
  const minShiftDelay = 50; // Tempo mínimo de espera até o próximo movimento
  const maxShiftDelay = 50;// Tempo máximo de espera até o próximo movimento (intervalos maiores ficam melhores)


  let i = 0;
  // ... (As variáveis const asciiImage, container, pre já devem existir acima) ...

  // Função Principal de Digitação
  function typeWriter() {
    if (i < asciiImage.length) {
      let nextIndex = Math.min(i + charsPerFrame, asciiImage.length);
      let chunk = asciiImage.substring(i, nextIndex);
      pre.textContent += chunk;
      i = nextIndex;
      setTimeout(typeWriter, speed);
    } else {
      // QUANDO TERMINAR: Inicia a orquestração dos efeitos
      initEffectsOrchestra();
    }
  }

  // Prepara o HTML e inicia os loops paralelos
  function initEffectsOrchestra() {
    const originalText = pre.textContent;
    let newHtml = '';

    // 1. Envolve caracteres visíveis em spans
    for (let char of originalText) {
      // Ignora espaços e quebras de linha para não quebrar o layout
      // Nota: espaços visíveis dentro da arte devem ser tratados como caracteres se quiser animá-los
      // Se sua arte usa muitos espaços para desenhar, remova "char === ' ' ||" da condição abaixo.
      if (char === ' ' || char === '\n') {
        newHtml += char;
      } else {
        newHtml += `<span class="ascii-char">${char}</span>`;
      }
    }
    pre.innerHTML = newHtml;

    // 2. Inicia os loops independentes
    blinkRandomChar();
    shiftRandomChar();
  }


  // --- LOOP 1: Efeito Piscar ---
  function blinkRandomChar() {
    const chars = pre.getElementsByClassName('ascii-char');
    if (chars.length === 0) return;

    const selectedChar = chars[Math.floor(Math.random() * chars.length)];

    // Ativa
    selectedChar.classList.add('active-blink');

    // Desativa após o tempo definido
    setTimeout(() => {
      selectedChar.classList.remove('active-blink');
      // Agenda o próximo
      const nextDelay = Math.random() * (maxBlinkDelay - minBlinkDelay) + minBlinkDelay;
      setTimeout(blinkRandomChar, nextDelay);
    }, blinkDuration);
  }


  // --- LOOP 2: Efeito Mover (NOVO) ---
  function shiftRandomChar() {
    const chars = pre.getElementsByClassName('ascii-char');
    if (chars.length === 0) return;

    const selectedChar = chars[Math.floor(Math.random() * chars.length)];

    // 1. Define a distância dinamicamente no elemento antes de mover
    selectedChar.style.setProperty('--shift-amount', `${shiftDistancePx}px`);

    // 2. Escolhe aleatoriamente esquerda ou direita (cara ou coroa)
    const directionClass = Math.random() < 0.5 ? 'glitch-left' : 'glitch-right';

    // 3. Ativa o movimento
    selectedChar.classList.add(directionClass);

    // 4. Traz de volta ao normal após o tempo definido
    setTimeout(() => {
      selectedChar.classList.remove(directionClass);
      // Limpa a variável inline para manter o HTML limpo (opcional)
      selectedChar.style.removeProperty('--shift-amount');

      // Agenda o próximo movimento
      const nextDelay = Math.random() * (maxShiftDelay - minShiftDelay) + minShiftDelay;
      setTimeout(shiftRandomChar, nextDelay);
    }, shiftDuration);
  }

  // Inicia tudo
  typeWriter();
}