import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface Day {
  id: number;
  name: string;
  s_name: string;
  selected: boolean;
  isWeekDay: boolean;
}

export class DaySelected {
    sunday: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
}

@Component({
  selector: 'weekday',
  templateUrl: './weekday.html',
  styleUrls: ['./weekday.scss']
})
export class Weekday implements OnInit {
  @Input() type: 'short' | 'long' = 'short';
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
  @Input() buttonPosition: 'above' | 'below' | 'right' | 'left' = 'below';
  @Input() editMode: true | false = true;

  @Output() dayChanged = new EventEmitter<Day>();

  get week_days() {
    return this.internal_week_days;
  }
  private internal_week_days: Array<Day> = [
    { id: 0,   name: 'Sunday',     s_name: 'Sun', selected: false, isWeekDay: false },
    { id: 1,   name: 'Monday',     s_name: 'Mon', selected: false, isWeekDay: true },
    { id: 2,   name: 'Tuesday',    s_name: 'Tue', selected: false, isWeekDay: true },
    { id: 3,   name: 'Wednesday',  s_name: 'Wed', selected: false, isWeekDay: true },
    { id: 4,   name: 'Thursday',   s_name: 'Thu', selected: false, isWeekDay: true},
    { id: 5,   name: 'Friday',     s_name: 'Fri', selected: false, isWeekDay: true},
    { id: 6,   name: 'Saturday',   s_name: 'Sat', selected: false, isWeekDay: false}
  ];

  @Input()
  set data(s_input: DaySelected) {
      this.internal_week_days[0].selected = s_input.sunday;
      this.internal_week_days[1].selected = s_input.monday;
      this.internal_week_days[2].selected = s_input.tuesday;
      this.internal_week_days[3].selected = s_input.wednesday;
      this.internal_week_days[4].selected = s_input.thursday;
      this.internal_week_days[5].selected = s_input.friday;
      this.internal_week_days[6].selected = s_input.saturday;
  }

  get data(): DaySelected {
      const ds = new DaySelected();
      ds.sunday = this.internal_week_days[0].selected;
      ds.monday = this.internal_week_days[1].selected;
      ds.tuesday = this.internal_week_days[2].selected;
      ds.wednesday = this.internal_week_days[3].selected;
      ds.thursday = this.internal_week_days[4].selected;
      ds.friday = this.internal_week_days[5].selected;
      ds.saturday = this.internal_week_days[6].selected;

      return ds;
  }

  static toggleColor(isSelected: boolean): string {
    if (isSelected) {
      return 'primary';
    } else {
      return '';
    }
  }

  constructor() { }

  ngOnInit() {
  }

  display(d: Day): string {
    if (this.type === 'short') {
      return d.s_name;
    } else {
      return d.name;
    }
  }

  toggle(i: number, day: Day): void {
      if (this.editMode) {
          this.internal_week_days[i].selected = !this.internal_week_days[i].selected;
          this.dayChanged.emit(this.internal_week_days[i]);
      }
  }

  checkIfAllDays(): boolean {
    for (let i = 0; i < this.internal_week_days.length; i++) {
      if (!this.internal_week_days[i].selected) {
        return false;
      }
    }
    return true;
  }

  checkIfWeekDays(): boolean {
    for (let i = 0; i < this.internal_week_days.length; i++) {
      if (!this.internal_week_days[i].selected && this.internal_week_days[i].isWeekDay) {
        return false;
      } else if (this.internal_week_days[i].selected && !this.internal_week_days[i].isWeekDay) {
        return false;
      }
    }
    return true;
  }
  checkIfWeekend(): boolean {
    for (let i = 0; i < this.internal_week_days.length; i++) {
      if (!this.internal_week_days[i].selected && !this.internal_week_days[i].isWeekDay) {
        return false;
      } else if (this.internal_week_days[i].selected && this.internal_week_days[i].isWeekDay) {
        return false;
      }
    }
    return true;
  }

  colorAll(): string {
    return Weekday.toggleColor(this.checkIfAllDays());
  }

  colorWeekDays(): string {
    return Weekday.toggleColor(this.checkIfWeekDays());
  }

  colorWeekend(): string {
    return Weekday.toggleColor(this.checkIfWeekend());
  }

  toggleAllDays(): void {
      if (this.editMode) {
          const isAll = !this.checkIfAllDays();
          for (let i = 0; i < this.internal_week_days.length; i++) {
              this.internal_week_days[i].selected = isAll;
          }
      }
  }

  toggleWeekDays(): void {
      if (this.editMode) {
          const isWeekdays = !this.checkIfWeekDays();
          for (let i = 0; i < this.internal_week_days.length; i++) {
              if (this.internal_week_days[i].isWeekDay) {
                  this.internal_week_days[i].selected = isWeekdays;
              } else {
                  this.internal_week_days[i].selected = false;
              }
          }
      }
  }

  toggleWeekend(): void {
      if (this.editMode) {
          const isWeekend = !this.checkIfWeekend();
          for (let i = 0; i < this.internal_week_days.length; i++) {
              if (!this.internal_week_days[i].isWeekDay) {
                  this.internal_week_days[i].selected = isWeekend;
              } else {
                  this.internal_week_days[i].selected = false;
              }
          }
      }
  }
}
