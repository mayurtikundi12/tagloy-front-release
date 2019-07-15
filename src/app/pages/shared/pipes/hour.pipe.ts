import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourpipe'
})
export class HourPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let rawValue = value.split("_")[1]
    rawValue<10?rawValue="0"+rawValue+":00":rawValue=rawValue+":00"
    return rawValue;
  }

}
