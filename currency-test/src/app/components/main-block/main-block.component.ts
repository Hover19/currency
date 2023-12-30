import { Component, OnInit, inject } from '@angular/core';
import { CurrencyApiService } from '../../core/services/currency-api.service';

@Component({
  selector: 'app-main-block',
  templateUrl: './main-block.component.html',
  styleUrl: './main-block.component.scss',
})
export class MainBlockComponent implements OnInit {
  private currencyService = inject(CurrencyApiService);

  public readonly fromCurrencyTitle = 'From currency:';
  public readonly amountTitle = 'Amount:';
  public readonly toCurrencyTitle = 'To currency:';
  public readonly convertedAmountTitle = 'Converted amount';
  public readonly fromCurrencyId = 'fromCurrency';
  public readonly toCurrencyId = 'toCurrency';

  public currencyArray: any = [];
  public amount: number | undefined;
  public fromCurrency: string = 'USD';
  public toCurrency: string = 'UAH';
  public convertedAmount: number | undefined;
  public activeSelect: 'from' | 'to' = 'from';

  ngOnInit(): void {
    this.currencyService.getCurrency();
    this.currencyService.currency$.subscribe((data) => {
      this.currencyArray = data.slice(0, 2);
      this.currencyArray[0].currencyCodeA = 'USD';
      this.currencyArray[1].currencyCodeA = 'EUR';
      this.currencyArray.push({ currencyCodeA: 'UAH', rateBuy: 1 });
    });
  }

  convertCurrency(_event?: any, direction?: 'from' | 'to'): void {
    if (direction === 'from') {
      const fromCurrencyRate = this.currencyArray.find(
        (currency: any) => currency.currencyCodeA === this.fromCurrency
      )?.rateBuy;
      const toCurrencyRate = this.currencyArray.find(
        (currency: any) => currency.currencyCodeA === this.toCurrency
      )?.rateBuy;

      if (fromCurrencyRate && toCurrencyRate) {
        this.convertedAmount = Number(
          ((this.amount || 0) * (fromCurrencyRate / toCurrencyRate)).toFixed(2)
        );
      } else {
        console.error('Invalid currency codes');
      }
    } else if (direction === 'to') {
      const fromCurrencyRate = this.currencyArray.find(
        (currency: any) => currency.currencyCodeA === this.fromCurrency
      )?.rateBuy;
      const toCurrencyRate = this.currencyArray.find(
        (currency: any) => currency.currencyCodeA === this.toCurrency
      )?.rateBuy;

      if (fromCurrencyRate && toCurrencyRate) {
        this.amount = Number(
          (
            (this.convertedAmount || 0) *
            (toCurrencyRate / fromCurrencyRate)
          ).toFixed(2)
        );
      } else {
        console.error('Invalid currency codes');
      }
    } else {
      if (this.amount && this.fromCurrency && this.toCurrency) {
        const fromCurrencyRate = this.currencyArray.find(
          (currency: any) => currency.currencyCodeA === this.fromCurrency
        )?.rateBuy;
        const toCurrencyRate = this.currencyArray.find(
          (currency: any) => currency.currencyCodeA === this.toCurrency
        )?.rateBuy;

        if (fromCurrencyRate && toCurrencyRate) {
          this.convertedAmount = Number(
            ((this.amount * fromCurrencyRate) / toCurrencyRate).toFixed(2)
          );
        } else {
          console.error('Invalid currency codes');
        }
      }
    }
  }

  public toggleActiveOptions(): void {
    [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency];

    [this.amount, this.convertedAmount] = [this.convertedAmount, this.amount];

    if (this.activeSelect === 'from') {
      this.convertCurrency('from');
    } else {
      this.convertCurrency('to');
    }
  }
}
