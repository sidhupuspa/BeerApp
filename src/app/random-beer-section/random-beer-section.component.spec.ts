import { RandomBeerSectionComponent } from './random-beer-section.component';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BeerService } from '../services/beer.service';
import { Beer } from '../models/beer.model';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('should test RandomBeerSectionComponent', () => {
  let objRandomBeer: RandomBeerSectionComponent;
  let fixture: ComponentFixture<RandomBeerSectionComponent>;
  let button: DebugElement;
  let beerService = {
    getRandomBear: () => {
      return of(new Beer(1, 'alu', 'tomato', 'testurl'));
    },
    getRandomNonAlcholicBeerDetails: () => {
      return of(new Beer(1, 'a', 't', 'testurl1'));
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RandomBeerSectionComponent],
    });

    TestBed.overrideComponent(RandomBeerSectionComponent, {
      set: { providers: [{ provide: BeerService, useValue: beerService }] },
    });
    fixture = TestBed.createComponent(RandomBeerSectionComponent);
    objRandomBeer = fixture.componentInstance;
  });

  it('should test random non alcoholic beer', fakeAsync(() => {
    let button = fixture.debugElement.queryAll(By.css('button'));
    button[1].nativeElement.click();
    tick();
    let beer = new Beer(1, 'a', 't', 'testurl1');
    expect(objRandomBeer.beer).toEqual(beer);
  }));

  it('should test random alcoholic beer on page load', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    let beer = new Beer(1, 'alu', 'tomato', 'testurl');
    expect(objRandomBeer.beer).toEqual(beer);
  }));

  it('should test random alcoholic beer on button click', fakeAsync(() => {
    let button = fixture.debugElement.queryAll(By.css('button'));
    button[0].nativeElement.click();
    tick();
    let beer = new Beer(1, 'alu', 'tomato', 'testurl');
    expect(objRandomBeer.beer).toEqual(beer);
  }));
});
