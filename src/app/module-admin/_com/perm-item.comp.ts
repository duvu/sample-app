import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PermItemEvent} from "./perm-item-event";

@Component({
    selector: 'perm-item',
    template: `
        <md-list-item>
            <md-icon md-list-icon>{{icon}}</md-icon>
            <h4 md-line><ng-content></ng-content></h4>
            <md-button-toggle-group [(ngModel)]="value" (change)="onChange()" [disabled]="disabled" [name]="name">
                <md-button-toggle value="0" i18n>None</md-button-toggle>
                <md-button-toggle value="1" i18n>Read</md-button-toggle>
                <md-button-toggle value="2" i18n>Write</md-button-toggle>
            </md-button-toggle-group>
        </md-list-item>
    `,
    styles: [``]
})
export class PermItemComponent {
    private _value: number;
    private _name: string;
    private _icon: string;
    private _disabled: boolean;
    @Output() change = new EventEmitter<any>();

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
    get value(): number {
        return this._value;
    }

    @Input()
    set name(value: string) {
        this._name = value;
    }
    get name(): string {
        return this._name;
    }

    @Input()
    set icon(value: string) {
        this._icon = value;
    }
    get icon(): string {
        return this._icon;
    }
    constructor() { }

    onChange() {
        let event = new PermItemEvent(this.name, this.value);
        this.change.emit(event);
    }
}
