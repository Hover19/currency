import { Component, OnInit, inject } from '@angular/core';
import { CurrencyApiService } from '../../core/services/currency-api.service';

@Component({
  selector: 'app-main-block',
  templateUrl: './main-block.component.html',
  styleUrl: './main-block.component.scss',
})
export class MainBlockComponent implements OnInit {
  private currencyService = inject(CurrencyApiService);

  public currencyArray: any = [];
  public amount: number | undefined;
  public fromCurrency: string | undefined;
  public toCurrency: string | undefined;
  public convertedAmount: number | undefined;

  ngOnInit(): void {
    this.currencyService.getCurrency();
    this.currencyService.currency$.subscribe((data) => {
      this.currencyArray = data.slice(0, 2);
      this.currencyArray[0].currencyCodeA = 'USD';
      this.currencyArray[1].currencyCodeA = 'EUR';
      this.currencyArray.push({ currencyCodeA: 'UAH', rateBuy: 1 });
    });
  }

  convertCurrency(direction?: 'from' | 'to'): void {
    if (direction === 'from') {
      const fromCurrencyRate = this.currencyArray.find(
        (c: any) => c.currencyCodeA === this.fromCurrency
      )?.rateBuy;
      const toCurrencyRate = this.currencyArray.find(
        (c: any) => c.currencyCodeA === this.toCurrency
      )?.rateBuy;

      if (fromCurrencyRate !== undefined && toCurrencyRate !== undefined) {
        this.convertedAmount =
          (this.amount || 0) * (fromCurrencyRate / toCurrencyRate);
      } else {
        console.error('Invalid currency codes');
      }
    } else if (direction === 'to') {
      const fromCurrencyRate = this.currencyArray.find(
        (c: any) => c.currencyCodeA === this.fromCurrency
      )?.rateBuy;
      const toCurrencyRate = this.currencyArray.find(
        (c: any) => c.currencyCodeA === this.toCurrency
      )?.rateBuy;

      if (fromCurrencyRate !== undefined && toCurrencyRate !== undefined) {
        this.amount =
          (this.convertedAmount || 0) * (toCurrencyRate / fromCurrencyRate);
      } else {
        console.error('Invalid currency codes');
      }
    } else {
      if (
        this.amount !== undefined &&
        this.fromCurrency !== undefined &&
        this.toCurrency !== undefined
      ) {
        const fromCurrencyRate = this.currencyArray.find(
          (c: any) => c.currencyCodeA === this.fromCurrency
        )?.rateBuy;
        const toCurrencyRate = this.currencyArray.find(
          (c: any) => c.currencyCodeA === this.toCurrency
        )?.rateBuy;

        if (fromCurrencyRate !== undefined && toCurrencyRate !== undefined) {
          this.convertedAmount =
            (this.amount * fromCurrencyRate) / toCurrencyRate;
        } else {
          console.error('Invalid currency codes');
        }
      }
    }
  }
}
