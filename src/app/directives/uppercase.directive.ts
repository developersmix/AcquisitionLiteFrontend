import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective {

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  value: any;

  @HostListener('input', ['$event']) onInputChange($event: { target: { value: string; }; }) {
    this.value = $event.target.value.toUpperCase();
    this.ngModelChange.emit(this.value);
  }

}