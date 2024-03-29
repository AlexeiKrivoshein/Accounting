import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputType } from './model/input-type';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input()
  public placeholder: string = '';

  @Input()
  public control: FormControl<string | null> = new FormControl<string>("");

  @Input()
  public width: string = 'auto';

  @Input()
  public height: string = 'auto';

  @Input()
  public type: InputType = 'text';
}
