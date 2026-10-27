/* Medicao - Martin Base
Carregado no <head> de cada pagina via <script src="/medicao.js">.
ga4 = ID de medicao do GA4 (G-XXXXXXXXXX)
ads = ID da conta do Google Ads (AW-000000000)
rot_whatsapp = rotulo da conversao de clique no WhatsApp
rot_formulario = rotulo da conversao de formulario enviado
Campo vazio = nada carrega e nenhum pedido sai para o Google. */
window.MB_TAGS = {
  ga4: 'G-7XVDQ09Z88',
  ads: '',
  rot_whatsapp: '',
  rot_formulario: ''
};

(function () {
var ids = [MB_TAGS.ga4, MB_TAGS.ads].filter(Boolean);
  if (!ids.length) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('js', new Date());
  ids.forEach(function (id) { gtag('config', id); });
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ids[0];
  document.head.appendChild(s);
})();

/* Conversao: clique em qualquer link de WhatsApp.
A pagina /psicologos ja tem o proprio listener no HTML - nao duplicar la. */
(function () {
  if (location.pathname.indexOf('/psicologos') === 0) return;
  document.addEventListener('click', function (ev) {
    var el = ev.target;
    if (!el || !el.closest) return;
    var a = el.closest('a[href*="wa.me"]');
    if (!a || !window.gtag) return;
    var sec = a.closest('section, header, footer');
    var origem = a.id === 'floatWa' ? 'flutuante' : (sec && (sec.id || sec.tagName.toLowerCase())) || 'topo';
var pag = location.pathname.replace(/^\/+|\/+$/g, '') || 'home';
    gtag('event', 'click_whatsapp', { pagina: pag, origem: origem });
    if (MB_TAGS.ads && MB_TAGS.rot_whatsapp) {
      gtag('event', 'conversion', { send_to: MB_TAGS.ads + '/' + MB_TAGS.rot_whatsapp });
    }
  }, true);
})();
