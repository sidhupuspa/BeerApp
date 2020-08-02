import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BeerService } from '../services/beer.service';
import { Beer } from '../models/beer.model';
import { PageEvent } from '@angular/material/paginator/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit, AfterViewInit {
  beers: Beer[] = [];
  isNoDataFound: Boolean = false;
  subscription: Subscription;
  constructor(private beerService: BeerService) {}
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    this.subscription = this.beerService.searchBeerSubject.subscribe(
      (beers) => {
        this.beers = beers;
        this.isNoDataFound = false;
      }
    );
    this.subscription = this.beerService.noDataSubject.subscribe((isnodata) => {
      this.isNoDataFound = isnodata;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
