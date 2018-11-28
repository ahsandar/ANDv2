import document from "document";
import * as util from "../common/utils";
import { preferences } from "user-settings";

export let root = document.getElementById('root')
export const screenHeight = root.height //250 - Ionic, 300 - Versa
export const screenWidth = root.width

export let timeEl = document.getElementById("time");
export let secEl = document.getElementById("second");
export let isAmPm = false;
export function setIsAmPm(val) { isAmPm = val}

//Time Draw - START
export function drawTime(now) {

  var hours = setHours(now);
  
  
  
  // hours = util.zeroPad(hours);
  let mins = util.zeroPad(now.getMinutes());
  let secs = util.zeroPad(now.getSeconds());
  timeEl.text = `${hours}:${mins}`;
  secEl.text = `${secs}`;
  
}

export function setHours(now) {
  var hours = now.getHours();
  var amPmdeviceType = (screenHeight === 300) ? 'versa-am-pm' : 'ionic-am-pm'
  var amPmEl = document.getElementById(amPmdeviceType);
  var amPm = "";
  if (preferences.clockDisplay === "12h" || isAmPm) {
    // 12h format    
    if (isAmPm) {
      if (hours < 12) {
        amPm = " AM";
      } else {
        amPm = " PM";
      }
    }
     
    // amPmEl.x = screenWidth;
    amPmEl.style.display= 'inline';
    amPmEl.text = amPm;
    hours = util.zeroPad(hours % 12 || 12);    
  } else {
    // 24h format
    amPmEl.style.display= 'none';
    hours = util.zeroPad(hours);
  }
  
  return hours
}


//Time Draw - END