import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EMPTY_GUID } from "src/const";

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
}

export function accountDefault(): Account {
  return {
    id: EMPTY_GUID,
    name: ''
  }
}

export function accountFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    name: new FormControl<string>('', [Validators.required])
  })
}