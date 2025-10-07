// Video Pro Plus - Bloqueador de Anúncios Universal
console.log('Video Pro Plus carregado!');

// Função principal para bloquear anúncios
function bloquearAnuncios() {
  // YouTube
  const anunciosYouTube = [
    '.video-ads', '.ytp-ad-module', '.ad-container',
    '.ad-div', '.ad-showing', '.ad-interstitial'
  ];
  
  anunciosYouTube.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      element.remove();
    });
  });
  
  // Twitter/X
  const anunciosTwitter = [
    '[data-testid="placementTracking"]',
    '[data-testid="cellInnerDiv"] [data-testid="tweet"]:has([data-testid="socialContext"])'
  ];
  
  anunciosTwitter.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      element.remove();
    });
  });
  
  // TikTok
  const anunciosTikTok = [
    '.ad-container', '[data-ad]', '.ad-unit'
  ];
  
  anunciosTikTok.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      element.remove();
    });
  });
}

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', bloquearAnuncios);

// Observar mudanças na página (para SPAs)
const observer = new MutationObserver(bloquearAnuncios);
observer.observe(document.body, {
  childList: true,
  subtree: true
});
