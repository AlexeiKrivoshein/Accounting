import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NotifyService } from 'src/notify/service/notify-service';
import { Movement, movementDefault } from '../model/movement';
import { OperationEditorComponent } from '../operation-editor/operation-editor.component';
import { OperationService } from '../services/operation.service';
import { switchMap } from 'rxjs/operators';

const IMPORT_TAB: string = 'importtab';
const OPERATIONS_TAB: string = 'operationstab';

//словарь
const PAY = 'Оплата товаров и услуг';
const TODAY = 'Сегодня';
const YESTODAY = 'Вчера';
const BEFORE_YESTODAY = 'Позавчера';

const RUB = 'RUB';

const MONTH_JANUARY = 'Январь';
const MONTH_FEBRUARY = 'Февраль';
const MONTH_MARCH = 'Март';
const MONTH_APRIL = 'Апрель';
const MONTH_MAY = 'Май';
const MONTH_JUNE = 'Июнь';
const MONTH_JULY = 'Июль';
const MONTH_AUGUST = 'Август';
const MONTH_SEPTEMBER = 'Сентябрь';
const MONTH_OCTOBER = 'Октябрь';
const MONTH_NOVEMBER = 'Ноябрь';
const MONTH_DECEMBER = 'Декабрь';

//29 сентября, пятница

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent {
  public selected: Movement | null = null;

  public columns = [];

  public IMPORT_TAB = IMPORT_TAB;
  public OPERATIONS_TAB = OPERATIONS_TAB;

  public selectedTab: string = IMPORT_TAB;

  public control: FormControl<string | null> = new FormControl<string>('');

  public dataSource: MatTableDataSource<Movement> =
    new MatTableDataSource<Movement>([]);

  constructor(
    private dialogRef: MatDialogRef<ImportComponent>,
    private operationService: OperationService,
    public dialog: MatDialog,
    public notifyService: NotifyService
  ) {}

  public onAdd() {
    this.modify(movementDefault());
  }

  public onModify() {
    if (!!this.selected) {
      this.modify(this.selected);
    }
  }

  private modify(operation: Movement) {
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

  public loadFile() {}

  public onSelectedChange(event: any) {}

  public onCancel() {
    this.dialogRef.close(false);
  }

  public onImport() {}

  public onParse() {
    const content = this.control.value;
    const now = new Date();

    if (content) {
      const rows = content.split(/\r?\n/);

      let date: Date;
      for (let index = 0; index < rows.length; index++) {
        const row = rows[index].trim();

        // сегодня
        if (new RegExp(`^${TODAY}$`).test(row)) {
          date = now;
        } 
        // вчера
        else if (new RegExp(`^${YESTODAY}$`).test(row)) {
          date = new Date();
          date.setDate(now.getDate()-1);
        } 
        // позавчера
        else if (new RegExp(`^${BEFORE_YESTODAY}$`).test(row)) {
          date = new Date();
          date.setDate(now.getDate()-2);
        }
        // январь
        else if (RegExp(`^\d{1,2}\s${MONTH_JANUARY}$`).test(row)) {
          date = new Date();

          // const exec = new RegExp(`^\d{1,2}\s${MONTH_JANUARY}$`)
          // const day = exec[0];
          
          //regEx.exec(row).fi
        }
        // февраль
        else if (new RegExp(`^\d{1,2}\s${MONTH_FEBRUARY}$`)) {
        }
        // март
        else if (new RegExp(`^\d{1,2}\s${MONTH_MARCH}$`)) {
        }
        // апрель
        else if (new RegExp(`^\d{1,2}\s${MONTH_APRIL}$`)) {
        }
        // май
        else if (new RegExp(`^\d{1,2}\s${MONTH_MAY}$`)) {
        }
        // июнь
        else if (new RegExp(`^\d{1,2}\s${MONTH_JUNE}$`)) {
        }
        // июль
        else if (new RegExp(`^\d{1,2}\s${MONTH_JULY}$`)) {
        }
        // август
        else if (new RegExp(`^\d{1,2}\s${MONTH_AUGUST}$`)) {
        }
        // сентябрь
        else if (new RegExp(`^\d{1,2}\s${MONTH_SEPTEMBER}$`)) {
        }
        // октябрь
        else if (new RegExp(`^\d{1,2}\s${MONTH_OCTOBER}$`)) {
        }
        // ноябрь
        else if (new RegExp(`^\d{1,2}\s${MONTH_NOVEMBER}$`)) {
        }
        // декабрь
        else if (new RegExp(`^\d{1,2}\s${MONTH_DECEMBER}$`)) {
        }
      }
    }
  }
}