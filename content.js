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

console.log('🎯 YouTube, Twitter e TikTok protegidos!');
