import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface Day {
  id: number;
  name: string;
  s_name: string;
  selected: boolean;
  isWeekDay: boolean;
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

  get data(): Array<any> {
    return this.internal_week_days.map((value: Day, index: number) => {
      return {
        id: value.id,
        name: this.display(value),
        selected: value.selected
      };
    });
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
    this.internal_week_days[i].selected = !this.internal_week_days[i].selected;
    this.dayChanged.emit(this.internal_week_days[i]);
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
    const isAll = !this.checkIfAllDays();
    for (let i = 0; i < this.internal_week_days.length; i++) {
      this.internal_week_days[i].selected = isAll;
    }
  }

  toggleWeekDays(): void {
    const isWeekdays = !this.checkIfWeekDays();
    for (let i = 0; i < this.internal_week_days.length; i++) {
      if (this.internal_week_days[i].isWeekDay) {
        this.internal_week_days[i].selected = isWeekdays;
      } else {
        this.internal_week_days[i].selected = false;
      }
    }
  }

  toggleWeekend(): void {
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
