// versão dos arquivos na vtex
const version = 19;

// versão do cache no browser
const cache_version = 26;

const files = [
  `/arquivos/bundle.v${version}.busca-vazia.js`,
  `/arquivos/bundle.v${version}.category.js`,
  `/arquivos/bundle.v${version}.checkout.js`,
  `/arquivos/bundle.v${version}.department.js`,
  `/arquivos/bundle.v${version}.everywear.js`,
  `/arquivos/bundle.v${version}.home.js`,
  `/arquivos/bundle.v${version}.landing-template-1.js`,
  `/arquivos/bundle.v${version}.product.js`,
  `/arquivos/bundle.v${version}.shared.js`,
  `/arquivos/bundle.v${version}.vendors~shared.js`,
  `/arquivos/bundle.v${version}.website.js`,  
  

  // vtex files
  "https://io.vtex.com.br/front-libs/jquery/1.8.3/jquery-1.8.3.min.js",
  "https://io.vtex.com.br/front-libs/front-i18n/0.4.1/vtex-i18n.min.js",
  "https://io.vtex.com.br/front-libs/front-utils/1.0.1/vtex-utils.min.js",
  "https://io.vtex.com.br/front-libs/dustjs-linkedin/2.3.5/dust-core-2.3.5.min.js",
  "https://io.vtex.com.br/rc/rc.js",
  "https://io.vtex.com.br/portal-ui/1.11.8/scripts/vtex-events-all.min.js",
  "https://io.vtex.com.br/portal-ui/1.11.8/scripts/vtex-analytics.js",
  "https://io.vtex.com.br/vtex.js/2.8.0/vtex.min.js",
  "https://io.vtex.com.br/portal-plugins/2.9.13/js/portal-template-as-modal.min.js",
  "https://io.vtex.com.br/portal-plugins/2.9.13/js/portal-sku-selector-with-template.min.js",
  "https://intimissimi.vteximg.com.br/Scripts/vtex.cookie.js",
  "https://io.vtex.com.br/vtex-id-ui/3.13.47/vtexid-jquery.min.js",

  // other files
  "/Scripts/vtex.ajax.wait.js",
  "/Scripts/vtex.common.js",
  "/Scripts/vtex.viewPart.ajaxLoader_V2.js",
  "/Scripts/vtex.skuEvents.js",
];

self.addEventListener("install", function () {
  console.log(`app instalada na versão ${cache_version}`);
})

self.addEventListener("activate", function () {
  caches.open(`intimissimi-cache-v${cache_version}`).then(cache => {
    cache.addAll(files).then(function () {
      caches.delete(`intimissimi-cache-v${cache_version - 1}`);
    });
  })
})

self.addEventListener('fetch', function (event) {

  const request = event.request;
  
  const responsePromisse = caches.match(request)
    .then(responseCache => {
      const response = responseCache ? responseCache : fetch(request);
      return response;
    });

  event.respondWith(responsePromisse);
});