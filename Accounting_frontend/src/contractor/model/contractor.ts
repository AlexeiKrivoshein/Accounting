import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Category } from "src/category/model/category";
import { EMPTY_GUID } from "src/const";

/**
 * Контрагент
 */
export interface Contractor
{
  /**
   * Идентификатор
   */
  id: string;

  /**
   * Наименование
   */
  name: string;

  /**
   * Идентификатор категории
   */
  categoryID: string;

  /**
   * Категория 
   */
  category: Category | null;
}

export function contractorDefault(): Contractor {
  return {
    id: EMPTY_GUID,
    name: '',
    categoryID: '',
    category: null
  }
}

export function contractorFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    name: new FormControl<string>('', [Validators.required]),
    categoryID: new FormControl<string>(EMPTY_GUID),
    category: new FormControl<Category | null>(null, [Validators.required])
  })
}