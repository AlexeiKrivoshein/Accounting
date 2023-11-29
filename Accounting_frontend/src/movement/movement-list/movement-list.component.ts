import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { map, switchMap } from 'rxjs/operators';
import { Balance } from 'src/balance/model/balance';
import { BalanceService } from 'src/balance/services/balance.service';
import { DropdownButtonItem } from 'src/controls/dropdown-button/model/dropdown-button-item';
import { Column } from 'src/controls/table/model/column';
import { NotifyService } from 'src/notify/service/notify-service';
import { Movement } from '../model/movement';
import { Transfer, transferDefault } from '../../transfer/model/transfer';
import { OperationEditorComponent } from '../../operation/operation-editor/operation-editor.component';
import { OperationService } from '../../operation/services/operation.service';
import { TransferService } from '../services/transfer.service';
import { TransferEditorComponent } from '../../transfer/transfer-editor/transfer-editor.component';
import { forkJoin, Observable } from 'rxjs';
import { MovementType } from '../model/movement-type';
import { OperationType } from '../../operation/model/operation-type';
import { Correction, correctionDefault } from '../../correction/model/correction';
import { CorrectionEditorComponent } from '../../correction/correction-editor/correction-editor.component';
import { CorrectionService } from '../../correction/services/correction.service';
import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';
import { Operation, operationDefault } from 'src/operation/model/operation';

@Component({
  selector: 'app-movement-list',
  templateUrl: './movement-list.component.html',
  styleUrls: ['./movement-list.component.scss'],
})
export class MovementListComponent implements OnInit {
  public selected: Movement | null = null;

  public columns: Column[] = [
    {
      path: 'date',
      header: 'Дата',
      type: 'Date',
    },
    {
      path: 'account.name',
      header: 'Расход',
      displayFn: (data: Movement) => {
        if (this.typer.has(data.id)) {
          const type = this.typer.get(data.id);

          if (type == MovementType.Operation) {
            const operation = data as Operation;

            if (operation.operationType == OperationType.Debited) {
              return operation.contractor?.name ?? '';
            } else {
              return operation.account?.name ?? '';
            }
          } else if (type == MovementType.Correction) {
            const correction = data as Correction;

            if (correction.operationType == OperationType.Debited) {
              return '';
            } else {
              return correction.account?.name ?? '';
            }
          } else {
            const transfer = data as Transfer;

            return transfer.creditAccount?.name ?? '';
          }
        } else {
          return '';
        }
      },
    },
    {
      path: 'contractor.name',
      header: 'Приход',
      displayFn: (data: Movement) => {
        if (this.typer.has(data.id)) {
          const type = this.typer.get(data.id);

          if (type == MovementType.Operation) {
            const operation = data as Operation;

            if (operation.operationType == OperationType.Debited) {
              return operation.account?.name ?? '';
            } else {
              return operation.contractor?.name ?? '';
            }
          } else if (type == MovementType.Correction) {
            const correction = data as Correction;

            if (correction.operationType == OperationType.Debited) {
              return correction.account?.name ?? '';
            } else {
              return '';
            }
          } else {
            const transfer = data as Transfer;

            return transfer.debitAccount?.name ?? '';
          }
        } else {
          return '';
        }
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

  public dataSource: MatTableDataSource<Movement> =
    new MatTableDataSource<Movement>([]);

  public balances: { account: string; sum: number }[] = [];

  public items: DropdownButtonItem[] = [
    {
      text: 'Операция',
      icon: 'paid',
      click: () => this.onOperationAdd(),
    },
    {
      text: 'Перевод',
      icon: 'currency_exchange',
      click: () => this.onTransferAdd(),
    },
    {
      text: 'Корректировка',
      icon: 'balance',
      click: () => this.onCorrectionAdd(),
    },
  ];

  private typer: Map<string, MovementType> = new Map<string, MovementType>();

  constructor(
    private operationService: OperationService,
    private transferService: TransferService,
    private correctionService: CorrectionService,
    private balanceService: BalanceService,
    public dialog: MatDialog,
    private notifyService: NotifyService
  ) {}

  public ngOnInit(): void {
    this.load().subscribe((items) => (this.dataSource.data = items));
  }

  private load(): Observable<Movement[]> {
    const movements$ = forkJoin([
      this.operationService.get(),
      this.transferService.get(),
      this.correctionService.get(),
    ]);

    return movements$.pipe(
      map((data) => {
        const movements: Movement[] = [];
        this.typer.clear();

        data[0].map((item) => {
          this.typer.set(item.id, MovementType.Operation);
          movements.push(item);
        });

        data[1].map((item) => {
          this.typer.set(item.id, MovementType.Transfer);
          movements.push(item);
        });

        data[2].map((item) => {
          this.typer.set(item.id, MovementType.Correction);
          movements.push(item);
        });

        return movements.sort(this.compareMovement);
      })
    );
  }

  private compareMovement(m1: Movement, m2: Movement): number {
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

  public onOperationAdd() {
    this.modifyOperation(operationDefault());
  }

  public onTransferAdd() {
    this.modifyTransfer(transferDefault());
  }

  public onCorrectionAdd() {
    this.modifyCorrection(correctionDefault());
  }

  public onModify() {
    if (!this.selected) {
      return;
    }

    const type = this.typer.get(this.selected.id);
    if (type === MovementType.Operation) {
      this.modifyOperation(this.selected);
    } else if (type === MovementType.Correction) {
      this.modifyCorrection(this.selected);
    } else {
      this.modifyTransfer(this.selected);
    }
  }

  private modifyOperation(operation: Movement) {
    if (!operation) {
      return;
    }

    const dialog = this.dialog.open(OperationEditorComponent, {
      width: '40em',
      height: 'auto',
      data: operation,
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.load().subscribe((data) => {
          this.dataSource.data = data;

          const index = this.dataSource.data.findIndex(
            (item) => item.id === operation.id
          );

          if (index >= 0 && this.dataSource.data[index]) {
            this.selected = this.dataSource.data[index];
          } else {
            this.selected = null;
          }
        });
      }
    });
  }

  private modifyTransfer(transfer: Movement) {
    if (!transfer) {
      return;
    }

    const dialog = this.dialog.open(TransferEditorComponent, {
      width: '40em',
      height: 'auto',
      data: transfer,
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.load().subscribe((data) => {
          this.dataSource.data = data;

          const index = this.dataSource.data.findIndex(
            (item) => item.id === transfer.id
          );

          if (index >= 0 && this.dataSource.data[index]) {
            this.selected = this.dataSource.data[index];
          } else {
            this.selected = null;
          }
        });
      }
    });
  }

  private modifyCorrection(correction: Movement) {
    if (!correction) {
      return;
    }

    const dialog = this.dialog.open(CorrectionEditorComponent, {
      width: '40em',
      height: 'auto',
      data: correction,
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.load().subscribe((data) => {
          this.dataSource.data = data;

          const index = this.dataSource.data.findIndex(
            (item) => item.id === correction.id
          );

          if (index >= 0 && this.dataSource.data[index]) {
            this.selected = this.dataSource.data[index];
          } else {
            this.selected = null;
          }
        });
      }
    });
  }
  public onDelete() {
    if (!this.selected) {
      return;
    }

    let removed$: Observable<Movement>;

    const type = this.typer.get(this.selected.id);
    if (type == MovementType.Operation) {
      removed$ = this.operationService.remove(this.selected.id);
    } else if (type == MovementType.Correction) {
      removed$ = this.correctionService.remove(this.selected.id);
    } else {
      removed$ = this.transferService.remove(this.selected.id);
    }

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

  public onSelectedChange(event: Movement) {
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
