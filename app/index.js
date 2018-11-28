
import document from "document";
import { display } from "display";
import clock from "clock";

import * as device from "./device.js"
import * as bm from "./bm.js";
import * as date from "./date.js"
import * as battery from "./battery.js"
import * as time from "./time.js"
import * as hr from "./hr.js"
import * as activity from "./activity.js"
import * as settings from "./settings.js"
import * as state from "./state.js"
import * as weather from "./weather.js"
import * as barometer from "./barometer.js"

clock.granularity = "seconds";
settings.loadSettings();
display.onchange = state.applyState;
barometer.start();
device.deviceSetup();
clock.ontick = (evt) => {  
  time.drawTime(evt.date);
  date.drawDate(evt.date, settings.language);
  activity.drawAllProgress();
  battery.drawBat();  
}