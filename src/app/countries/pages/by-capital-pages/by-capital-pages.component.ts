import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-pages',
  templateUrl: './by-capital-pages.component.html',
  styles: [
  ]
})
export class ByCapitalPagesComponent {

  public countries: Country[] = [];

  constructor( private countriesServices: CountriesService ) {};

  public searchByCapital( term: string ):void {
    this.countriesServices.searchCapital( term )
      .subscribe( countries => {
        this.countries = countries;
      });
  }

}
