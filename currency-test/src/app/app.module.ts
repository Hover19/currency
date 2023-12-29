import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Component modules
import { HeaderModule } from './components/header/heder.module';
import { MainBlockModule } from './components/main-block/main-block.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HeaderModule, MainBlockModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
