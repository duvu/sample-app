import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'perm',
    template: `
        <md-button-toggle-group [(ngModel)]="value" (change)="onChange()" [name]="name" [disabled]="disabled">
            <md-button-toggle value="0" i18n>None</md-button-toggle>
            <md-button-toggle value="1" i18n>Read</md-button-toggle>
            <md-button-toggle value="2" i18n>Write</md-button-toggle>
            <md-button-toggle value="3" i18n>Full</md-button-toggle>
            <md-button-toggle value="4">
                <span i18n>Custom</span>
                <md-icon>navigate_next</md-icon>
            </md-button-toggle>
        </md-button-toggle-group>
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
