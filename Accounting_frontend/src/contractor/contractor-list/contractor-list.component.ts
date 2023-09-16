import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Column } from 'src/controls/table/model/column';
import { NotifyService } from 'src/notify/service/notify-service';
import { Contractor, contractorDefault } from '../model/contractor';
import { ContractorService } from '../services/contractor.service';
import { ContractorEditorComponent } from '../contractor-editor/contractor-editor.component';

const CONTRACTOR_COLUMNS: Column[] = [
  {
    path: 'name',
    header: 'Наименование',
  },
  {
    path: 'category.name',
    header: 'Категория',
  },
];

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.scss'],
})
export class ContractorListComponent {
  public selected: Contractor | null = null;

  public columns = CONTRACTOR_COLUMNS;

  public dataSource: MatTableDataSource<Contractor> =
    new MatTableDataSource<Contractor>([]);

  constructor(
    private contractorService: ContractorService,
    public dialog: MatDialog,
    private notifyService: NotifyService
  ) {}

  public ngOnInit(): void {
    this.contractorService
      .get()
      .subscribe((data) => (this.dataSource.data = data));
  }

  public onAdd() {
    this.moodify(contractorDefault());
  }

  public onModify() {
    if (!!this.selected) {
      this.moodify(this.selected);
    }
  }

  private moodify(contractor: Contractor) {
    if (!contractor) {
      return;
    }

    const dialog = this.dialog.open(ContractorEditorComponent, {
      width: '40em',
      height: 'auto',
      data: contractor,
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.contractorService.get().subscribe((data) => {
          this.dataSource.data = data;

          const index = this.dataSource.data.findIndex(
            (item) => item.id === contractor.id
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

    this.contractorService
      .remove(this.selected.id)
      .pipe(switchMap(() => this.contractorService.get()))
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
    this.moodify(event);
  }
}
