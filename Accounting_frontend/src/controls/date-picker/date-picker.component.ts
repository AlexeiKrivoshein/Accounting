import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {
  @Input()
  public placeholder: string = '';

  @Input()
  public control: FormControl<Date | null> = new FormControl<Date>(new Date());

  @Input()
  public width: string = 'auto';

  @Input()
  public height: string = 'auto';
}
