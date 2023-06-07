import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  public cacheStore: CacheStore = {
    byCapital:   { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion:    { region: '' , countries: [] },
  }


  constructor(private http: HttpClient) { }

  private getCountriesRequest( url: string): Observable<Country[]> {
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]) ),
        // delay( 2000 ),
      )
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    const url = `${ this.apiUrl }/alpha/${ code }`;
    // https://restcountries.com/v3.1/alpha/{code}

    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError( eror => of(null) )
      );

  }

  searchCapital( term: string ): Observable<Country[]>  {
    const url = `${ this.apiUrl }/capital/${ term }`;
    // https://restcountries.com/v3.1/capital/{capital}

    return this.getCountriesRequest(url)
      .pipe(
        // tap( countries => this.cacheStore.byCapital = { term: term, countries: countries } )
        tap( countries => this.cacheStore.byCapital = { term, countries } )
      )
  }

  searchCountry( term: string ): Observable<Country[]>  {
    const url = `${ this.apiUrl }/name/${ term }`;
    // https://restcountries.com/v3.1/name/{name}?fullText=true

    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCountries = { term, countries } )
      )
  }

  searchRegion( region: Region ): Observable<Country[]>  {
    const url = `${ this.apiUrl }/region/${ region }`;
    // https://restcountries.com/v3.1/region/{region}

    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byRegion = { region, countries } )
      )
  }
}
