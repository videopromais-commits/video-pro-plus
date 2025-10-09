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

// Função para forçar navegador em MULTIPLOS sites
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

    // 📷 INSTAGRAM - NOVO
    if (url.includes('instagram.com')) {
      urlObj.searchParams.set('__a', '1');
      urlObj.searchParams.set('no_app', '1');
      modified = true;
    }

    // 👥 FACEBOOK - NOVO
    if (url.includes('facebook.com')) {
      urlObj.searchParams.set('_fb_noscript', '1');
      urlObj.searchParams.set('no_app', '1');
      modified = true;
    }

    // 📝 BLOGS - NOVO
    const blogDomains = [
      'blogspot.com', 'wordpress.com', 'medium.com', 
      'weebly.com', 'wixsite.com', 'blog.br'
    ];
    
    if (blogDomains.some(domain => url.includes(domain))) {
      urlObj.searchParams.set('utm_source', 'browser');
      urlObj.searchParams.set('no_app', '1');
      modified = true;
    }

    return modified ? urlObj.toString() : url;
  } catch (error) {
    return url;
  }
}

// Mensagem para popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getStatus") {
    sendResponse({
      status: "active",
      sites: ["YouTube", "Twitter", "TikTok", "Instagram", "Facebook", "Blogs"],
      version: "2.0"
    });
  }
});
