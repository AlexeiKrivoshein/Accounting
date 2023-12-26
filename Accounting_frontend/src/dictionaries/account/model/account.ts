import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY_GUID } from 'src/const';
import { MIN_DATE } from 'src/const/min-date';
import { DictionaryElementBase } from 'src/dictionaries/model/dictionary-element-base';

/**
 * Счет
 */
export interface Account extends DictionaryElementBase {
  /**
   * Наименование
   */
  name: string;

  /**
   * Код
   */
  code: string;
}

export function accountDefault(): Account {
  return {
    id: EMPTY_GUID,
    name: '',
    code: '',
    removed: false,
    removedDate: MIN_DATE,
  };
}

export function accountFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    name: new FormControl<string>('', [Validators.required]),
    code: new FormControl<string>(''),
    removed: new FormControl<boolean>(false),
    removedDate: new FormControl<Date>(MIN_DATE),
  });
}
