

window.CONFIG_READY = (async () => {
  let config = {};
  try {
    console.log('[DEBUG] Fetching /config...');
    const response = await fetch('/config?_=' + Date.now());
    console.log('[DEBUG] Response status:', response.status);
    console.log('[DEBUG] Response ok:', response.ok);
    config = await response.json();
    console.log('[DEBUG] Config received:', config);
  } catch (err) {
    console.error('[ERROR] Failed to load /config', err);
  }
  window.CONFIG = {
    SERVER_URL: config.SERVER_URL || ''
  };
  console.log('[DEBUG] Final window.CONFIG:', window.CONFIG);
})();
