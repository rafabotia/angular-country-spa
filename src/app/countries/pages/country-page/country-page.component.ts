import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  constructor(
    private activedRoute: ActivatedRoute,
    private countriesService: CountriesService
  ) { }

  ngOnInit(): void {
    this.activedRoute.params
      .subscribe( ({ id }) => {

        console.log({ params: id })
        // console.log({ params: params['id'] })

        this.countriesService.searchCountryByAlphaCode( id )
          .subscribe( country => {
            console.log({ country})
          });

      })
  }


}
