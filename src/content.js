const URL_ATTRIBUTE = 'data-original_content_git_url';

let editAnchor = null;

function getUrl(anchor) {
  let url = '';
  if (anchor) {
    url = anchor.getAttribute(URL_ATTRIBUTE);
  }
  return url;
}

function getAuthor() {
  const meta = document.querySelector('meta[name="author"]')
  return meta.getAttribute('content');
}

function getEditUrl(url) {
  if (/\/blob\//.test(url)) {
    url = url.replace('/blob/', '/edit/');
    const author = getAuthor();
    url = `${url}?message=[PARTNER%20EDIT]:%20&description=%0A%0Acc%3A%20%40${author}%0A%0A%3C%21--%20Please%20include%20%5BPARTNER%20EDIT%5D%20in%20your%20commit%20and%20PR%20title%20--%3E`;
  }
  return url;
}

function setAnchorAttributes() {
  let url = getUrl(editAnchor);
  url = getEditUrl(url);
  editAnchor.setAttribute('href', url);
  editAnchor.setAttribute('target', '_blank');
}

function load() {
  if (/https?\:\/\/docs\.microsoft\.com/.test(window.location.href)) {
    if (!editAnchor) {
      editAnchor = document.querySelector(`a[${URL_ATTRIBUTE}]`);
      setAnchorAttributes();
    }
  }
}

chrome.runtime.onMessage.addListener(request => {
  if (request.action === 'load') {
    load();
  }
});
