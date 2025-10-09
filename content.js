// Video Pro Plus - Bloqueador Universal de Anúncios
console.log('Video Pro Plus - Bloqueador ativado');

// Bloqueador principal de anúncios do YouTube
function bloquearAnunciosYouTube() {
    // Remove anúncios em vídeos
    const anunciosVideo = document.querySelectorAll('.video-ads, .ytp-ad-module, .ad-container, .ad-div, [class*="ad-"], [class*="Ad"]');
    anunciosVideo.forEach(ad => {
        ad.style.display = 'none';
        ad.remove();
    });
    
    // Remove anúncios overlay
    const anunciosOverlay = document.querySelectorAll('.ytp-ad-overlay-container, .ytp-ad-image-overlay');
    anunciosOverlay.forEach(ad => {
        ad.style.display = 'none';
        ad.remove();
    });
    
    // Remove anúncios na sidebar
    const anunciosSidebar = document.querySelectorAll('#related #player-ads, #watch7-sidebar-ads, [aria-label*="anúncio"], [aria-label*="ad"]');
    anunciosSidebar.forEach(ad => {
        ad.style.display = 'none';
        ad.remove();
    });
    
    // Remove anúncios entre vídeos (playlists)
    const anunciosPlaylist = document.querySelectorAll('.ytp-ad-text, .ytp-ad-message, .ytp-ad-skip-button, .ytp-ad-preview-text');
    anunciosPlaylist.forEach(ad => {
        ad.style.display = 'none';
        ad.remove();
    });
    
    // Remove banners de anúncios
    const banners = document.querySelectorAll('#masthead-ad, #player-ads, .ad-display, .display-ad-container');
    banners.forEach(banner => {
        banner.style.display = 'none';
        banner.remove();
    });
    
    // Remove anúncios nos resultados de busca
    const anunciosBusca = document.querySelectorAll('.search-pva, .promoted-videos, [data-context*="ad"]');
    anunciosBusca.forEach(ad => {
        ad.style.display = 'none';
        ad.remove();
    });
    
    // Remove anúncios nas playlists do usuário
    const anunciosPlaylistUsuario = document.querySelectorAll('#contents ytd-playlist-video-renderer [class*="ad"], #contents [aria-label*="ad"]');
    anunciosPlaylistUsuario.forEach(ad => {
        ad.style.display = 'none';
        ad.remove();
    });
    
    // Remove anúncios nas recomendações
    const anunciosRecomendacoes = document.querySelectorAll('#contents ytd-rich-item-renderer [class*="ad"], #contents [target*="ad"]');
    anunciosRecomendacoes.forEach(ad => {
        ad.style.display = 'none';
        ad.remove();
    });
    
    // Pula anúncios automaticamente se possível
    const skipButton = document.querySelector('.ytp-ad-skip-button, .ytp-ad-skip-button-modern');
    if (skipButton) {
        skipButton.click();
    }
    
    // Remove anúncios de display
    const displayAds = document.querySelectorAll('ytd-ad-slot-renderer, ytd-promoted-sparkles-web-renderer');
    displayAds.forEach(ad => {
        ad.style.display = 'none';
        ad.remove();
    });
}

// Bloqueador para outras plataformas
function bloquearAnunciosGerais() {
    // Remove elementos comuns de anúncios
    const selectors = [
        '[class*="advertisement"]',
        '[class*="ad-container"]',
        '[class*="banner-ad"]',
        '[id*="advertisement"]',
        '[id*="ad-container"]',
        '[id*="banner-ad"]',
        'iframe[src*="ads"]',
        'iframe[src*="doubleclick"]',
        'iframe[src*="googleads"]',
        'ins.adsbygoogle',
        '.ad-banner',
        '.ad-wrapper',
        '.ad-frame',
        '.adsense',
        '.adunit',
        '.ad-placeholder'
    ];
    
    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.display = 'none';
            element.remove();
        });
    });
}

// Executa o bloqueio
function executarBloqueio() {
    bloquearAnunciosYouTube();
    bloquearAnunciosGerais();
}

// Executa imediatamente
executarBloqueio();

// Executa quando o DOM muda (para conteúdo carregado dinamicamente)
const observer = new MutationObserver(executarBloqueio);
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Executa periodicamente para garantir bloqueio
setInterval(executarBloqueio, 2000);

// Remove qualquer pop-up de anúncio
setTimeout(() => {
    const popups = document.querySelectorAll('[class*="popup"], [class*="modal"][class*="ad"]');
    popups.forEach(popup => {
        if (popup.innerHTML.toLowerCase().includes('ad') || popup.innerHTML.toLowerCase().includes('anúncio')) {
            popup.style.display = 'none';
            popup.remove();
        }
    });
}, 3000);
