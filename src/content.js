const URL_ATTRIBUTE = 'data-original_content_git_url';

function getUrl(document) {
  let url = '';
  const anchor = document.querySelector(`a[${URL_ATTRIBUTE}]`);

  if (anchor) {
    url = anchor.getAttribute(URL_ATTRIBUTE);
  }

  return url;
}

function getEditUrl(url) {
  url = url.replace('/blob/', '/edit/');
  return `${url}?message=[PARTNER%20EDIT]:%20&description=%3C%21--%20Please%20include%20%5BPARTNER%20EDIT%5D%20in%20your%20commit%20and%20PR%20title%20--%3E`;
}

function load() {
  if (/https?\:\/\/docs\.microsoft\.com/.test(window.location.href)) {
    let el = document.querySelector(`a[${URL_ATTRIBUTE}]`);

    if (el) {
      let url = getUrl(document);
      url = getEditUrl(url);
      el.setAttribute('href', url);
      el.setAttribute('target', '_blank');
    }
  }
}

chrome.runtime.onMessage.addListener(request => {
  if (request.action === 'load') {
    load();
  }
});
