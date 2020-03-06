import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appKeyDetect]'
})
export class KeyDetectDirective {
  @Output() close : EventEmitter<any> = new EventEmitter<any> ();
  @Output() goNext : EventEmitter<any> = new EventEmitter<any> ();
  @Output() goPrevious : EventEmitter<any> = new EventEmitter<any> ();

  @HostListener("document:keydown", ['$event'])
  onKeyDown(keyEvent){
        if(keyEvent.key === 'Escape') this.close.emit();
        if(keyEvent.key === 'ArrowRight') this.goNext.emit();
        if(keyEvent.key === 'ArrowLeft') this.goPrevious.emit();
  }
  constructor() {
  }
}
