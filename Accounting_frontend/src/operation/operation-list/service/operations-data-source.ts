import { Injectable } from '@angular/core';
import { CashOperationService } from 'src/operation/cash-operation/services/cash-operation.service';
import { ContractorOperationService } from 'src/operation/contractor-operation/services/contractor-operation.service';
import { CorrectionOperationService } from 'src/operation/correction-operation/services/correction-operation.service';
import { TransferOperationService } from 'src/operation/transfer-operation/services/transfer-operation.service';
import { forkJoin, map, Observable, of } from 'rxjs';
import { Operation } from 'src/operation/model/operation';
import { OperationClass } from 'src/operation/model/operation-class';
import { FilterItemValue } from 'src/operation/filter-panel/model/filter-item-value';
import {
  FILTER_PREFIX,
  OPERATION_CLASS_FILTER,
} from 'src/operation/filter-panel/const';
import { filterToParams } from 'src/operation/filter-panel/func/filter-to-param';

@Injectable()
export class OperationsDataSource {
  constructor(
    private contractorOperationService: ContractorOperationService,
    private transferOperationService: TransferOperationService,
    private correctionOperationService: CorrectionOperationService,
    private cashOperationService: CashOperationService
  ) {}

  public load(filterItems: FilterItemValue[] = []) {
    const index = filterItems.findIndex(
      (f) => f.path === `${FILTER_PREFIX}${OPERATION_CLASS_FILTER}`
    );
    if (index >= 0) {
      const operationClass = +filterItems[index].value;
      filterItems.splice(index, 1);
      let load$: Observable<Operation[]>;

      const filter = filterToParams(filterItems);

      switch (operationClass) {
        case OperationClass.ContractorOperation:
          load$ = this.contractorOperationService.get('', filter);
          break;
        case OperationClass.TransferOperation:
          load$ = this.transferOperationService.get('', filter);
          break;
        case OperationClass.CorrectionOperation:
          load$ = this.correctionOperationService.get('', filter);
          break;
        case OperationClass.CashOperation:
          load$ = this.cashOperationService.get('', filter);
          break;
        default:
          return of([]);
      }

      return load$.pipe(
        map((operations) => operations.sort(this.compareMovement))
      );
    } else {
      const filter = filterToParams(filterItems);

      const contractorOperations$ = this.contractorOperationService.get(
        '',
        filter
      );
      const transferOperations$ = this.transferOperationService.get('', filter);
      const correctionOperations$ = this.correctionOperationService.get(
        '',
        filter
      );
      const cashOperations$ = this.cashOperationService.get('', filter);

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
}
