import { NgModule } from '@angular/core';
import { FlattenPipe } from 'app/shared/pipes/flatten.pipe';
import { OrderBy } from 'app/shared/pipes/order-by.pipe';
import { FilterPipe } from 'app/shared/pipes/filter.pipe';

@NgModule({
    imports: [
    ],
    declarations: [
        OrderBy,
        FilterPipe,
        FlattenPipe
    ],
    exports: [
        OrderBy,
        FilterPipe,
        FlattenPipe]
})
export class CustomPipeModule { }
