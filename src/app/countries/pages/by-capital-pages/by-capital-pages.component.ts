import { Component } from '@angular/core';

@Component({
  selector: 'app-by-capital-pages',
  templateUrl: './by-capital-pages.component.html',
  styles: [
  ]
})
export class ByCapitalPagesComponent {

  public searchByCapital( term: string ):void {
    console.log('Desde ByCapitalPage');
    console.log({ term });
  }

}
