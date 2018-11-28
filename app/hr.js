import document from "document"; 
import { display } from "display";
import { HeartRateSensor } from "heart-rate";
import { user } from "user-profile";
//HR - START

export let hrm = new HeartRateSensor();
export var isHeartbeatAnimation  = true;
export function isHeartbeatAnimationSet(val) { isHeartbeatAnimation = val }
export var hrmAnimationPhase = false;
export var prevHrmRate = null;
export var hrmRate = null;
export var hrAnimated = false;
export var hrAnimatedInterval = null;
export let hrEl = document.getElementById("hr");
export let hrIconSystoleEl = document.getElementById("hr-icon-systole");
export let hrIconDiastoleEl = document.getElementById("hr-icon-diastole");
export let hrCountEl = document.getElementById("hr-count");
export let hrRestingEl = document.getElementById("hr-resting");
export let hrZoneEl = document.getElementById("hr-zone");
//HR - END



//HR Draw - START

export function setHrZoneVis(visibility) {
  hrZoneEl.style.display = (!visibility ? "none" : "inline");
}


export function initHrInterval() {
  clearInterval(hrAnimatedInterval);
  hrAnimatedInterval = setInterval(animateHr, 30000/hrmRate);
}


export function stopHrAnimation() {
  hrAnimated = false;
  clearInterval(hrAnimatedInterval);
  hrIconDiastoleEl.style.display = "inline";
}

export function hideHr() {
   hrmRate = null;
   prevHrmRate = null;   
   stopHrAnimation();
   hrEl.style.display = "none";
}

export function animateHr() {   
    if (hrmAnimationPhase) {
      hrIconDiastoleEl.style.display = "none";
    } else {
      hrIconDiastoleEl.style.display = "inline";  
    }
  
    hrmAnimationPhase =!hrmAnimationPhase;
  
    if (prevHrmRate != hrmRate) {
      clearInterval(hrAnimatedInterval);
      if (isHeartbeatAnimation) {
        prevHrmRate = hrmRate;
        initHrInterval();
      }
    }     
    prevHrmRate = hrmRate;
}

export function drawHrm() { 
  hrmRate = hrm.heartRate;
  if (hrmRate && display.on) {
    hrCountEl.text = `${hrmRate}`;  
    hrRestingEl.text = `(${user.restingHeartRate})`;
    var hr_zone = user.heartRateZone(hrmRate);
    if (hr_zone === "out-of-range") { hr_zone = "regular"}
    hrZoneEl.text = hr_zone.toUpperCase();//hr_zone.charAt(0).toUpperCase() + hr_zone.slice(1);
    
    if (!prevHrmRate) {
      hrEl.style.display = "inline";    
    }
    if (!hrAnimated && isHeartbeatAnimation) {
      clearInterval(hrAnimatedInterval);   
      prevHrmRate = hrmRate;
      initHrInterval();
      hrAnimated = true;      
    }
  } else {
    hideHr();
  }
}

drawHrm();
hrm.onreading = drawHrm;
hrm.start();
//HR Draw - END