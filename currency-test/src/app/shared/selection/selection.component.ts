import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyData } from './currency-interface';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.scss',
})
export class SelectionComponent {
  @Input() public id: string;
  @Input() public forLabel: string;
  @Input() public valueNg: string;
  @Input() public options: CurrencyData[];
  @Input() public labelText: string;

  @Output() public valueNgChange = new EventEmitter<string>();

  public onSelectionChange(): void {
    this.valueNgChange.emit(this.valueNg);
  }
}
