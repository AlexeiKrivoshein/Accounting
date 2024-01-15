import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { OperationClass } from 'src/operation/model/operation-class';
import { OperationDataManager } from 'src/operation/operation-editor-dialog/model/operation-data-manager';
import {
  ContractorOperation,
  contractorOperationFormGroup,
} from '../model/contractor-operation';
import { ContractorOperationService } from '../services/contractor-operation.service';

@Injectable()
export class ContractorOperationDataManager
  implements OperationDataManager<ContractorOperation>
{
  public set operation(value: ContractorOperation) {
    this.formGroup.setValue(value);
  }

  public get operation(): ContractorOperation {
    return this.formGroup.value as ContractorOperation;
  }

  public formGroup: FormGroup = contractorOperationFormGroup();

  constructor(
    private _contractorOperationService: ContractorOperationService
  ) {}

  public save(): Observable<ContractorOperation> {
    return this._contractorOperationService.set(this.operation).pipe(
      map((operation) => {
        this.operation = {
          ...operation,
          operationClass: OperationClass.ContractorOperation,
        };

        return this.operation;
      })
    );
  }
}
