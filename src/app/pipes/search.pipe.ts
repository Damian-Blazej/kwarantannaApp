import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(countries: any[], text): any[] {

    if(text===''){
      return countries;
    }

    text = text.toLowerCase();

    return countries.filter(item => {
      return item.Country.toLowerCase().includes(text);
    })
  }
}
