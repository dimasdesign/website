const asciiImage = `


                                                                                                    
                                                                                                    
                                                                                                    
       ███████████████    ██████                                                                    
     ██████████████████   ███████                                                                   
    ████████████████████  ████████                                                                  
    ███████████████████  ████████                                                                   
    ████████   ████████  ████████      ████████████          ███████████           ███████████      
   ████████    ████████  ████████   █████████████████     █████████████████     ████████████████    
   ███████████████████  ████████   ███████████████████   ██████████████████   ███████████████████   
   ███████████████████  ████████  ████████████████████  ███████████████████   ███████████████████   
    ████████████████    ████████  ████████   ████████   ████████   ████████  ████████    ████████   
      ███████████      ████████   ████████   ████████  ████████    ████████  ████████   ████████    
                       ████████  ████████████████████  ███████████████████   ███████████████████    
                       ████████  ███████████████████   ███████████████████  ████████████████████    
                       ███████   ██████████████████    ██████████████████    ██████████████████     
                        ██████    ████████████████      ███████████████       ███████████████       
                                                                                                    
                                                                                                    
                                                                                                    


`;

const container = document.getElementById('ascii-art');
container.style.fontFamily = 'monospace';

const pre = document.createElement('pre');
pre.setAttribute('aria-label', 'my logo as ascii image');
container.appendChild(pre);

// CONFIGURAÇÕES DE VELOCIDADE
const speed = 30; // Tempo de espera entre atualizações (em ms). Tente 10, 20, 50.
const charsPerFrame = 20; // Quantos caracteres desenhar de uma vez. Tente aumentar para ir mais rápido.

let i = 0;

function typeWriter() {
    if (i < asciiImage.length) {
        // Calcula o ponto final do próximo bloco de texto
        // Math.min garante que não tentaremos pegar mais texto do que existe no final
        let nextIndex = Math.min(i + charsPerFrame, asciiImage.length);

        // Pega um pedaço (substring) do texto, do ponto atual até o próximo índice
        let chunk = asciiImage.substring(i, nextIndex);

        // Atualiza o DOM apenas UMA vez com o bloco inteiro
        pre.textContent += chunk;

        // Atualiza o nosso contador para o final do bloco que acabamos de inserir
        i = nextIndex;

        // Chama a próxima execução
        setTimeout(typeWriter, speed);
    }
}

// Inicia
typeWriter();