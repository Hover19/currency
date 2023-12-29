import { Component, inject, OnInit } from '@angular/core';
import { CurrencyApiService } from '../../core/services/currency-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private currencyService = inject(CurrencyApiService);

  public readonly monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  public readonly hryvna = 'Hryvna';

  public currency$ = this.currencyService.currency$;

  public currentDate = `${new Date().getDate()} ${
    this.monthNames[new Date().getMonth()]
  }, ${new Date().getFullYear()}`;

  ngOnInit() {
    this.currencyService.startPeriodicUpdates(600000).subscribe((data) => {
      console.log('Updated data:', data);
    });
  }
}
