'use strict';

const domains = {
  'docs.microsoft.com': {
    isMatch: () => true,
    selector: `a[data-original_content_git_url]`,
    attribute: 'data-original_content_git_url',
    getAuthor: () => {
      let author = '';
      const el = document.querySelector('meta[name="author"]');
      if (el) {
        author = el.getAttribute('content');
      }
      return author;
    },
    rules: [
      { apply: url => url.replace('/blob/', '/edit/') },
      { apply: url => url.replace('/live/', '/master/') },
      { apply: url => `${url}?description=` },
      {
        apply: (url, author) => {
          if (author.length > 0) {
            author = `%0A%0Acc%3A%20%40${author}`;
          }
          return `${url}${author}`;
        },
      },
    ],
  },

  'github.com': {
    isMatch: pathname => /MicrosoftDocs/.test(pathname),
    selector: 'a[href^="https://github.com/Microsoft"][href*="/blob/"]',
    attribute: 'href',
    getAuthor: () => {
      let author = '';
      const el = document.querySelector('.user-mention');
      if (el) {
        author = el.innerText;
        author = author.replace('@', '');
      }
      return author;
    },
    rules: [
      { apply: url => url.replace('/blob/', '/edit/') },
      { apply: url => `${url}?description=` },
      {
        apply: (url, author) => {
          if (author.length > 0) {
            author = `%0A%0Acc%3A%20%40${author}`;
          }
          return `${url}${author}`;
        },
      },
    ],
  },
};

const transformation = {
  run: domain => {
    if (domain.isMatch(window.location.pathname)) {
      const anchors = document.querySelectorAll(domain.selector);
      [].forEach.call(anchors, a => {
        const author = domain.getAuthor();
        let url = a.getAttribute(domain.attribute);
        domain.rules.forEach(rule => {
          url = rule.apply(url, author);
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
