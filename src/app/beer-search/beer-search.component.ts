import { Component, ViewChild, OnDestroy } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { BeerService } from '../services/beer.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-beer-search',
  templateUrl: './beer-search.component.html',
  styleUrls: ['./beer-search.component.css'],
})
export class BeerSearchComponent implements OnDestroy {
  options: { [key: string]: string } = {};
  selectedFilterType: string;
  subscription: Subscription;
  constructor(private beerservice: BeerService) {
    this.options['beer_name'] = 'By Name';
    this.options['description'] = 'By Description';
  }

  @ViewChild('formRef', { static: false }) submitForm: NgForm;
  beername: string = '';
  // starting with space or - is not allowed as It doesn't make any sense.
  unamePattern = '^(?=.*[a-zA-Z0-9])[a-zA-Z0-9 -]+$';

  onSubmit(form: NgForm) {
    this.beername = form.value.beername;
    const params = new HttpParams().set(this.selectedFilterType, this.beername);
    this.subscription = this.beerservice
      .getSearchResultByNameAndDescription(params)
      .subscribe((data: any) => {
        if (data && data.length > 0) {
          this.beerservice.searchBeerSubject.next(data);
          this.beername = '';
        } else {
          this.beerservice.noDataSubject.next(true);
        }
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
