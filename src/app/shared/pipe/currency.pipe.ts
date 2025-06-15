import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number, currencySymbol = 'Rp', locale = 'id-ID'): string {
    if (value === null || value === undefined) {
      return '';
    }
    return currencySymbol + ' ' + value.toLocaleString(locale);
  }
}
