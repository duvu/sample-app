import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'perm',
    template: `
        <mat-button-toggle-group [(ngModel)]="value" (change)="onChange()" [name]="name" [disabled]="disabled">
            <mat-button-toggle value="0" i18n>None</mat-button-toggle>
            <mat-button-toggle value="1" i18n>Read</mat-button-toggle>
            <mat-button-toggle value="2" i18n>Write</mat-button-toggle>
            <mat-button-toggle value="3" i18n>Full</mat-button-toggle>
            <mat-button-toggle value="4">
                <span i18n>Custom</span>
                <mat-icon>navigate_next</mat-icon>
            </mat-button-toggle>
        </mat-button-toggle-group>
    `,
    styles: [``]
})
export class PermComponent {

    private _value: number;
    private _name: string;
    private _disabled: boolean = false;

    @Output() change = new EventEmitter<number>();
    constructor() { }

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: boolean) {
        this._disabled = value;
    }

    @Input()
    set value(value: number) {
        this._value = value;
    }
    get value() : number {
        return this._value;
    }

    @Input()
    set name(name:string) {
        this._name = name;
    }
    get name():string {
        return this._name;
    }

    onChange() {
        this.change.emit(this.value);
    }
}
