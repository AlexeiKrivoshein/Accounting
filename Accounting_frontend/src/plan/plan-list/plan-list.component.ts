import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Column } from 'src/controls/table/model/column';
import { ToolbarButtonConfig } from 'src/controls/toolbar/model/toolbar-button-config';
import { NotifyService } from 'src/notify/service/notify-service';
import { Plan, planDefault } from '../model/plan';
import { PlanEditorComponent } from '../plan-editor/plan-editor.component';
import { PlanService } from '../services/plan.service';

const PLAN_COLUMNS: Column[] = [
  {
    path: 'name',
    header: 'Имя',
    type: 'String',
  },
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
  {
    path: 'description',
    header: 'Описание',
    type: 'String',
  },
];

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss'],
})
export class PlanListComponent implements OnInit {
  public selected: Plan | null = null;

  public columns = PLAN_COLUMNS;

  public dataSource: MatTableDataSource<Plan> = new MatTableDataSource<Plan>(
    []
  );

  public toolbar: ToolbarButtonConfig[] = [
    {
      text: 'Добавить',
      click: this.onAdd.bind(this),
    },
    {
      text: 'Изменить',
      click: this.onModify.bind(this),
      enabled: () => !!this.selected,
    },
    {
      text: 'Удалить',
      click: this.onDelete.bind(this),
      enabled: () => !!this.selected,
    },
  ];

  constructor(
    private planService: PlanService,
    public dialog: MatDialog,
    private notifyService: NotifyService
  ) {}

  public ngOnInit(): void {
    this.planService.get().subscribe((data) => (this.dataSource.data = data));
  }

  public onAdd() {
    this.modify(planDefault());
  }

  public onModify() {
    if (!!this.selected) {
      this.planService.get(this.selected.id).subscribe({
        next: (plans: Plan[]) => this.modify(plans[0]),
        error: (err: any) => {
          console.log(err);
          this.notifyService.notify('Не удалось загрузить план.', 'error');
        },
      });
    }
  }

  private modify(plan: Plan) {
    if (!plan) {
      return;
    }

    const dialog = this.dialog.open(PlanEditorComponent, {
      width: '40em',
      height: 'auto',
      maxHeight: '80%',
      data: plan,
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.planService.get().subscribe((data) => {
          this.dataSource.data = data;

          const index = this.dataSource.data.findIndex(
            (item) => item.id === plan.id
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

    this.planService
      .remove(this.selected.id)
      .pipe(switchMap(() => this.planService.get()))
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
}
