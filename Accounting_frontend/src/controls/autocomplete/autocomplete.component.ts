import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: 'autocomplete.component.html',
  styleUrls: ['autocomplete.component.scss'],
})
export class AutocompliteComponent {
  @Input()
  public placeholder: string = '';

  @Input()
  public control: FormControl<any> = new FormControl<any>('');

  @Input()
  public width: string = 'auto';

  @Input()
  public height: string = 'auto';

  @Input()
  public items: any[] = [];

  @Input()
  public display: string = '';

  public displayFuncBind = this.displayFunc.bind(this);

  public displayFunc(value: any): string {
    if (!value) {
      return '';
    }

    const display = this.display
    return (display && display.length) ? value[this.display] : value;
  }
}
