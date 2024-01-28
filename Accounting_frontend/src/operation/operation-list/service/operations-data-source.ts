import { Injectable } from '@angular/core';
import { CashOperationService } from 'src/operation/cash-operation/services/cash-operation.service';
import { ContractorOperationService } from 'src/operation/contractor-operation/services/contractor-operation.service';
import { CorrectionOperationService } from 'src/operation/correction-operation/services/correction-operation.service';
import { TransferOperationService } from 'src/operation/transfer-operation/services/transfer-operation.service';
import { forkJoin, map, Observable, of } from 'rxjs';
import { Operation } from 'src/operation/model/operation';
import { OperationClass } from 'src/operation/model/operation-class';
import { ContractorOperation } from 'src/operation/contractor-operation/model/contractor-operation';
import { TransferOperation } from 'src/operation/transfer-operation/model/transfer-operation';
import { OperationView } from '../model/operation-view';
import { OperationType } from 'src/operation/model/operation-type';
import { CorrectionOperation } from 'src/operation/correction-operation/model/correction-operation';
import { CashOperation } from 'src/operation/cash-operation/model/cash-operation';

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
      }),
      map((data) => data.map((item) => this.castToView(item)))
    );
  }

  public get(
    id: string,
    operationClass: OperationClass
  ): Observable<Operation | null> {
    switch (operationClass) {
      case OperationClass.ContractorOperation: {
        return this.contractorOperationService
          .get(id)
          .pipe(
            map((operations) => (operations?.length ? operations[0] : null))
          );
      }
      case OperationClass.TransferOperation: {
        return this.transferOperationService
          .get(id)
          .pipe(
            map((operations) => (operations?.length ? operations[0] : null))
          );
      }
      case OperationClass.CorrectionOperation: {
        return this.correctionOperationService
          .get(id)
          .pipe(
            map((operations) => (operations?.length ? operations[0] : null))
          );
      }
      case OperationClass.CashOperation: {
        return this.cashOperationService
          .get(id)
          .pipe(
            map((operations) => (operations?.length ? operations[0] : null))
          );
      }
      default:
        return of(null);
    }
  }

  public remove(
    id: string,
    operationClass: OperationClass
  ): Observable<Operation | null> {
    let removed$: Observable<Operation | null>;
    switch (operationClass) {
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

  private castToView(operation: Operation): OperationView {
    let from = '';
    let to = '';

    switch (operation.operationClass) {
      case OperationClass.ContractorOperation:
        const contractorOperation = operation as ContractorOperation;

        if (contractorOperation.operationType === OperationType.Credited) {
          from = contractorOperation.account?.name ?? '';
          to = contractorOperation.contractor?.name ?? '';
        } else {
          from = contractorOperation.contractor?.name ?? '';
          to = contractorOperation.account?.name ?? '';
        }

        return {
          id: contractorOperation.id,
          icon: 'shopping_cart',
          from,
          to,
          description: contractorOperation.category?.name ?? '',
          sum: contractorOperation.sum,
          operationClass: OperationClass.ContractorOperation,
        };
      case OperationClass.TransferOperation:
        const transferOperation = operation as TransferOperation;
        from = transferOperation.creditAccount?.name ?? '';
        to = transferOperation.debitAccount?.name ?? '';

        return {
          id: transferOperation.id,
          icon: 'swap_horiz',
          from,
          to,
          description: '',
          sum: transferOperation.sum,
          operationClass: OperationClass.TransferOperation,
        };
      case OperationClass.CorrectionOperation:
        const correctionOperation = operation as CorrectionOperation;
        from = correctionOperation.account?.name ?? '';
        to = '';

        return {
          id: correctionOperation.id,
          icon: 'exposure',
          from,
          to,
          description:
            correctionOperation.operationType === OperationType.Credited
              ? 'Расход'
              : 'Приход',
          sum: correctionOperation.sum,
          operationClass: OperationClass.CorrectionOperation,
        };
      case OperationClass.CashOperation:
        const cashOperation = operation as CashOperation;
        from = cashOperation.account?.name ?? '';
        to = '';

        return {
          id: cashOperation.id,
          icon: 'payments',
          from,
          to,
          description:
            cashOperation.operationType === OperationType.Credited
              ? 'Снятие'
              : 'Внесение',
          sum: cashOperation.sum,
          operationClass: OperationClass.CashOperation,
        };
    }
  }
}
