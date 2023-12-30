import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionComponent } from './selection.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SelectionComponent],
  exports: [SelectionComponent],
  imports: [CommonModule, FormsModule],
})
export class SelectionModule {}
