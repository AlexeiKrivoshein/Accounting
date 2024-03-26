import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { OperationClass } from 'src/operation/model/operation-class';
import { OperationDataManager } from 'src/operation/operation-editor-dialog/data-manager/operation-data-manager';
import {
  CorrectionOperation,
  correctionOperationFormGroup,
} from '../model/correction-operation';
import { CorrectionOperationService } from '../services/correction-operation.service';

@Injectable()
export class CorrectionOperationDataManager
  implements OperationDataManager<CorrectionOperation>
{
  public set operation(value: CorrectionOperation) {
    this.formGroup.setValue(value);
  }

  public get operation(): CorrectionOperation {
    return this.formGroup.value as CorrectionOperation;
  }

  public formGroup: FormGroup = correctionOperationFormGroup();

  constructor(
    private _correctionOperationService: CorrectionOperationService
  ) {}

  public save(): Observable<CorrectionOperation> {
    return this._correctionOperationService.set(this.operation).pipe(
      map((operation) => {
        this.operation = {
          ...operation,
          operationClass: OperationClass.CorrectionOperation,
        };

        return this.operation;
      })
    );
  }
}
