import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Column } from 'src/controls/table/model/column';
import { NotifyService } from 'src/notify/service/notify-service';
import { Operation, operationDefault } from '../model/operation';
import { OperationEditorComponent } from '../operation-editor/operation-editor.component';
import { OperationService } from '../services/operation.service';

const OPERATION_COLUMNS: Column[] = [
  {
    path: 'date',
    header: 'Дата',
    type: 'Date'
  },
  {
    path: 'account.name',
    header: 'Счет',
  },
  {
    path: 'contractor.name',
    header: 'Контрагент',
  },
  {
    path: 'description',
    header: 'Описание',
  },
  {
    path: 'sum',
    header: 'Сумма операции',
    type: 'Currency'
  },
  {
    path: 'category.name',
    header: 'Категория',
  }
];

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.scss'],
})
export class OperationListComponent {
  public selected: Operation | null = null;

  public columns = OPERATION_COLUMNS;

  public dataSource: MatTableDataSource<Operation> =
    new MatTableDataSource<Operation>([]);

  constructor(
    private operationService: OperationService,
    public dialog: MatDialog,
    private notifyService: NotifyService
  ) {}

  public ngOnInit(): void {
    this.operationService
      .get()
      .subscribe((data) => (this.dataSource.data = data));
  }

  public onAdd() {
    this.modify(operationDefault());
  }

  public onModify() {
    if (!!this.selected) {
      this.modify(this.selected);
    }
  }

  private modify(operation: Operation) {
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
        this.operationService.get().subscribe((data) => {
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

  public onDelete() {
    if (!this.selected) {
      return;
    }

    this.operationService
      .remove(this.selected.id)
      .pipe(switchMap(() => this.operationService.get()))
      .subscribe({
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

  public onDoubleClick(event: any) {
    this.modify(event);
  }
}
