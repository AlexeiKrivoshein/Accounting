import { Injectable } from '@angular/core';
import { CashOperationService } from 'src/operation/cash-operation/services/cash-operation.service';
import { ContractorOperationService } from 'src/operation/contractor-operation/services/contractor-operation.service';
import { CorrectionOperationService } from 'src/operation/correction-operation/services/correction-operation.service';
import { TransferOperationService } from 'src/operation/transfer-operation/services/transfer-operation.service';
import { forkJoin, map, Observable, of } from 'rxjs';
import { Operation } from 'src/operation/model/operation';
import { OperationClass } from 'src/operation/model/operation-class';

@Injectable()
export class OperationsDataSource {
  constructor(
    private contractorOperationService: ContractorOperationService,
    private transferOperationService: TransferOperationService,
    private correctionOperationService: CorrectionOperationService,
    private cashOperationService: CashOperationService
  ) {}

  public load() {
    const contractorOperations$ = this.contractorOperationService.get();
    const transferOperations$ = this.transferOperationService.get();
    const correctionOperations$ = this.correctionOperationService.get();
    const cashOperations$ = this.cashOperationService.get();

    return forkJoin([
      contractorOperations$,
      transferOperations$,
      correctionOperations$,
      cashOperations$,
    ]).pipe(
      map((data) => {
        const operations: Operation[] = [];

        data[0].forEach((item) => operations.push(item));
        data[1].forEach((item) => operations.push(item));
        data[2].forEach((item) => operations.push(item));
        data[3].forEach((item) => operations.push(item));

        return operations.sort(this.compareMovement);
      })
    );
  }

  public remove(operation: Operation): Observable<Operation | null> {
    const id = operation.id;

    let removed$: Observable<Operation | null>;
    switch (operation.operationClass) {
      case OperationClass.ContractorOperation:
        removed$ = this.contractorOperationService.remove(id);
        break;
      case OperationClass.TransferOperation:
        removed$ = this.transferOperationService.remove(id);
        break;
      case OperationClass.CorrectionOperation:
        removed$ = this.correctionOperationService.remove(id);
        break;
      case OperationClass.CashOperation:
        removed$ = this.cashOperationService.remove(id);
        break;
    }

    return removed$;
  }

  private compareMovement(m1: Operation, m2: Operation): number {
    if (m1.date > m2.date) {
      return -1;
    } else if (m1.date === m2.date) {
      if (m1.index > m2.index) {
        return -1;
      } else if (m1.index === m2.index) {
        return 0;
      } else {
        return 0;
      }
    } else {
      return 1;
    }
  }
}
