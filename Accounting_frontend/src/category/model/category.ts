import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EMPTY_GUID } from "src/const";

/**
 * Категория
 */
export interface Category {
  /**
   * Идентификатор
   */
  id: string;
  
  /**
   * Наименование
   */
  name: string;
}

export function categoryDefault(): Category {
  return {
    id: EMPTY_GUID,
    name: ''
  }
}

export function categoryFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    name: new FormControl<string>('', [Validators.required])
  })
}