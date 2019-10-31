import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'myDate'
})
export class MyDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var today=new Date();

    value=value.replace("GMT+0000", "GMT+0530");

    var todayFormat=new DatePipe('en-US').transform(today, "MMM d, y");
    var remiderDate=new DatePipe('en-US').transform(value, "MMM d, y");
    
    var time=new Date(value).toLocaleString("en-US", {hour: "numeric", minute: "numeric", hour12: true});

    if(todayFormat==remiderDate)
    {
      return "today"+" "+time;
    }

    var tomorrow=today.setDate(today.getDate()+1);
    var tomorrowFormat=new DatePipe('en-US').transform(tomorrow, "MMM d, y")
    

    console.log(todayFormat,tomorrowFormat,remiderDate)
    if(remiderDate==tomorrowFormat)
    {
      return "tomorrow"+" "+time;
    }
    return remiderDate+","+time;
  }

}
