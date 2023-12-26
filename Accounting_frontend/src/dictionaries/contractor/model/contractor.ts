import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY_GUID } from 'src/const';
import { MIN_DATE } from 'src/const/min-date';
import { Category } from 'src/dictionaries/category/model/category';
import { DictionaryElementBase } from 'src/dictionaries/model/dictionary-element-base';
import { OperationType } from 'src/operation/model/operation-type';

/**
 * Контрагент
 */
export interface Contractor extends DictionaryElementBase {
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
    removed: false,
    removedDate: MIN_DATE,
  };
}

export function contractorFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    name: new FormControl<string>('', [Validators.required]),
    code: new FormControl<string>(''),
    categoryID: new FormControl<string>(EMPTY_GUID),
    category: new FormControl<Category | null>(null, [Validators.required]),
    operationType: new FormControl<OperationType>(OperationType.Credited, [
      Validators.required,
    ]),
    removed: new FormControl<boolean>(false),
    removedDate: new FormControl<Date>(MIN_DATE),
  });
}
