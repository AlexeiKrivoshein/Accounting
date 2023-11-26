import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NotifyService } from 'src/notify/service/notify-service';
import { Movement, movementDefault } from '../../movement/model/movement';
import { OperationEditorComponent } from '../../operation/operation-editor/operation-editor.component';
import { OperationService } from '../../operation/services/operation.service';
import { switchMap } from 'rxjs/operators';
import { ImportService } from '../services/import.service';

const IMPORT_TAB: string = 'importtab';
const MOVEMENTS_TAB: string = 'movementstab';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent {
  public selected: Movement | null = null;

  public columns = [];

  public IMPORT_TAB = IMPORT_TAB;
  public MOVEMENTS_TAB = MOVEMENTS_TAB;

  public selectedTab: string = IMPORT_TAB;

  public contentControl: FormControl<string | null> = new FormControl<string>('');

  public dataSource: MatTableDataSource<Movement> =
    new MatTableDataSource<Movement>([]);

  constructor(
    private dialogRef: MatDialogRef<ImportComponent>,
    private operationService: OperationService,
    public dialog: MatDialog,
    public notifyService: NotifyService,
    public importService: ImportService
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

  public onSave() {
    
  }

  public onParse() {
    const content = this.contentControl.getRawValue();

    if (content) {
      this.importService.parse(content).subscribe(movements => {
        console.log(movements);
      });
    }
  }
}