import { DataSource } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from 'src/controls/table/model/column';
import { Account } from '../model/account';
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

  constructor(accoutnService: AccountService){
    this.dataSource = {
      connect: () => accoutnService.get(),
      disconnect: () => {}
    }
  }
}
