import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextAreaComponent {
  @Input()
  public placeholder: string = '';

  @Input()
  public control: FormControl<string | null> = new FormControl<string>('');

  @Input()
  public width: string = '100%';

  @Input()
  public height: string = '100%';
}
