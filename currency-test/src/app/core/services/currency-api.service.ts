import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { url } from '../constants/url';

@Injectable({
  providedIn: 'root',
})
export class CurrencyApiService {
  private currency = new BehaviorSubject<any>([]);

  public currency$ = this.currency.asObservable();

  private http = inject(HttpClient);

  public getCurrency(): void {
    this.http.get(url.pbApi).subscribe((data) => {
      this.currency.next(data);
      console.log(data);
    });
  }

  constructor() {
    this.init();
  }

  private init() {
    this.getCurrency();
  }
}
