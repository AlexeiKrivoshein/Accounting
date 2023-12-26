import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY_GUID } from 'src/const';
import { Account } from 'src/dictionaries/account/model/account';
import { Category } from 'src/dictionaries/category/model/category';
import { Contractor } from 'src/dictionaries/contractor/model/contractor';
import { Operation, operationDefault } from 'src/operation/model/operation';
import { OperationType } from '../../model/operation-type';

/**
 * Операция с контрагентом
 */
export interface ContractorOperation extends Operation {
  /**
   * Идентификатор счета
   */
  accountID: string;

  /**
   * Счет
   */
  account: Account | null;

  /**
   * Идентификатор контрагента
   */
  contractorID: string;

  /**
   * Контрагент
   */
  contractor: Contractor | null;

  /**
   * Идентификатор категории
   */
  categoryID: string;

  /**
   * Категория
   */
  category: Category | null;

  /**
   * Тип операции дебет/кредит
   */
  operationType: OperationType;
}

export function operationDefault(): ContractorOperation {
  return {
    ...operationDefault(),
    accountID: '',
    account: null,
    contractorID: '',
    contractor: null,
    categoryID: '',
    category: null,
    operationType: OperationType.Credited,
  };
}

export function operationFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    date: new FormControl<Date>(new Date()),
    sum: new FormControl<number>(0, [Validators.required]),
    description: new FormControl<string>(''),
    index: new FormControl<number>(-1),

    accountID: new FormControl<string>(EMPTY_GUID),
    account: new FormControl<Account | null>(null, [Validators.required]),
    contractorID: new FormControl<string>(EMPTY_GUID),
    contractor: new FormControl<Contractor | null>(null, [Validators.required]),
    categoryID: new FormControl<string>(EMPTY_GUID),
    category: new FormControl<Category | null>(null, [Validators.required]),
    operationType: new FormControl<OperationType>(OperationType.Credited),
  });
}
