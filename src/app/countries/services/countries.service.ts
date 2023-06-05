import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient) { }

  searchCapital( term: string ): Observable<Country[]>  {
    const url = `${ this.apiUrl }/capital/${ term }`;

    return this.http.get<Country[]>( url )
    .pipe(
      catchError( eror => of([]) )
    );

    // return this.http.get<Country[]>( url )
    //   .pipe(
    //     catchError( error => {
    //       console.log(error);

    //       return of([])
    //     })
    //   );

    // return this.http.get<Country[]>( url )
    //   .pipe(
    //     catchError( error => of([]) )
    //   );

    // return this.http.get<Country[]>( url )
    //   .pipe(
    //     tap( countries => console.log('TAP 1 - Paso por el tap', countries) ),
    //     map( countries => []),
    //     tap( countries => console.log('TAP 2 - Paso por el tap', countries) ),
    //   )
  }

}
