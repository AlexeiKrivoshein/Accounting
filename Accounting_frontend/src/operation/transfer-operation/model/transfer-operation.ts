import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY_GUID } from 'src/const';
import { Account } from 'src/dictionaries/account/model/account';
import { Operation, operationDefault } from 'src/operation/model/operation';

/**
 * Операция перевода между счетами
 */
export interface TransferOperation extends Operation {
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

export function transferDefault(): TransferOperation {
  return {
    ...operationDefault(),
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