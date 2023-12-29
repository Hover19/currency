import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  interval,
  pipe,
  switchMap,
  map,
} from 'rxjs';
import { url } from '../constants/url';

@Injectable({
  providedIn: 'root',
})
export class CurrencyApiService {
  private currency = new BehaviorSubject<any>([]);

  public currency$ = this.currency.asObservable();

  private http = inject(HttpClient);

  public getCurrency(): void {
    this.http.get(url.monoApi).subscribe((data) => {
      this.currency.next(data);
      console.log(data);
    });
  }

  public startPeriodicUpdates(intervalTime: number): Observable<any> {
    return interval(intervalTime).pipe(
      switchMap(() => this.http.get(url.monoApi))
    );
  }

  constructor() {
    this.init();
  }

  private init() {
    this.getCurrency();
  }
}
