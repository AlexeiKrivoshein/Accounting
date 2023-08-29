import { DataSource } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Column } from 'src/controls/table/model/column';
import { AccountEditorComponent } from '../account-editor/account-editor.component';
import { Account, ACCOUNT_DEFAULT } from '../model/account';
import { AccountService } from '../services/account.service';

const ACCOUNT_COLUMNS: Column[] = [
  {
    path: 'Name',
    header: 'Наименование'
  }
]

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent {
  public columns = ACCOUNT_COLUMNS;

  public dataSource: DataSource<Account>;

  constructor(accoutnService: AccountService, public dialog: MatDialog){
    this.dataSource = {
      connect: () => accoutnService.get(),
      disconnect: () => {}
    }
  }

  public onAddClick() {
    const dialog = this.dialog.open(AccountEditorComponent, {
      width: '64em',
      maxWidth: '100%',
      height: 'auto',
      maxHeight: '100%',
      data: ACCOUNT_DEFAULT,
    });
  }
}
