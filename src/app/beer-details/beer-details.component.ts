import { Component, Input } from '@angular/core';
import { Beer } from '../models/beer.model';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css'],
})
export class BeerDeatilsComponent {
  constructor() {}
  @Input() beer: Beer;
}
