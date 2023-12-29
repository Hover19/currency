import { Component, inject, OnInit } from '@angular/core';
import { CurrencyApiService } from '../../core/services/currency-api.service';
import { interval } from 'rxjs';
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
  public currentDate: string = '';

  ngOnInit() {
    this.updateDate();

    interval(3600000).subscribe(() => {
      this.updateDate();
    });

    this.currencyService.startPeriodicUpdates(600000).subscribe((data) => {
      console.log('Updated data:', data);
    });
  }

  private updateDate(): void {
    const currentDate = new Date();
    this.currentDate = `${currentDate.getDate()} ${
      this.monthNames[currentDate.getMonth()]
    }, ${currentDate.getFullYear()}`;
  }
}
