import { Pipe, PipeTransform } from '@angular/core';
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

@Pipe({
  name: 'timeDistance'
})
export class TimeDistancePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return distanceInWordsToNow(value);
  }

}
