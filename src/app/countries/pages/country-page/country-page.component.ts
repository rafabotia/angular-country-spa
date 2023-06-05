import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService,
  ) { }

  ngOnInit(): void {

  this.activedRoute.params
    .pipe(
      switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id ) )
    )
    .subscribe( country => {
      if ( !country ) {
        return this.router.navigateByUrl('');
      }

      console.log('TENEMOS UN PAÍS');
      console.log({ country });
      return;

    })
  }


  // this.activedRoute.params
  //   .subscribe( ({ id }) => {

  //     this.searchCountry(id);

  //   })


  // searchCountry( code: string ) {
  //   this.countriesService.searchCountryByAlphaCode( code )
  //   .subscribe( country => {
  //     console.log({ country})
  //   });
  // }

  // this.activedRoute.params
  //   .subscribe( this.searchCountry )
  // }

  // searchCountry( params: Params ) {
  //   this.countriesService.searchCountryByAlphaCode( params['id'] )
  //   .subscribe( country => {
  //     console.log({ country})
  //   });
  // }

}
