import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/account/model/account';
import { EMPTY_GUID } from 'src/const';
import * as uuid from 'uuid';

/**
 * Планируемые накопления
 */
export interface PlanSaving {
  /**
   * Идентификатор
   */
  id: string;

  /**
   * Идентификатор счета
   */
  accountID: string;

  /**
   * Счет
   */
  account: Account | null;

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

export function planSavingDefault(): PlanSaving {
  return {
    id: uuid.v4(),
    accountID: '',
    account: null,
    sum: 0,
    description: '',
    planID: EMPTY_GUID,
  };
}

export function planSavingFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    accountID: new FormControl<string>(''),
    account: new FormControl<Account | null>(null, [Validators.required]),
    sum: new FormControl<number>(0),
    description: new FormControl<string>(''),
    planID: new FormControl<string>(''),
  });
}
