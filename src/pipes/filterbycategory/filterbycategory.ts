import { Pipe, PipeTransform, Injectable } from '@angular/core';

/**
 * Generated class for the FilterbycategoryPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filterbycategory',
  pure: false
})

@Injectable()
export class FilterbycategoryPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(deals: any[], category: String): any {
    if(!deals || !category){
      return deals
    }
    return deals.filter(deal => deal.deal.DealCategoryName == category);
  }
}
