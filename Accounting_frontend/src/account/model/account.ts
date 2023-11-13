import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY_GUID } from 'src/const';

/**
 * Счет
 */
export interface Account {
  /**
   * Идентификатор
   */
  id: string;

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
  };
}

export function accountFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    name: new FormControl<string>('', [Validators.required]),
    code: new FormControl<string>(''),
  });
}
