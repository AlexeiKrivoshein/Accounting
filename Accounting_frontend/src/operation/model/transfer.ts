import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/account/model/account';
import { EMPTY_GUID } from 'src/const';
import { Movement, movementDefault } from './movement';
import { MovementType } from './movement-type';

/**
 * Операция перевода между счетами
 */
export interface Transfer extends Movement {
  /**
   * Идентификатор счета кредита
   */
  creditAccountID: string;

  /**
   * Счет кредит
   */
  creditAccount: Account | null;

  /**
   * Идентификатор счета дебета
   */
  debitAccountID: string;

  /**
   * Счет дебета
   */
  debitAccount: Account | null;
}

export function transferDefault(): Transfer {
  return {
    ...movementDefault(),
    creditAccountID: '',
    creditAccount: null,
    debitAccountID: '',
    debitAccount: null,
  };
}

export function transferFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    date: new FormControl<Date>(new Date()),
    sum: new FormControl<number>(0, [Validators.required]),
    description: new FormControl<string>(''),
    index: new FormControl<number>(-1),

    creditAccountID: new FormControl<string>(EMPTY_GUID),
    creditAccount: new FormControl<Account | null>(null, [Validators.required]),
    debitAccountID: new FormControl<string>(EMPTY_GUID),
    debitAccount: new FormControl<Account | null>(null, [Validators.required]),
  });
}