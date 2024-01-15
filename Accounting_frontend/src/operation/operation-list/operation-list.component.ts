import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Balance } from 'src/balance/model/balance';
import { BalanceService } from 'src/balance/services/balance.service';
import { Column } from 'src/controls/table/model/column';
import { NotifyService } from 'src/notify/service/notify-service';
import { Observable } from 'rxjs';
import {
  ContractorOperation,
  contractorOperationDefault,
} from 'src/operation/contractor-operation/model/contractor-operation';
import { OperationType } from 'src/operation/model/operation-type';
import { CorrectionOperation } from 'src/operation/correction-operation/model/correction-operation';
import { TransferOperation } from 'src/operation/transfer-operation/model/transfer-operation';
import { Operation } from '../model/operation';
import { OperationEditorDialogComponent } from '../operation-editor-dialog/operation-editor-dialog.component';
import { CashOperation } from '../cash-operation/model/cash-operation';
import { OperationsDataSource } from './service/operations-data-source';

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.scss'],
  providers: [OperationsDataSource],
})
export class OperationListComponent implements OnInit {
  public selected: Operation | null = null;

  public columns: Column[] = [
    {
      path: 'date',
      header: 'Дата',
      type: 'Date',
    },
    {
      path: 'account.name',
      header: 'Расход',
      displayFn: (operation: Operation) => {
        if (operation instanceof ContractorOperation) {
          if (operation.operationType == OperationType.Debited) {
            return operation.contractor?.name ?? '';
          } else {
            return operation.account?.name ?? '';
          }
        } else if (operation instanceof CorrectionOperation) {
          if (operation.operationType == OperationType.Debited) {
            return '';
          } else {
            return operation.account?.name ?? '';
          }
        } else if (operation instanceof TransferOperation) {
          return operation.creditAccount?.name ?? '';
        } else if (operation instanceof CashOperation) {
          if (operation.operationType == OperationType.Debited) {
            return '';
          } else {
            return operation.account?.name ?? '';
          }
        }

        return '';
      },
    },
    {
      path: 'contractor.name',
      header: 'Приход',
      displayFn: (operation: Operation) => {
        if (operation instanceof ContractorOperation) {
          if (operation.operationType == OperationType.Debited) {
            return operation.account?.name ?? '';
          } else {
            return operation.contractor?.name ?? '';
          }
        } else if (operation instanceof CorrectionOperation) {
          if (operation.operationType == OperationType.Debited) {
            return operation.account?.name ?? '';
          } else {
            return '';
          }
        } else if (operation instanceof TransferOperation) {
          return operation.debitAccount?.name ?? '';
        } else if (operation instanceof CashOperation) {
          if (operation.operationType == OperationType.Debited) {
            return operation.account?.name ?? '';
          } else {
            return '';
          }
        }
        return '';
      },
    },
    {
      path: 'description',
      header: 'Описание',
    },
    {
      path: 'sum',
      header: 'Сумма операции',
      type: 'Currency',
    },
  ];

  public dataSource: MatTableDataSource<Operation> =
    new MatTableDataSource<Operation>([]);

  public balances: { account: string; sum: number }[] = [];

  constructor(
    private operationsDataSource: OperationsDataSource,
    private balanceService: BalanceService,
    private dialog: MatDialog,
    private notifyService: NotifyService
  ) {}

  public ngOnInit(): void {
    this.load().subscribe((items) => (this.dataSource.data = items));
  }

  private load(): Observable<Operation[]> {
    return this.operationsDataSource.load();
  }

  public onCreate() {
    this.dialog
      .open(OperationEditorDialogComponent, {
        width: '40em',
        height: 'auto',
        autoFocus: 'dialog',
        data: contractorOperationDefault(),
      })
      .afterClosed()
      .pipe(
        filter((result) => result),
        switchMap(() => this.load()),
        tap((data) => (this.dataSource.data = data))
      )
      .subscribe();
  }

  public onModify() {
    if (!this.selected) {
      return;
    }

    this.dialog
      .open(OperationEditorDialogComponent, {
        width: '40em',
        height: 'auto',
        autoFocus: 'dialog',
        data: this.selected,
      })
      .afterClosed()
      .pipe(
        filter((result) => result),
        switchMap(() => this.load()),
        tap((data) => (this.dataSource.data = data))
      )
      .subscribe();
  }

  public onDelete() {
    if (!this.selected) {
      return;
    }

    const removed$ = this.operationsDataSource.remove(this.selected);

    removed$.pipe(switchMap(() => this.load())).subscribe({
      next: (data) => {
        this.selected = null;
        this.dataSource.data = data;
        this.notifyService.notify('Запись удалена.', 'success');
      },
      error: (err) => {
        console.log(err);
        this.notifyService.notify('Не удалось удалить запись.', 'error');
      },
    });
  }

  public onSelectedChange(event: Operation) {
    if (event) {
      this.balanceService.get(event.id).subscribe((data: Balance[]) => {
        this.balances = data
          .filter((balance) => balance.sum > 0)
          .map((balance) => ({
            account: balance.account?.name ?? '',
            sum: balance.sum,
          }));
      });
    }
  }
}
