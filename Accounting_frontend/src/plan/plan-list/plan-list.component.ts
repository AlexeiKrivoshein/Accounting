import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BalanceService } from 'src/balance/services/balance.service';
import { Column } from 'src/controls/table/model/column';
import { NotifyService } from 'src/notify/service/notify-service';
import { Plan } from '../model/plan';

const PLAN_COLUMNS: Column[] = [
  {
    path: 'startDate',
    header: 'Дата начала',
    type: 'Date',
  },
  {
    path: 'endDate',
    header: 'Дата окончания',
    type: 'Date',
  },
];

const PLAN_TAB: string = 'plantab';
const BALANCE_TAB: string = 'balancetab';
const TURNOVER_TAB: string = 'turnover';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss'],
})
export class PlanListComponent {
  public selected: Plan | null = null;

  public columns = PLAN_COLUMNS;

  public PLAN_TAB = PLAN_TAB;
  public BALANCE_TAB = BALANCE_TAB;
  public TURNOVER_TAB = TURNOVER_TAB;

  public selectedTab: string = PLAN_TAB;

  public dataSource: MatTableDataSource<Plan> = new MatTableDataSource<Plan>(
    []
  );

  public dateControl: FormControl<Date | null> = new FormControl<Date>(
    new Date()
  );

  constructor(
    private balanceService: BalanceService,
    private notifyService: NotifyService
  ) {}

  public onAddPlan() {}

  public onModifyPlan() {}

  public onDeletePlan() {}

  public check() {
    this.balanceService.check().subscribe(() => {
      this.notifyService.notify('Операция выполнена', 'success');
    });
  }
}
