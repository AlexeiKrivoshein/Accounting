import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CashOperationDataManager } from 'src/operation/cash-operation/data-manager/cash-operation-data-manager';
import { ContractorOperationDataManager } from 'src/operation/contractor-operation/data-manager/contractor-operation-data-manager';
import { CorrectionOperationDataManager } from 'src/operation/correction-operation/data-manager/correction-operation-data-manager';
import { OperationClass } from 'src/operation/model/operation-class';
import { TransferOperationDataManager } from 'src/operation/transfer-operation/data-manager/transfer-operation-data-manager';
import { Operation } from '../../model/operation';
import { OperationDataManager } from '../model/operation-data-manager';

@Injectable()
export class OperationService {
  private resolveDataManager(
    operationClass: OperationClass
  ): OperationDataManager<Operation> | null {
    switch (operationClass) {
      case OperationClass.ContractorOperation: {
        return this.contractorOperationDM;
      }
      case OperationClass.TransferOperation: {
        return this.transferOperationDM;
      }
      case OperationClass.CorrectionOperation: {
        return this.correctionOperationDM;
      }
      case OperationClass.CashOperation: {
        return this.cashOperationDM;
      }
      default: {
        return null;
      }
    }
  }

  public set operation(operation: Operation) {
    const dataManager = this.resolveDataManager(operation.operationClass);
    if (dataManager) {
      dataManager.operation = operation;
    }
  }

  constructor(
    public contractorOperationDM: ContractorOperationDataManager,
    public transferOperationDM: TransferOperationDataManager,
    public correctionOperationDM: CorrectionOperationDataManager,
    public cashOperationDM: CashOperationDataManager
  ) {}

  public save(operationClass: OperationClass): Observable<Operation | null> {
    const dataManager = this.resolveDataManager(operationClass);

    if (dataManager) {
      return dataManager.save();
    } else {
      return of(null);
    }
  }
}
