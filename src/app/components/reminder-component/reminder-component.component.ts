import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reminder-component',
  templateUrl: './reminder-component.component.html',
  styleUrls: ['./reminder-component.component.scss']
})
export class ReminderComponentComponent implements OnInit {


  // to show list of default reminders reminders
  showDefaultReminder: boolean = true;

  time: FormControl = new FormControl(new Date().toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit", hour12: true }));

  date = new FormControl(new Date());
  minDate = new Date();

  @Output() reminderData = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  checkTime(time) {
    let currentTime = new Date().getHours();
    if (time > currentTime)
      return false;
    return true;
  }

  /**
   * @description emits an event to send data back to parent component
   */
  saveDateTime() {
    let reminderDate = new DatePipe('en-US').transform(this.date.value, "yyyy-MM-dd");
    let reminderTime = this.convertTo24Hour(this.time.value);
    // console.log(reminderTime)
    this.reminderData.emit(reminderDate + "T" + reminderTime);
  }

  convertTo24Hour(timeStr) {
    var colon = timeStr.indexOf(':');
    var hours = timeStr.substr(0, colon),
      minutes = timeStr.substr(colon + 1, 2),
      meridian = timeStr.substr(colon + 4, 2).toUpperCase();


    var hoursInt = parseInt(hours, 10),
      offset = meridian == 'PM' ? 12 : 0;

    if (hoursInt === 12) {
      hoursInt = offset;
    } else {
      hoursInt += offset;
    }
    if(hoursInt<10){
      hours="0"+hoursInt;
    }
    else
      hours=hoursInt;

    return hours + ":" + minutes;
  }

  setReminder(time, day?, tomorrow?) {

    if (tomorrow) {
      var currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1);
      let reminderDate = new DatePipe('en-US').transform(currentDate, "yyyy-MM-dd");
      let reminderTime = this.convertTo24Hour(time);
      this.reminderData.emit(reminderDate + "T" + reminderTime);
    }
    else if (day) {
      var date = new Date();
      date.setDate(date.getDate() +  (1 - 1 - date.getDay() + 7) % 7 + 1);
      let reminderDate = new DatePipe('en-US').transform(date, "yyyy-MM-dd");
      let reminderTime = this.convertTo24Hour(time);
      this.reminderData.emit(reminderDate + "T" + reminderTime);
    }
    else {
      let reminderDate = new DatePipe('en-US').transform(Date.now(), "yyyy-MM-dd");
      let reminderTime = this.convertTo24Hour(time);
      this.reminderData.emit(reminderDate + "T" + reminderTime);
    }
  }

  setTime(time) {
    this.time.setValue(time);
  }
}