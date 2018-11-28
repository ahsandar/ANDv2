import document from "document";

export function deviceSetup() {
  let root = document.getElementById('root');
  const screenHeight = root.height //250 - Ionic, 300 - Versa
  const screenWidth = root.width
  if (screenHeight === 300) {
    console.log("Versa");
    var versaTime = document.getElementById('time');
    var versaAmPm = document.getElementById('versa-am-pm');
    var ionicAmPm = document.getElementById('ionic-am-pm');
    ionicAmPm.style.display = 'none';
    versaAmPm.style.display = 'inlne';
    versaTime.style.fontSize = 124;
    versaTime.x = screenWidth-15;
    versaTime.y = 175;
    var versaSec = document.getElementById('second');
    versaSec.y = 235;
  }
  else {
    var versaAmPm = document.getElementById('versa-am-pm');
    var ionicAmPm = document.getElementById('ionic-am-pm');
    ionicAmPm.style.display = 'inline';
    versaAmPm.style.display = 'none';
    var ionicSec = document.getElementById('second');
    ionicSec.style.fontSize = 40;
  }
}