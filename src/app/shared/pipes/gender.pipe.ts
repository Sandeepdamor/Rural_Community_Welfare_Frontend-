import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: string, args: string): string {
    if (args == 'Male')
      return "Mr. " + value;
    else if (args == 'Female')
      return "Mrs. " + value;

    return "";
  }
}
