
# Azure Docs Edit Launcher

This browser extension opens the original location of an Azure docs article for editing in the private repository.

![Screenshot](screenshot.png)

## Installation and usage

1. Clone or download this repo
1. In Google Chrome, navigate to [chrome://extensions/](chrome://extensions/)
1. Enable the **Developer Mode** slider
1. Click the **Load unpacked** button
1. Navigate to the folder where you placed the code for the extension and click **Select Folder**
1. Navigate to an article on *docs.microsoft.com*
1. Click the extension icon
1. Click **Edit in private repo**

## FAQ

### What if I don't have access to the repo?

If you don't have access, then you'll need to send a request to the content team to grant you access.

### Why does it tell me a page is not editable after I click the edit button?

Some pages on docs.microsoft.com don't feature an edit button rendered on the page. This button is required for the extension to work.

### Why do I have to run this as an unpacked extension in developer mode?

For security considerations Chrome blocks packed extensions that are not listed in the Chrome web store. This extension isn't meant for widespread use, so you must use the unpacked version for now.
