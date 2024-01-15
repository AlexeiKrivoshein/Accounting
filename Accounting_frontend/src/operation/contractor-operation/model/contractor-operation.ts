import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY_GUID } from 'src/const';
import { Account } from 'src/dictionaries/account/model/account';
import { Category } from 'src/dictionaries/category/model/category';
import { Contractor } from 'src/dictionaries/contractor/model/contractor';
import { Operation, operationDefault } from 'src/operation/model/operation';
import { OperationClass } from 'src/operation/model/operation-class';
import { OperationType } from '../../model/operation-type';

/**
 * Операция с контрагентом
 */
export class ContractorOperation extends Operation {
  /**
   * Идентификатор счета
   */
  public accountID: string = '';

  /**
   * Счет
   */
  public account: Account | null = null;

  /**
   * Идентификатор контрагента
   */
  public contractorID: string = '';

  /**
   * Контрагент
   */
  public contractor: Contractor | null = null;

  /**
   * Идентификатор категории
   */
  public categoryID: string = '';

  /**
   * Категория
   */
  public category: Category | null = null;

  /**
   * Тип операции дебет/кредит
   */
  public operationType: OperationType = OperationType.Credited;
}

export function contractorOperationDefault(): ContractorOperation {
  return {
    ...operationDefault(),
    accountID: '',
    account: null,
    contractorID: '',
    contractor: null,
    categoryID: '',
    category: null,
    operationType: OperationType.Credited,
    operationClass: OperationClass.ContractorOperation,
  };
}

export function contractorOperationFormGroup(): FormGroup {
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
    operationClass: new FormControl<OperationClass>(
      OperationClass.ContractorOperation
    ),
  });
}
