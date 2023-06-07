import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  // private debouncer = new Subject<string>();
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = ''

  @Input()
  public initialValue: string = ''

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
      this.onDebounce.emit( value );
    })
  }

  ngOnDestroy(): void {
    // console.log("destruido");
    // this.debouncer.unsubscribe();
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue( value: string ):void {
    this.onValue.emit( value );

  }

  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm );
  }
}
