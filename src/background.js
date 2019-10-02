'use strict';

function sendMessage(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const id = tabs[0].id;
    chrome.tabs.sendMessage(id, message);
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    sendMessage({ action: 'load' });
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              hostEquals: 'docs.microsoft.com',
            },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});
