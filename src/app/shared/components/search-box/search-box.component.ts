import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit {

  // private debouncer = new Subject<string>();
  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = ''

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(300) // Espera 1 segundo y si sigue escribiendo no emite nada y resetea a 1 segundo, es una barrera para el subscribe, lo frena
    )
    .subscribe( value => {
      // console.log('debouncer value', value);
      this.onDebounce.emit( value );
    })
  }

  emitValue( value: string ):void {
    this.onValue.emit( value );

  }

  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm );
  }
}
