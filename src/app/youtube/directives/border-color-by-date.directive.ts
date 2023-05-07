import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appBorderColorByDate]',
})
export class BorderColorByDateDirective implements OnInit {
  @Input('appBorderColorByDate') public time!: string;

  private colors = {
    blue: '#1e88e5',
    green: '#50D568',
    yellow: '#FF9800',
    red: '#B71C1C',
  };

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    const color: string = this.getColorByDate(new Date(this.time));
    this.element.nativeElement.style.borderColor = color;
  }

  public getColorByDate(time: Date): string {
    const oneWeek = new Date(0).setDate(7);
    const oneMonth = new Date(0).setMonth(1);
    const sixMonths = new Date(0).setMonth(6);
    const timeOffset = new Date().getTime() - time.getTime();

    if (timeOffset < oneWeek) {
      return this.colors.blue;
    }
    if (timeOffset < oneMonth) {
      return this.colors.green;
    }
    if (timeOffset < sixMonths) {
      return this.colors.yellow;
    }

    return this.colors.red;
  }
}
