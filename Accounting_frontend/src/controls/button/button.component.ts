import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input()
  public text: string = '';

  @Input()
  public height: string | number = '3rem';

  @Input()
  public width: string | number = '9rem';

  @Input()
  public enabled: boolean = true;

  @Output()
  public buttonClick: EventEmitter<void> = new EventEmitter<void>();
}
