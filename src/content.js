'use strict';

const getAuthor = () => document.querySelector('meta[name="author"]').getAttribute('content');

const domains = {
  'docs.microsoft.com': {
    selector: `a[data-original_content_git_url]`,
    attribute: 'data-original_content_git_url'
  }
};

const strategy = {
  rules: [
    { apply: url => url.replace('/blob/', '/edit/') },
    { apply: url => url.replace('/live/', '/master/') },
  ],
  run: (domain) => {
    const author = getAuthor();
    const anchors = document.querySelectorAll(domain.selector);
    [].forEach.call(anchors, a => {
      let url = a.getAttribute(domain.attribute);
      strategy.rules.forEach(rule => {
        url = rule.apply(url);
      });
      url = `${url}?message=[PARTNER%20EDIT]:%20&description=%0A%0Acc%3A%20%40${author}%0A%0A%3C%21--%20Please%20include%20%5BPARTNER%20EDIT%5D%20in%20your%20commit%20and%20PR%20title%20--%3E`;
      a.setAttribute('href', url);
      a.setAttribute('target', '_blank');
    });
  }
};

const actions = {
  load: () => {
    const domain = domains[window.location.host];
    if (domain) {
      strategy.run(domain);
    }
  }
}

chrome.runtime.onMessage.addListener(request => {
  if(actions[request.action]) {
    actions[request.action]();
  }
});
