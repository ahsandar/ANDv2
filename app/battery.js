import document from "document"; 
import { battery } from "power";

//Battery - START
export let batteryLine = document.getElementById("battery-line");
//Battery - END

export let root = document.getElementById('root')
export const screenHeight = root.height //250 - Ionic, 300 - Versa
export const screenWidth = root.width


//Battery Draw - START
export function drawBat() {
  let level = battery.chargeLevel;
  let batteryPercentage = Math.floor(level);
  let lineWidth = Math.floor(screenWidth*(batteryPercentage/100));
  if (batteryPercentage >= 75)
  {
    batteryLine.style.fill = "lime";
    batteryLine.width = lineWidth;
  }
  else if (batteryPercentage >= 50)
  {
      batteryLine.style.fill = "yellow";
      batteryLine.width = lineWidth;
  }
  else if (batteryPercentage >= 25)
  {
      batteryLine.style.fill = "orange";
      batteryLine.width = lineWidth;
  }
  else
  {
     batteryLine.style.fill = "crimson";
     batteryLine.width = lineWidth;
  }
  
}

//Battery Draw - END