import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { map, Observable } from "rxjs";
import { OperationClass } from "src/operation/model/operation-class";
import { OperationDataManager } from "src/operation/operation-editor-dialog/model/operation-data-manager";
import { TransferOperation, transferOperationFormGroup } from "../model/transfer-operation";
import { TransferOperationService } from "../services/transfer-operation.service";

@Injectable()
export class TransferOperationDataManager
  implements OperationDataManager<TransferOperation>
{
  public set operation(value: TransferOperation) {
    this.formGroup.setValue(value);
  }

  public get operation(): TransferOperation {
    return this.formGroup.value as TransferOperation;
  }

  public formGroup: FormGroup = transferOperationFormGroup();

  constructor(
    private _transferOperationService: TransferOperationService
  ) {}

  public save(): Observable<TransferOperation> {
    return this._transferOperationService.set(this.operation).pipe(
      map((operation) => {
        this.operation = {
          ...operation,
          operationClass: OperationClass.TransferOperation,
        };

        return this.operation;
      })
    );
  }
}