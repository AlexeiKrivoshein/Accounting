import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownButtonItem } from './model/dropdown-button-item';

@Component({
  selector: 'app-dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss'],
})
export class DropdownButtonComponent {
  @Input()
  public text: string = '';

  @Input()
  public height: string | number = '3rem';

  @Input()
  public width: string | number = '9rem';

  @Input()
  public enabled: boolean = true;

  @Input()
  public icon: string = '';

  @Input()
  public items: DropdownButtonItem[] = [];
}
