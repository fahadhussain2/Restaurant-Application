import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AutoCompleteService } from 'ionic2-auto-complete'

/*
  Generated class for the SetupcountryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SetupcountryProvider implements AutoCompleteService {

  labelAttribute = "Name";

  constructor(public http: Http) {
    console.log('Hello SetupcountryProvider Provider');
  }

  getResults(keyword:string) {
    return this.http.get("https://www.tablesure.com/api/SetupCountry/Autofill?filter="+keyword)
      .map(
        result =>
        {
          console.log('Country', result)
          return result.json()
            .filter(item => item.Name.toLowerCase().startsWith(keyword.toLowerCase()) )
        });
  }

}
