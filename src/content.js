const URL_ATTRIBUTE = 'data-original_content_git_url';

let editAnchor = null;

function getUrl(anchor) {
  let url = '';
  if (anchor) {
    url = anchor.getAttribute(URL_ATTRIBUTE);
  }
  return url;
}

function getEditUrl(url) {
  if (/\/blob\//.test(url)) {
    url = url.replace('/blob/', '/edit/');
    url = `${url}?message=[PARTNER%20EDIT]:%20&description=%3C%21--%20Please%20include%20%5BPARTNER%20EDIT%5D%20in%20your%20commit%20and%20PR%20title%20--%3E`;
  }
  return url;
}

function load() {
  if (/https?\:\/\/docs\.microsoft\.com/.test(window.location.href)) {
    if (!editAnchor) {
      editAnchor = document.querySelector(`a[${URL_ATTRIBUTE}]`);
      let url = getUrl(editAnchor);
      url = getEditUrl(url);
      editAnchor.setAttribute('href', url);
      editAnchor.setAttribute('target', '_blank');
    }
  }
}

chrome.runtime.onMessage.addListener(request => {
  if (request.action === 'load') {
    load();
  }
});
