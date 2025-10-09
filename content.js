// Video Pro Plus - Bloqueador Universal
console.log('✅ Video Pro Plus ATIVADO!');

// Função para forçar navegador em sites
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

    // 📝 BLOGS - NOVO (força navegador)
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

// Intercepta TODOS os cliques em links
document.addEventListener('click', function(event) {
  const link = event.target.closest('a');
  if (link && link.href) {
    const url = link.href;
    const newUrl = forceBrowserUrl(url);
    
    if (newUrl !== url) {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.href = newUrl;
    }
  }
}, true);

// Bloqueia anúncios em blogs automaticamente
function blockBlogAds() {
  // Seletores comuns de anúncios em blogs
  const adSelectors = [
    '[class*="advertisement"]',
    '[class*="adsense"]',
    '[class*="ad-container"]',
    '[id*="advertisement"]',
    '[id*="adsense"]',
    '.adsbygoogle',
    '.ad-unit',
    '.banner-ad',
    '.popup-ad',
    '.ad-popup'
  ];
  
  adSelectors.forEach(selector => {
    const ads = document.querySelectorAll(selector);
    ads.forEach(ad => {
      ad.style.display = 'none';
      console.log('🚫 Anúncio bloqueado:', selector);
    });
  });
}

// Executa bloqueio de anúncios em blogs
const currentUrl = window.location.href;
const blogDomains = ['blogspot.com', 'wordpress.com', 'medium.com', 'weebly.com', 'wixsite.com'];
if (blogDomains.some(domain => currentUrl.includes(domain))) {
  setTimeout(blockBlogAds, 1000);
  setInterval(blockBlogAds, 3000);
}

console.log('🎯 YouTube, Twitter, TikTok, Instagram, Facebook e Blogs protegidos!');

