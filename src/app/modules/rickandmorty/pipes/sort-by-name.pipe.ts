import { Pipe, PipeTransform } from '@angular/core';
import { SingleSharacter } from '../interfaces/singleSharacter.interface';

@Pipe({
  name: 'sortByName'
})
export class SortByNamePipe implements PipeTransform {

  transform(items: Array<SingleSharacter>, order: string = 'none'): Array<SingleSharacter> {
    console.log(order);
    switch (order) {
      case 'none':
        return items;
      case 'up':
        return items.slice().sort((prev: SingleSharacter, next: SingleSharacter) => {
          return prev.name > next.name ? 1 : (prev.name < next.name ? -1 : 0);
        });
      case 'down':
        return items.slice().sort((prev: SingleSharacter, next: SingleSharacter) => {
          return prev.name < next.name ? 1 : (prev.name > next.name ? -1 : 0);
        });
    }
  }

}
