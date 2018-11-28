
import { Barometer } from "barometer";
import document from "document";

let baromZone = document.getElementById("barom-zone");
let baromIcon = document.getElementById("barom-icon");
export var barom = new Barometer({ frequency: 1 });


export function updatePressure() {
  var kPa = (parseInt(barom.pressure)/1000).toFixed(1)
  baromZone.text = `${kPa} kPa`
}

export function start(){
  barom.onreading = updatePressure;
}

export function setBaromVis(visibility) {
 baromZone.style.display = (!visibility ? "none" : "inline"); 
 baromIcon.style.display = (!visibility ? "none" : "inline"); 
}