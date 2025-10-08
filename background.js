// Video Pro Plus - Background Service Worker
console.log('✅ Video Pro Plus Background ATIVADO!');

// Intercepta navegações ANTES de carregar
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  const url = details.url;
  const newUrl = forceBrowserUrl(url);
  
  if (newUrl !== url) {
    chrome.tabs.update(details.tabId, { url: newUrl });
  }
});

// Função para forçar navegador
function forceBrowserUrl(url) {
  try {
    const urlObj = new URL(url);
    let modified = false;

    // 🔴 YOUTUBE
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      urlObj.searchParams.set('noapp', '1');
      urlObj.searchParams.set('web', '1');
      urlObj.searchParams.set('force_browser', 'true');
      urlObj.searchParams.set('nomobile', '1');
      urlObj.searchParams.delete('androidapp');
      if (urlObj.hostname.includes('m.') || urlObj.hostname === 'youtu.be') {
        urlObj.hostname = 'www.youtube.com';
      }
      modified = true;
    }

    // 🔵 TWITTER/X
    if (url.includes('twitter.com') || url.includes('x.com')) {
      urlObj.searchParams.set('web', '1');
      urlObj.searchParams.set('no_app', '1');
      modified = true;
    }

    // 🎵 TIKTOK
    if (url.includes('tiktok.com')) {
      urlObj.searchParams.set('lang', 'en');
      urlObj.searchParams.set('no_app', '1');
      modified = true;
    }

    return modified ? urlObj.toString() : url;
  } catch (error) {
    return url;
  }
}
