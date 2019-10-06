'use strict';

const getAuthor = () => {
  let author = '';
  const meta = document.querySelector('meta[name="author"]');
  if (meta) {
    author = meta.getAttribute('content');
  }
  return author;
};

const domains = {
  'docs.microsoft.com': {
    isMatch: () => true,
    selector: `a[data-original_content_git_url]`,
    attribute: 'data-original_content_git_url',
    rules: [
      { apply: url => url.replace('/blob/', '/edit/') },
      { apply: url => url.replace('/live/', '/master/') },
      { apply: url => `${url}?description=` },
      {
        apply: url => {
          let author = getAuthor();
          if (author.length > 0) {
            author = `%0A%0Acc%3A%20%40${author}`;
          }
          return `${url}${author}`;
        },
      }
    ],
  },
};

const transformation = {
  run: domain => {
    if (domain.isMatch(window.location.pathname)) {
      const anchors = document.querySelectorAll(domain.selector);
      [].forEach.call(anchors, a => {
        let url = a.getAttribute(domain.attribute);
        domain.rules.forEach(rule => {
          url = rule.apply(url);
        });
        a.setAttribute('href', url);
        a.setAttribute('target', '_blank');
      });
    }
  },
};

const actions = {
  load: () => {
    const domain = domains[window.location.hostname];
    if (domain) {
      transformation.run(domain);
    }
  }
}

chrome.runtime.onMessage.addListener(request => {
  if(actions[request.action]) {
    actions[request.action]();
  }
});
