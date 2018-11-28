import document from "document";
import { preferences } from "user-settings";
import { units } from "user-settings";
import { user } from "user-profile";
import * as fs from "fs";
import * as messaging from "messaging";
import { me as appbit } from "appbit";
import { me as device } from "device";
import { locale } from "user-settings";

import * as bm from "./bm.js";
import * as date from "./date.js"
import * as battery from "./battery.js"
import * as time from "./time.js"
import * as hr from "./hr.js"
import * as activity from "./activity.js"
import * as state from "./state.js"
import * as barom from "./barometer.js"


// SETTINGS
export const SETTINGS_TYPE = "cbor";
export const SETTINGS_FILE = "settingsV1.cbor";
export let settings = loadSettings();
export let root = document.getElementById('root');
export let backgroundEl = document.getElementById('background');
export var language = "en";

export function applySettings() {
  if (! loadSettings) {
   return;
  }
  
  try {
    activity.distanceUnitSet((settings.hasOwnProperty("distanceUnit") && settings.distanceUnit.values) ? settings.distanceUnit.values[0].value : "m");

    language = (settings.hasOwnProperty("language") && settings.language.values) ? settings.language.values[0].value : "en";
    
    if (settings.hasOwnProperty("timeColor") && settings.timeColor) {
      time.timeEl.style.fill = settings.timeColor;
    }
    
    if (settings.hasOwnProperty("isAmPm")) {
      time.setIsAmPm(!!settings.isAmPm); 
    } 
    
    if (settings.hasOwnProperty("hearRateZoneVis")) {
       hr.setHrZoneVis(!!settings.hearRateZoneVis); 
    } 
    
    if (settings.hasOwnProperty("BMIVis")) {
       bm.setBMIVis(!!settings.BMIVis); 
    } 
    
    if (settings.hasOwnProperty("BMRVis")) {
      bm.setBMRVis(!!settings.BMRVis); 
    } 
    
    if (settings.hasOwnProperty("BaromVis")) {
      barom.setBaromVis(!!settings.BaromVis); 
    } 

    if (settings.hasOwnProperty("dateColor") && settings.dateColor) {
      date.dateEl.style.fill = settings.dateColor;
    }

    if (settings.hasOwnProperty("isFastProgress")) {
      activity.isFastProgressSet(!!settings.isFastProgress);    
    }

    if (settings.hasOwnProperty("isHeartbeatAnimation")) {
      hr.isHeartbeatAnimationSet(!!settings.isHeartbeatAnimation); 
    }       
          

    if (settings.hasOwnProperty("otherLabelsColor") && settings["otherLabelsColor"]) {
       var otherLabelsColor = settings["otherLabelsColor"];
       root.style.fill = otherLabelsColor;      
    }

    if (settings.hasOwnProperty("backgroundColor") && settings["backgroundColor"]) {
       var backgroundColor = settings["backgroundColor"];
       backgroundEl.style.fill = backgroundColor;     
    }

    if (settings.hasOwnProperty("heartColor") && settings["heartColor"]) {
       var heartColor = settings["heartColor"];
       hr.hrIconDiastoleEl.style.fill = heartColor;
       hr.hrIconSystoleEl.style.fill = heartColor;         
    }

    for (var i=0; i < activity.goalTypes.length; i++) {
      var goalTypeProp = activity.goalTypes[i] + "Color";
      if (settings.hasOwnProperty(goalTypeProp) && settings[goalTypeProp]) {
        activity.progressEls[i].container.style.fill = settings[goalTypeProp];
      }
    }
    activity.resetProgressPrevState();
    state.applyState();
  } catch (ex) {
    console.log(ex);
  }
}

applySettings();

export function onsettingschange(data) {
  if (!data) {
   return;
  }
  settings = data;
  applySettings();
  time.drawTime(new Date());
}

messaging.peerSocket.addEventListener("message", function(evt) {
  if (!settings) {
    settings = {};
  }
  settings[evt.data.key] = evt.data.value;
  onsettingschange(settings);
})

appbit.addEventListener("unload", saveSettings);

export function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    console.log(ex);
    var defaults = {
      isHeartbeatAnimation: true,
      isFastProgress: false,
      language: 'en'
    };    
    
    if (units.distance === "us") {
      defaults["distanceUnit"] = { values:[{value:"mi"}]}; 
    }   
    return defaults;
  }
}

// Save settings to the filesystem
export function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}