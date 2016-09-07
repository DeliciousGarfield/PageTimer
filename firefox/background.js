browser.runtime.onMessage.addListener(function(iconData) {
  var array = new Uint8ClampedArray(iconData.data.length);

  for (var i = 0; i < array.length; i++) {
    array[i] = iconData.data[i];
  }

  var imageData = new ImageData(array, iconData.width, iconData.height);

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.pageAction.show(tabs[0].id);
    chrome.pageAction.setIcon({
    tabId: tabs[0].id, imageData: imageData
    });
  });
});
