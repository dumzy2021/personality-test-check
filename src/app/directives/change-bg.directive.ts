import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBg]',
})
export class ChangeBgDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @HostListener('click') answerClick() {
    this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid black');
    this.renderer.setStyle(this.el.nativeElement, 'background', 'black');
    this.renderer.setStyle(this.el.nativeElement, 'color', '#fff');
  }
}
