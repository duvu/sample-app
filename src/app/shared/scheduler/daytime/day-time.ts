import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {MyTime, TimeInput} from './time-input';

@Component({
  selector: 'daytime',
  templateUrl: './daytime.html',
  styleUrls: ['./daytime.scss']
})
export class DayTime implements OnInit {

  scheduleTime: MyTime;
  @Input() editMode = true;
  @ViewChild(TimeInput) timeInput: TimeInput;
  constructor() { }

  ngOnInit() {
    this.scheduleTime = new MyTime('00', '00', '23', '59');
  }

  setBizTime() {
    this.scheduleTime = {fromHour: '08', fromMinute: '00', toHour: '17', toMinute: '59'};
  }

  setAllDay() {
    this.scheduleTime = {fromHour: '00', fromMinute: '00', toHour: '23', toMinute: '59'};
  }
}
