import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY_GUID } from 'src/const';
import { Category } from 'src/dictionaries/category/model/category';
import * as uuid from 'uuid';

/**
 * Планируемые траты
 */
export interface PlanSpending {
  /**
   * Идентификатор
   */
  id: string;

  /**
   * Идентификатор категории
   */
  categoryID: string;

  /**
   * Категория
   */
  category: Category | null;

  /**
   * Сумма
   */
  sum: number;

  /**
   * Описание
   */
  description: string;

  /**
   * Идентификатор плана
   */
  planID: string;
}

export function planSpendingDefault(): PlanSpending {
  return {
    id: uuid.v4(),
    categoryID: '',
    category: null,
    sum: 0,
    description: '',
    planID: EMPTY_GUID,
  };
}

export function planSpendingFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    categoryID: new FormControl<string>(''),
    category: new FormControl<Category | null>(null, [Validators.required]),
    sum: new FormControl<number>(0),
    description: new FormControl<string>(''),
    planID: new FormControl<string>(''),
  });
}
