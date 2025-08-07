

window.CONFIG_READY = (async () => {
  let config = {};
  try {
    const response = await fetch('/config?_=' + Date.now());
    config = await response.json();
  } catch (err) {
    console.error('Failed to load /config', err);
  }
  window.CONFIG = {
    SERVER_URL: config.SERVER_URL || '',
    AUTH_TOKEN: config.AUTH_TOKEN || ''
  };
})();
