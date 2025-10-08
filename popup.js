// Video Pro Plus - Popup Interface
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎯 Video Pro Plus Popup Carregado!');
  
  // Atualiza status da extensão
  updateStatus();
  
  // Configura os event listeners dos checkboxes
  setupEventListeners();
});

function updateStatus() {
  const statusElement = document.querySelector('.status');
  if (statusElement) {
    statusElement.textContent = 'Pronto para usar ✔️';
    statusElement.style.color = '#00ff00';
  }
}

function setupEventListeners() {
  // YouTube Forçar Navegador
  const youtubeCheckbox = document.querySelector('input[value="youtube"]');
  if (youtubeCheckbox) {
    youtubeCheckbox.checked = true; // Sempre ativo
    youtubeCheckbox.disabled = true; // Não pode desativar
  }
  
  // X/Twitter
  const twitterCheckbox = document.querySelector('input[value="twitter"]');
  if (twitterCheckbox) {
    twitterCheckbox.checked = true;
    twitterCheckbox.addEventListener('change', function() {
      console.log('Twitter:', this.checked ? 'Ativado' : 'Desativado');
    });
  }
  
  // TikTok
  const tiktokCheckbox = document.querySelector('input[value="tiktok"]');
  if (tiktokCheckbox) {
    tiktokCheckbox.checked = true;
    tiktokCheckbox.addEventListener('change', function() {
      console.log('TikTok:', this.checked ? 'Ativado' : 'Desativado');
    });
  }
  
  // Tutorial Completo
  const tutorialCheckbox = document.querySelector('input[value="tutorial"]');
  if (tutorialCheckbox) {
    tutorialCheckbox.addEventListener('change', function() {
      if (this.checked) {
        window.open('https://youtube.com', '_blank');
      }
    });
  }
}

// Comunicação com background script
chrome.runtime.sendMessage({action: "getStatus"}, function(response) {
  console.log('Status da extensão:', response);
});
