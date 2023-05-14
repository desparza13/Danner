import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchValueService {
  private _searchValue= new BehaviorSubject<string>('');
  private _searchValue$ = this._searchValue.asObservable();

  getSearchValue(): Observable<string>{
    return this._searchValue$;
  }

  setSearchValue(latestValue: string){
    return this._searchValue.next(latestValue);
  }
  constructor() { }
}
