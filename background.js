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
    var notifyid = 'Notifier'+Date.now();
    chrome.notifications.create(notifyid,opt,function(id) {});
    
    var player = document.getElementById('player');
    player.play();

    chrome.notifications.onClosed.addListener(function(notificationId,byUser) {
      if(notificationId == notifyid) {
        player.currentTime = 0;
        player.pause();
      }
    });

		setTimeout(function(){chrome.notifications.clear(notifyid,function(wasCleared) {});},10000);
	}
});
