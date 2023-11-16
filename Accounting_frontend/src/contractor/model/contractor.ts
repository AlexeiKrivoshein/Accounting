import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/category/model/category';
import { EMPTY_GUID } from 'src/const';
import { OperationType } from 'src/movement/model/operation-type';

/**
 * Контрагент
 */
export interface Contractor {
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

  /**
   * Идентификатор категории
   */
  categoryID: string;

  /**
   * Категория
   */
  category: Category | null;

  /**
   * Основной тип операций для данного контрагента дебет/кредит
   */
  operationType: OperationType;
}

export function contractorDefault(): Contractor {
  return {
    id: EMPTY_GUID,
    name: '',
    code: '',
    categoryID: '',
    category: null,
    operationType: OperationType.Credited,
  };
}

export function contractorFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    name: new FormControl<string>('', [Validators.required]),
    categoryID: new FormControl<string>(EMPTY_GUID),
    category: new FormControl<Category | null>(null, [Validators.required]),
    operationType: new FormControl<OperationType>(OperationType.Credited, [
      Validators.required,
    ]),
    code: new FormControl<string>(''),
  });
}
