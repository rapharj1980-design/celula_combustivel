// Seleciona todos os elementos que possuem a classe "produto-row"
document.querySelectorAll(".produto-row").forEach((el) => {
  let timer;
  let isReading = false;

  // Função para processar texto e substituir "/" por pausa
  const processarTexto = (texto) => {
    return texto.replace(/\//g, ", ");
  };

  // Função para ler o conteúdo do elemento
  const lerElemento = () => {
    if (isReading) return;

    // Captura o texto do elemento (funciona para h1, p, li, etc.)
    const textoParaLer = processarTexto(el.innerText);

    // Configuração da síntese de voz
    const msg = new SpeechSynthesisUtterance(textoParaLer);
    msg.lang = "pt-BR";
    msg.rate = 1.1; // Velocidade levemente aumentada para fluidez

    // Efeito visual de destaque
    el.classList.add("highlight");

    msg.onstart = () => {
      isReading = true;
    };
    
    msg.onend = () => {
      isReading = false;
      el.classList.remove("highlight");
    };

    msg.onerror = () => {
      isReading = false;
      el.classList.remove("highlight");
    };

    window.speechSynthesis.speak(msg);
  };

  // Evento de clique imediato
  el.addEventListener("click", (e) => {
    // Evita que o clique em links dentro de LI dispare a navegação antes da leitura se desejar
    // e.preventDefault(); 
    window.speechSynthesis.cancel(); 
    lerElemento();
  });

  // Eventos de Mouse (Timer de 2 segundos)
  el.addEventListener("mouseenter", () => {
    timer = setTimeout(() => {
      lerElemento();
    }, 2000);
  });

  el.addEventListener("mouseleave", () => {
    clearTimeout(timer);
    // Só remove o highlight se não estiver lendo no momento
    if (!isReading) {
        el.classList.remove("highlight");
    }
  });
});
