import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reminder-component',
  templateUrl: './reminder-component.component.html',
  styleUrls: ['./reminder-component.component.scss']
})
export class ReminderComponentComponent implements OnInit {


  // to show list of default reminders reminders
  showDefaultReminder:boolean=true;

  time:FormControl=new FormControl(new Date().toLocaleTimeString());

  date = new FormControl(new Date());
  
  @Output() reminderData=new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  checkTime(time){
    let currentTime=new Date().getHours();
    if(time>currentTime)
      return false;
    return true;
  }

  /**
   * @description emits an event to send data back to parent component
   */
  saveDateTime(){
    this.reminderData.emit({date:this.date.value,time:this.time.value});
  }
}