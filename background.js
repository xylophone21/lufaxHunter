chrome.tabs.onActivated.addListener(function(activeInfo) {
  lastTabId = activeInfo.tabId;
  chrome.tabs.get(lastTabId, function(tab) {
    if (tab.url.indexOf("http://list.lufax.com") == 0) {
      chrome.pageAction.show(lastTabId);
    }
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.url.indexOf("http://list.lufax.com") == 0) {
    chrome.pageAction.show(lastTabId);
  }
});

