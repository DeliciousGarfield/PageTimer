window.onload = get_load_time();

function get_load_time() {
  var timing = performance.timing;
  var loadTime = timing.loadEventEnd - timing.navigationStart;

  if (loadTime <= 0) {
    setTimeout(function() {
      get_load_time();
    }, 200);

    return;
  }

  get_load_time_icon(loadTime);

}

function get_load_time_icon(loadTime) {
  var time = time_format(loadTime);

  var canvas = document.createElement("canvas");

  canvas.setAttribute('width', 16);
  canvas.setAttribute('height', 16);

  var context = canvas.getContext("2d");

  if (loadTime <= 5000) {
    context.fillStyle = "green";
  }
  else {
    context.fillStyle = "red";
  }

  context.fillRect(1, 1, 15, 5);

  context.font = "8px Verdana";
  context.fillText(time, 0, 14);

  var imageData = context.getImageData(0,0,16,16);

  var iconData = new Object();
  iconData["width"] = imageData.width;
  iconData["height"] = imageData.height;
  iconData["data"] = new Array();

  for (var i = 0; i < imageData.data.length; i++)
    iconData["data"].push(imageData.data[i]);

  browser.runtime.sendMessage(iconData);
}

function time_format(millisec) {
  var sec = millisec / 1000;
  var ret;

  if (sec < 10) {
    ret = sec.toFixed(1);
  }
  else {
    ret = Math.round(sec);
  }

  return ret + 's';
}
