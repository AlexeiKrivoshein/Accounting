import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

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
}
