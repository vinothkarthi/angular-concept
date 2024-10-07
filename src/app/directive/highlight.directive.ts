import { Directive, ElementRef, HostBinding, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[highLight]',
    standalone: true
})

export class HighLight {
  @Input('highLight') highLightColor:string | undefined;
  constructor(public eleRef: ElementRef){}
  @HostListener('mouseover') mouseEnter() {
this.eleRef.nativeElement.style.color = this.highLightColor
  }
  @HostListener('mouseleave') mouseLeave() {
    this.eleRef.nativeElement.style.color = 'black'
      }
}
