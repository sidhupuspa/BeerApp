import { BeerService } from './beer.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Beer } from '../models/beer.model';

describe('checking functionality of beer service', () => {
  let objBeerservice: BeerService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    objBeerservice = TestBed.get(BeerService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(objBeerservice).toBeTruthy();
  });

  it('should call get random beer with out error', () => {
    // Make an HTTP GET request
    let testUrl = 'https://api.punkapi.com/v2/beers/random';
    let testData = { id: 1, name: 'buz', description: '....' } as Beer;
    httpClient.get<Beer>(testUrl).subscribe((data) => {
      expect(data).toBe(testData);
    });

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();
  });

  it('get random non alcoholic beer without any error', () => {
    let testUrl = 'https://api.punkapi.com/v2/beers?abv_lt=4.1';
    let testData = { id: 1, name: 'buz', description: '....' } as Beer;
    httpClient.get(testUrl).subscribe((data) => {
      expect(data).toBe(testData);
    });
    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  });

  it('get random beer by name', () => {
    let testUrl = 'https://api.punkapi.com/v2/beers?beer_name=rice';
    let testData = { name: 'buzz' } as Beer;
    httpClient.get<Beer>(testUrl).subscribe((data) => {
      expect(data).toBe(testData);
    });
    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  });
  it('get random beer by description', () => {
    let testUrl = 'https://api.punkapi.com/v2/beers?beer_name=rice';
    let testData = { description: 'rice' } as Beer;
    httpClient.get<Beer>(testUrl).subscribe((data) => {
      expect(data).toBe(testData);
    });
    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  });
});
