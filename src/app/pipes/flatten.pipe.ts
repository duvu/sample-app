import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'flatten'
})
export class FlattenPipe implements PipeTransform {

  transform(values: any[], args: string): string {
      let ret = '';
      _.forEach(values, (value => {
          ret += value[args];
      }));
    return ret;
  }

}
