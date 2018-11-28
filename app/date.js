import document from "document"; 
import * as weekday from "../common/weekday"
import * as util from "../common/utils";
//Date - START

export let dayEl = document.getElementById("day");
export let dateEl = document.getElementById("date"); 
//Date - END

export function drawDate(now, language) {
  let day = now.getDate();
  let monthIndex = now.getMonth() + 1;
  let year = now.getYear() % 100;
  
  
  let dayName = weekday.getWeekdayName(language, now.getDay());

  var dateText;  

  dateText= util.zeroPad(day) + "." + util.zeroPad(monthIndex)+ "." + year;    

  dayEl.text = `${dayName}`;
  dateEl.text =  dateText;
}