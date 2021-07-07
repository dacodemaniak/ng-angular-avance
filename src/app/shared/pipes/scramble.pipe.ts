import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'scramble'
})
export class ScramblePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return this.scrambledPassword(value, args);
  }

  private scrambledPassword(password: string, args: any[]): string {
    const passwordLength = password.length;
    const starFillLength = passwordLength - 2;
    const stars = new Array(starFillLength);

    if (args.length) {
      stars.fill(args[0].wildCard)
    } else {
      stars.fill('*');
    }

    return password.substr(0,1) + stars.join('') + password.substr(password.length - 1, 1);
  }
}
