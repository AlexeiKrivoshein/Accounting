import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { map, switchMap } from 'rxjs/operators';
import { Balance } from 'src/balance/model/balance';
import { BalanceService } from 'src/balance/services/balance.service';
import { DropdownButtonItem } from 'src/controls/dropdown-button/model/dropdown-button-item';
import { Column } from 'src/controls/table/model/column';
import { NotifyService } from 'src/notify/service/notify-service';
import { forkJoin, Observable } from 'rxjs';
import {
  ContractorOperation,
  operationDefault,
} from 'src/operation/contractor-operation/model/contractor-operation';
import { OperationType } from 'src/operation/model/operation-type';
import {
  CorrectionOperation,
  correctionDefault,
} from 'src/operation/correction-operation/model/correction-operation';
import {
  TransferOperation,
  transferDefault,
} from 'src/operation/transfer-operation/model/transfer-operation';
import { CorrectionOperationService } from 'src/operation/correction-operation/services/correction-operation.service';
import { ContractorOperationService } from 'src/operation/contractor-operation/services/contractor-operation.service';
import { ContractorOperationEditorComponent } from 'src/operation/contractor-operation/contractor-operation-editor/contractor-operation-editor.component';
import { TransferOperationEditorComponent } from 'src/operation/transfer-operation/transfer-operation-editor/transfer-operation-editor.component';
import { CorrectionEditorComponent } from 'src/operation/correction-operation/correction-operation-editor/correction-editor.component';
import { Operation } from '../model/operation';
import { MovementType } from '../model/movement-type';
import { TransferOperationService } from '../services/transfer-operation.service';

@Component({
  selector: 'app-movement-list',
  templateUrl: './movement-list.component.html',
  styleUrls: ['./movement-list.component.scss'],
})
export class MovementListComponent implements OnInit {
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
      displayFn: (data: Operation) => {
        if (this.typer.has(data.id)) {
          const type = this.typer.get(data.id);

          if (type == MovementType.Operation) {
            const operation = data as ContractorOperation;

            if (operation.operationType == OperationType.Debited) {
              return operation.contractor?.name ?? '';
            } else {
              return operation.account?.name ?? '';
            }
          } else if (type == MovementType.Correction) {
            const correction = data as CorrectionOperation;

            if (correction.operationType == OperationType.Debited) {
              return '';
            } else {
              return correction.account?.name ?? '';
            }
          } else {
            const transfer = data as TransferOperation;

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
      displayFn: (data: Operation) => {
        if (this.typer.has(data.id)) {
          const type = this.typer.get(data.id);

          if (type == MovementType.Operation) {
            const operation = data as ContractorOperation;

            if (operation.operationType == OperationType.Debited) {
              return operation.account?.name ?? '';
            } else {
              return operation.contractor?.name ?? '';
            }
          } else if (type == MovementType.Correction) {
            const correction = data as CorrectionOperation;

            if (correction.operationType == OperationType.Debited) {
              return correction.account?.name ?? '';
            } else {
              return '';
            }
          } else {
            const transfer = data as TransferOperation;

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

  public dataSource: MatTableDataSource<Operation> =
    new MatTableDataSource<Operation>([]);

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
    private operationService: ContractorOperationService,
    private transferService: TransferOperationService,
    private correctionService: CorrectionOperationService,
    private balanceService: BalanceService,
    public dialog: MatDialog,
    private notifyService: NotifyService
  ) {}

  public ngOnInit(): void {
    this.load().subscribe((items) => (this.dataSource.data = items));
  }

  private load(): Observable<Operation[]> {
    const movements$ = forkJoin([
      this.operationService.get(),
      this.transferService.get(),
      this.correctionService.get(),
    ]);

    return movements$.pipe(
      map((data) => {
        const movements: Operation[] = [];
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

  private modifyOperation(operation: Operation) {
    if (!operation) {
      return;
    }

    const dialog = this.dialog.open(ContractorOperationEditorComponent, {
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

  private modifyTransfer(transfer: Operation) {
    if (!transfer) {
      return;
    }

    const dialog = this.dialog.open(TransferOperationEditorComponent, {
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

  private modifyCorrection(correction: Operation) {
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

    let removed$: Observable<Operation>;

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
