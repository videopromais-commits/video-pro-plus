// Video Pro Plus - Popup functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Botão Bloquear Anúncios
    document.getElementById('blockAds').addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "blockAds"});
        });
        alert('Anúncios bloqueados nesta página!');
    });

    // Botão Configurações
    document.getElementById('settings').addEventListener('click', function() {
        alert('Configurações em breve!');
    });

    // Botão Sobre
    document.getElementById('about').addEventListener('click', function() {
        alert('Video Pro Plus v1.0.0\nBloqueador universal de anúncios em vídeos');
    });

    // Verificar status da página atual
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentUrl = tabs[0].url;
        const statusElement = document.querySelector('.status');
        
        if (currentUrl.includes('youtube.com') || 
            currentUrl.includes('twitter.com') || 
            currentUrl.includes('tiktok.com') ||
            currentUrl.includes('rumores.com')) {
            statusElement.innerHTML = '<strong>Status:</strong> Protegendo esta página ✅';
        } else {
            statusElement.innerHTML = '<strong>Status:</strong> Página não suportada ❌';
        }
    });
});
