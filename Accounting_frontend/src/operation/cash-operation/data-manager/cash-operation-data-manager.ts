import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { OperationClass } from 'src/operation/model/operation-class';
import { OperationDataManager } from 'src/operation/operation-editor-dialog/model/operation-data-manager';
import { CashOperation, cashOperationFormGroup } from '../model/cash-operation';
import { CashOperationService } from '../services/cash-operation.service';

@Injectable()
export class CashOperationDataManager
  implements OperationDataManager<CashOperation>
{
  public set operation(value: CashOperation) {
    this.formGroup.setValue(value);
  }

  public get operation(): CashOperation {
    return this.formGroup.value as CashOperation;
  }

  public formGroup: FormGroup = cashOperationFormGroup();

  constructor(
    private _cashOperationService: CashOperationService
  ) {}

  public save(): Observable<CashOperation> {
    return this._cashOperationService.set(this.operation).pipe(
      map((operation) => {
        this.operation = {
          ...operation,
          operationClass: OperationClass.CashOperation,
        };

        return this.operation;
      })
    );
  }
}
