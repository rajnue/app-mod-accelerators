import {Directive, ElementRef,  HostListener, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
    selector: '[defualtCustomBgColor]'
})
export class ButtonColorDirective implements OnInit {

    @Input() defualtCustomBgColor: string;

    constructor(private elementRef: ElementRef, private renderer: Renderer2){ }

    ngOnInit() {
        if (this.defualtCustomBgColor) {
          this.setCustomBottonColor(this.defualtCustomBgColor);
        } else {
          this.setCustomBottonColor('white');
        }
    }

    setCustomBottonColor(color: string) {
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          'backgroundColor',
          color
        );
      }

      @HostListener('mouseenter') onMouseEnter(){
        this.setCustomBottonColor('yellow');
      }

      @HostListener('mouseleave') onMouseLeave(){
        this.setCustomBottonColor('black');
      }

}
