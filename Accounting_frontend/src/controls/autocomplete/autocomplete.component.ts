import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  public displayFn: (data: any) => string = (data: any) => data;

  @Output()
  public optionSelected: EventEmitter<any> = new EventEmitter<any>();

  public onOptionSelected(event: any) {
    this.optionSelected.emit(event);
  }
}
