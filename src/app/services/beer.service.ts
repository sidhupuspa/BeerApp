import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError, retryWhen, delay, take } from 'rxjs/operators';
import { Beer } from '../models/beer.model';
import { Observable, throwError, Subject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BeerService {
  searchBeerSubject: Subject<Beer[]>;
  noDataSubject: Subject<Boolean>;
  constructor(private http: HttpClient) {
    this.searchBeerSubject = new Subject<Beer[]>();
    this.noDataSubject = new Subject<Boolean>();
  }

  params = new HttpParams().set('ids', Beer.getRandomBeerId(111));

  getRandomBear(): Observable<Beer> {
    return this.http.get('https://api.punkapi.com/v2/beers/random').pipe(
      map((responsedata: any) => {
        if (
          responsedata &&
          responsedata.length == 1 &&
          responsedata.name !== '' &&
          responsedata.description !== ''
        ) {
          return new Beer(
            responsedata[0].id,
            responsedata[0].name,
            responsedata[0].description,
            responsedata[0].image_url
          );
        }
        throw responsedata;
      }),
      retryWhen((errors) => errors.pipe(delay(1000), take(3)))
    );
  }
  getRandomNonAlcholicBeerDetails(params: HttpParams): Observable<Beer> {
    return this.http
      .get('https://api.punkapi.com/v2/beers', { params: params })
      .pipe(
        map((responseData: any) => {
          if (responseData && responseData.length > -1) {
            const randomElement =
              responseData[Math.floor(Math.random() * responseData.length)];
            return new Beer(
              randomElement.id,
              randomElement.name,
              randomElement.description,
              randomElement.image_url
            );
          }
          return undefined;
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
  }
  getSearchResultByNameAndDescription(params: HttpParams): Observable<Beer[]> {
    return this.http
      .get('https://api.punkapi.com/v2/beers', { params: params })
      .pipe(
        map((responsedata: any) => {
          console.log(responsedata);
          if (responsedata.length > 0) {
            let beers = (Beer[responsedata.length] = []);
            responsedata.forEach((element: any) => {
              let beer = new Beer(
                element.id,
                element.name,
                element.description,
                element.image_url
              );
              beers.push(beer);
            });
            return beers;
          }
          return [];
        })
      );
  }
}
