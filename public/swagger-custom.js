(function () {
  function ensureHeader() {
    if (document.querySelector('.sys-header')) return;

    var header = document.createElement('div');
    header.className = 'sys-header';
    header.innerHTML =
      '<div class="sys-header__inner">' +
        '<div class="sys-left">' +
          '<img class="sys-logo" src="/public/systemium-logo.svg" alt="SYSTEMIUM" />' +
          '<div style="min-width:0">' +
            '<div class="sys-brand">SYSTEMIUM</div>' +
            '<div class="sys-title">Technology & Development</div>' +
          '</div>' +
        '</div>' +
        '<div class="sys-badge">API Docs</div>' +
      '</div>';

    document.body.insertBefore(header, document.body.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureHeader);
  } else {
    ensureHeader();
  }
})();
