import { NgModule } from '@angular/core';
import { FlattenPipe } from 'app/pipes/flatten.pipe';
import { OrderBy } from 'app/pipes/order-by.pipe';
import { FilterPipe } from 'app/pipes/filter.pipe';
import { TimeDistancePipe } from './time-distance.pipe';

@NgModule({
    imports: [
    ],
    declarations: [
        OrderBy,
        FilterPipe,
        FlattenPipe,
        TimeDistancePipe
    ],
    exports: [
        OrderBy,
        FilterPipe,
        FlattenPipe,
        TimeDistancePipe
    ]
})
export class CustomPipeModule { }
