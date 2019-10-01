const URL_ATTRIBUTE = 'data-original_content_git_url';

function getUrl(document) {
    let url = '';
    const anchor = document.querySelector(`a[${URL_ATTRIBUTE}]`);

    if(anchor) {
        url = anchor.getAttribute(URL_ATTRIBUTE);
    }

    return url;
}

function openUrl(url) {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';

    document.body.appendChild(link);

    link.click();
    link.remove();
}

function run(document) {
    const url = getUrl(document);

    if(url.length > 0) {
        openUrl(url);
    } else {
        chrome.runtime.sendMessage({ disable: true });
    }
}

function load() {
    if(/https?\:\/\/docs\.microsoft\.com/.test(window.location.href)) {
        chrome.runtime.sendMessage({ enable: true });
    }
}

chrome.runtime.onMessage.addListener(request => {
    if (request.action === 'load') {
        load();
    } else if(request.action === 'run') {
        run(document);
    }
});
