import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CurrencyApiService } from '../../core/services/currency-api.service';
import { interval, takeUntil, Subject } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private currencyService = inject(CurrencyApiService);

  private destroy$ = new Subject<void>();

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

  public currency$ = this.currencyService.currency$;
  public currentDate: string = '';

  public ngOnInit(): void {
    this.updateDate();

    interval(3600000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateDate();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateDate(): void {
    const currentDate = new Date();
    this.currentDate = `${currentDate.getDate()} ${
      this.monthNames[currentDate.getMonth()]
    }, ${currentDate.getFullYear()}`;
  }
}
