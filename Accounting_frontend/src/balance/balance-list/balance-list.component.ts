import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from 'src/controls/table/model/column';
import { Balance } from '../model/balance';
import { BalanceService } from '../services/balance.service';

const BALANCE_COLUMNS: Column[] = [
  {
    path: 'date',
    header: 'Дата',
    type: 'Date',
  },
  {
    path: 'account.name',
    header: 'Счет',
  },
  {
    path: 'sum',
    header: 'Остаток',
    type: 'Currency',
  },
];

@Component({
  selector: 'app-balance-list',
  templateUrl: './balance-list.component.html',
  styleUrls: ['./balance-list.component.scss'],
})
export class BalanceListComponent {
  public selected: Balance | null = null;

  public columns = BALANCE_COLUMNS;

  public dataSource: MatTableDataSource<Balance> =
    new MatTableDataSource<Balance>([]);

  constructor(
    private balanceService: BalanceService,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.balanceService
      .getAll()
      .subscribe((data) => (this.dataSource.data = data));
  }
}
