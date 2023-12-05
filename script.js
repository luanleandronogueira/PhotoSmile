// Função para realizar a contagem regressiva
function iniciarContagemRegressiva(segundos) {
    return new Promise(resolve => {
      var contador = segundos;
      var countdownElement = document.getElementById('countdown');
      var countdownContainer = document.getElementById('countdownContainer');

      var intervalo = setInterval(function() {
        countdownElement.textContent = contador;
        contador--;

        if (contador < 0) {
          clearInterval(intervalo);
          countdownContainer.style.display = 'none';
          resolve();
        }
      }, 1000);

      countdownContainer.style.display = 'block';
    });
  }

  // Acessa a câmera
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      var video = document.getElementById('video');
      video.srcObject = stream;
    })
    .catch(function(err) {
      console.log('Erro ao acessar a câmera: ' + err);
    });

  // Captura a foto após a contagem regressiva
  document.getElementById('capture').addEventListener('click', async function() {
    var cameraContainer = document.getElementById('cameraContainer');
    var captureContainer = document.getElementById('captureContainer');
    var countdownContainer = document.getElementById('countdownContainer');
    var processingContainer = document.getElementById('processingContainer');
    var processarButton = document.getElementById('processar');
    var enviarButton = document.getElementById('enviar');
    var tirarOutraButton = document.getElementById('tirarOutra');
    var imageContainer = document.getElementById('imageContainer');

    // Esconde a câmera e o botão de captura
    cameraContainer.style.display = 'none';
    captureContainer.style.display = 'none';

    // Inicia a contagem regressiva
    await iniciarContagemRegressiva(3);

    // Desenha o frame do vídeo no canvas
    var canvas = document.createElement('canvas'); // Criar o canvas dinamicamente
    var context = canvas.getContext('2d');
    canvas.width = 1772; // Defina as dimensões conforme necessário
    canvas.height = 1181;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Converte o conteúdo do canvas para uma imagem
    var dataURL = canvas.toDataURL('image/png');
    console.log('Foto capturada:', dataURL);

    // Exibe a imagem capturada apenas se o contêiner estiver vazio
    if (!imageContainer.hasChildNodes()) {
      // Exibe a imagem capturada
      var imagemCapturada = new Image();
      imagemCapturada.src = dataURL;
      imagemCapturada.style.width = '1181px'; // Ajusta a largura conforme necessário

      // Adiciona a imagem ao contêiner
      imageContainer.appendChild(imagemCapturada);

      // Exibe os botões de processamento
      processarButton.style.display = 'block';
      enviarButton.style.display = 'none'; // Mostrar o botão de enviar
      tirarOutraButton.style.display = 'block';

      // Exibe a imagem capturada e os botões de processamento
      processingContainer.style.display = 'block';
    }
  });

  // Lógica para o botão "Tirar Outra Foto"
  document.getElementById('tirarOutra').addEventListener('click', function() {
    // Reiniciar o estado da página
    window.location.reload();
  });

  // Enviar para a página de processamento ao clicar no botão "Enviar"
  document.getElementById('enviar').addEventListener('click', function() {
    window.location.href = 'processarImagem.html';
  });

  // Redireciona para a página de processamento ao clicar no botão "Processar"
  document.getElementById('processar').addEventListener('click', function() {
    window.location.href = 'processarImagem.html';
  });

  // Adiciona lógica para o botão "Excluir"
  document.getElementById('excluir').addEventListener('click', function() {
    // Reiniciar o estado da página
    window.location.reload();
  });