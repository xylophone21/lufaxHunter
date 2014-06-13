chrome.tabs.onActivated.addListener(function(activeInfo) {
  lastTabId = activeInfo.tabId;
  chrome.tabs.get(lastTabId, function(tab) {
    if (tab.url.indexOf("https://list.lufax.com") == 0) {
      chrome.pageAction.show(lastTabId);
    }
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.url.indexOf("https://list.lufax.com") == 0) {
    chrome.pageAction.show(lastTabId);
  }
});

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse) {
  console.log("notify 1 " +message.message);
	if(message.event == "notify" ) {
    var opt = {
      type: "basic",
      title: message.title,
      message: message.message,
      iconUrl: 'icon.png'
    }
    var notify = chrome.notifications.create('Notifier'+Date.now(),opt,function(id) {console.log("create");});
		//setTimeout(function(){ notify.clear(); },10000);
	}
});
