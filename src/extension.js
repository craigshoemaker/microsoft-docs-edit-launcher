'use strict';

const els = {
  messages: {
    notMSDomain: null,
    noUrl: null,
    hide: () => {
      els.messages.notMSDomain.classList.add('none');
      els.messages.noUrl.classList.add('none');
    },
  },
  editButton: null,
};

const actions = {
  enable: () => {
    els.editButton.classList.remove('none');
    els.messages.hide();
  },

  noUrl: () => {
    els.messages.hide();
    els.messages.noUrl.classList.remove('none');
    els.editButton.classList.add('none');
  },
};

function sendMessage(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const id = tabs[0].id;
    chrome.tabs.sendMessage(id, message);
  });
}

function editButtonClick() {
  sendMessage({ action: 'run' });
}

document.addEventListener('DOMContentLoaded', () => {
  els.messages.noUrl = document.getElementById('message-noUrl');
  els.messages.notMSDomain = document.getElementById('message-notMSDomain');

  els.editButton = document.getElementById('edit-button');

  els.editButton.addEventListener('click', editButtonClick, false);

  sendMessage({ action: 'load' });
});

chrome.runtime.onMessage.addListener(request => {
  const action = request.action;

  if (actions[action]) {
    actions[action]();
  }
});
