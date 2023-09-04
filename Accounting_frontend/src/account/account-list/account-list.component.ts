import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Column } from 'src/controls/table/model/column';
import { NotifyService } from 'src/notify/service/notify-service';
import { AccountEditorComponent } from '../account-editor/account-editor.component';
import { Account, accountDefault } from '../model/account';
import { AccountService } from '../services/account.service';

const ACCOUNT_COLUMNS: Column[] = [
  {
    path: 'name',
    header: 'Наименование',
  },
];

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit {
  public selected: Account | null = null;

  public columns = ACCOUNT_COLUMNS;

  public dataSource: MatTableDataSource<Account> =
    new MatTableDataSource<Account>([]);

  constructor(
    private accoutnService: AccountService,
    public dialog: MatDialog,
    private notifyService: NotifyService
  ) {}

  public ngOnInit(): void {
    this.accoutnService
      .get()
      .subscribe((data) => (this.dataSource.data = data));
  }

  public onAdd() {
    this.moodify(accountDefault());
  }

  public onModify() {
    if (!!this.selected) {
      this.moodify(this.selected);
    }
  }

  private moodify(account: Account) {
    if (!this.selected) {
      return;
    }

    const dialog = this.dialog.open(AccountEditorComponent, {
      width: '40em',
      height: 'auto',
      data: account,
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.accoutnService
          .get()
          .subscribe((data) => (this.dataSource.data = data));
      }
    });
  }

  public onDelete() {
    if (!this.selected) {
      return;
    }

    this.accoutnService
      .remove(this.selected.id)
      .pipe(switchMap(() => this.accoutnService.get()))
      .subscribe({
        next: (data) => {
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
    console.log(event);
    this.moodify(event);
  }
}
