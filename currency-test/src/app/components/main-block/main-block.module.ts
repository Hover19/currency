import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainBlockComponent } from './main-block.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MainBlockComponent],
  exports: [MainBlockComponent],
  imports: [CommonModule, AngularSvgIconModule.forRoot(), HttpClientModule],
})
export class MainBlockModule {}
