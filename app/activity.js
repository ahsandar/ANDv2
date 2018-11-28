import document from "document";
import { goals } from "user-activity";
import { today } from "user-activity";

//Progress - START
export var distanceUnit = "m";
export function distanceUnitSet(val) { distanceUnit = val }
export var isFastProgress = false;
export function isFastProgressSet(val) { isFastProgress = val }
export var fastProgressInterval = null;
export function getProgressEl(prefix) {  
  let containerEl = document.getElementById(prefix);
  return {
    prefix: prefix,
    prevProgressVal: null,
    container: containerEl,
    count: containerEl.getElementsByClassName("count")[0],
    icon: containerEl.getElementsByClassName("icon")[0]
  }
}

export let goalTypes = [
  "steps",
  "distance",
  "elevationGain",
  "calories",
  "activeMinutes"
];

export let progressEls = [];

for (var i=0; i < goalTypes.length; i++) {
  var goalType = goalTypes[i];
  progressEls.push(getProgressEl(goalType)); 
}  
//Progress - END


//Progress Draw - START
export function drawProgress(progressEl) {
  let prefix = progressEl.prefix;
  
  let actual = (today.local[prefix] || 0);
  if (progressEl.prevProgressVal == actual) {
    return;
  }  
  progressEl.prevProgressVal = actual;
  
  var isGoalReached = false;
  
  var displayValue = actual;
  if (prefix === "distance" && actual) {
    
    if (distanceUnit === "km") {
      displayValue = (actual / 1000.).toPrecision(3);
    } else if (distanceUnit === "ft") {
      displayValue = Math.round(actual * 3.2808); 
    } else if (distanceUnit === "mi") {
      displayValue = (actual / 1609.344).toPrecision(3);  
    }
  }  
  progressEl.count.text = `${displayValue}`;
} 

export function drawAllProgress() {
  for (var i=0; i < goalTypes.length; i++) {  
    drawProgress(progressEls[i]);
  }
}

export function resetProgressPrevState() {
  for (var i=0; i < goalTypes.length; i++) {  
    progressEls[i].prevProgressVal = null;
  }
}

export function initFastProgressInterval() {
  clearInterval(fastProgressInterval);
  fastProgressInterval = setInterval(drawAllProgress, 5000);
}

//Progress Draw - END