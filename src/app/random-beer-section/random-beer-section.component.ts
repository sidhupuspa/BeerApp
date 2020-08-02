import { Component, OnInit, OnDestroy } from '@angular/core';
import { BeerService } from '../services/beer.service';
import { Beer } from '../models/beer.model';
import { HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-random-beer-section',
  templateUrl: './random-beer-section.component.html',
  styleUrls: ['./random-beer-section.component.css'],
})
export class RandomBeerSectionComponent implements OnInit, OnDestroy {
  beer: Beer;
  constructor(private beerservice: BeerService) {}

  subscription: Subscription;
  ngOnInit(): void {
    this.getRandomBears();
  }
  getRandomBears() {
    this.beerservice.getRandomBear().subscribe((data: Beer) => {
      this.beer = data;
    });
  }
  getRandomNonAlcoholicBeer() {
    const params = new HttpParams().set('abv_lt', '5');
    this.subscription = this.beerservice
      .getRandomNonAlcholicBeerDetails(params)
      .subscribe((data: Beer) => {
        this.beer = data;
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
