import { BeerSearchComponent } from './beer-search.component';
import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { BeerService } from '../services/beer.service';
import { of, Subject } from 'rxjs';
import { Beer } from '../models/beer.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgForm } from '@angular/forms';
import { DebugElement } from '@angular/core';

describe('BeerSearchComponent', () => {
  let objBeerSearch: BeerSearchComponent;
  let fixture: ComponentFixture<BeerSearchComponent>;

  let beerService = {
    getSearchResultByNameAndDescription: (params) => {
      return of([new Beer(1, 'name', 'desc', 'testurl')]);
    },
    searchBeerSubject: new Subject<Beer[]>(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeerSearchComponent],
      imports: [HttpClientTestingModule, FormsModule],
    });

    TestBed.overrideComponent(BeerSearchComponent, {
      set: { providers: [{ provide: BeerService, useValue: beerService }] },
    });

    fixture = TestBed.createComponent(BeerSearchComponent);
    objBeerSearch = fixture.componentInstance;
  });

  it('should return search result by name', fakeAsync(() => {
    objBeerSearch.selectedFilterType = 'beer_name';
    let isSearchBeersEmitted = false;
    let ff = { value: { beername: 'buz' } } as NgForm;
    beerService.searchBeerSubject.subscribe((data) => {
      isSearchBeersEmitted = true;
    });
    objBeerSearch.onSubmit(ff);
    tick();
    expect(isSearchBeersEmitted).toBeTrue();
  }));
});
