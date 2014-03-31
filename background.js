chrome.tabs.onSelectionChanged.addListener(function(tabId) {
  lastTabId = tabId;
  chrome.pageAction.show(lastTabId);
});
