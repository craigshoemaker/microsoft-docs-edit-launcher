'use strict';

let message;
let editButton;

function disable() {
  editButton.classList.add('none');
  message.classList.remove('none');
}

function enable() {
  editButton.classList.remove('none');
  message.classList.add('none');
}

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
  message = document.getElementById('message');

  editButton = document.getElementById('edit-button');
  editButton.addEventListener('click', editButtonClick, false);

  sendMessage({ action: 'load' });
});

chrome.runtime.onMessage.addListener(request => {
  if (request.disable) {
    disable();
  } else if (request.enable) {
    enable();
  }
});
