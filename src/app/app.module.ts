import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeerDeatilsComponent } from './beer-details/beer-details.component';
import { RouterModule, Routes } from '@angular/router';
import { RandomBeerSectionComponent } from './random-beer-section/random-beer-section.component';
import { ContainerComponent } from './container/container.component';
import { BeerSearchComponent } from './beer-search/beer-search.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [{ path: '', component: ContainerComponent }];

@NgModule({
  declarations: [
    AppComponent,
    BeerDeatilsComponent,
    RandomBeerSectionComponent,
    BeerSearchComponent,
    ContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
