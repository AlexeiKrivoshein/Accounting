import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Column } from 'src/controls/table/model/column';
import { NotifyService } from 'src/notify/service/notify-service';
import { Plan, planFormGroup } from '../model/plan';
import { PlanSpending, planSpendingDefault } from '../model/plan-spending';
import { PlanSaving, planSavingDefault } from '../model/plan-savings';
import { PlanService } from '../services/plan.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToolbarButtonConfig } from 'src/controls/toolbar/model/toolbar-button-config';
import { PlanSpendingEditorComponent } from '../plan-spending-editor/plan-spending-editor.component';
import { PlanSavingEditorComponent } from '../plan-saving-editor/plan-saving-editor.component';

const SPENDING_COLUMNS: Column[] = [
  {
    path: 'category.name',
    header: 'Категория',
    type: 'String',
  },
  {
    path: 'sum',
    header: 'Сумма',
    type: 'Number',
  },
];

const SAVINGS_COLUMNS: Column[] = [
  {
    path: 'account.name',
    header: 'Счет',
    type: 'String',
  },
  {
    path: 'sum',
    header: 'Сумма',
    type: 'String',
  },
];

@Component({
  selector: 'app-plan-editor',
  templateUrl: './plan-editor.component.html',
  styleUrls: ['./plan-editor.component.scss'],
})
export class PlanEditorComponent implements OnInit {
  // ТРАТЫ
  /**
   * Источник данных таблицы траты
   */
  public spendingDS: MatTableDataSource<PlanSpending> =
    new MatTableDataSource<PlanSpending>([]);

  /**
   * Структура таблицы траты
   */
  public spendingColumns = SPENDING_COLUMNS;

  /**
   * Выбранная строка таблицы траты
   */
  public selectedSpending: PlanSpending | null = null;

  /**
   * Toolbar, кнопки редактирования данных таблицы траты
   */
  public spendingToolbar: ToolbarButtonConfig[] = [
    {
      text: 'Добавить',
      click: this.onSpendingAdd.bind(this),
    },
    {
      text: 'Изменить',
      click: this.onSpendingModify.bind(this),
      enabled: () => !!this.selectedSpending,
    },
    {
      text: 'Удалить',
      click: this.onSpendingDelete.bind(this),
      enabled: () => !!this.selectedSpending,
    },
  ];

  public spendingSum: number = 0;

  //НАКОПЛЕНИЯ
  /**
   * Источник данных иаблицы накопления
   */
  public savingsDS: MatTableDataSource<PlanSaving> =
    new MatTableDataSource<PlanSaving>([]);

  /**
   * Структура таблицы накопления
   */
  public savingsColumns = SAVINGS_COLUMNS;

  /**
   * Выбранная строка таблицы накопления
   */
  public selectedSaving: PlanSaving | null = null;

  /**
   * Toolbar, кнопки редактирования данных таблицы траты
   */
  public savingToolbar: ToolbarButtonConfig[] = [
    {
      text: 'Добавить',
      click: this.onSavingAdd.bind(this),
    },
    {
      text: 'Изменить',
      click: this.onSavingModify.bind(this),
      enabled: () => !!this.selectedSaving,
    },
    {
      text: 'Удалить',
      click: this.onSavingDelete.bind(this),
      enabled: () => !!this.selectedSaving,
    },
  ];

  public savingsSum: number = 0;

  /**
   * FormGroup формы, сущность План
   */
  public formGroup: FormGroup = planFormGroup();

  /**
   * Получение типизированного control
   * @param fieldName Путь, имя поля
   * @returns FormControl поля сущности
   */
  public getControl(fieldName: string): FormControl<any> {
    const control = this.formGroup.get(fieldName);
    return control as FormControl<any>;
  }

  constructor(
    private dialogRef: MatDialogRef<PlanEditorComponent>,
    @Inject(MAT_DIALOG_DATA) data: Plan,
    private planService: PlanService,
    public dialog: MatDialog,
    private notifyService: NotifyService
  ) {
    this.formGroup.setValue(data);
    this.savingsDS.data = data.savings;
    this.calcSavings();
    this.spendingDS.data = data.spendings;
    this.calcSpending();
  }

  ngOnInit(): void {}

  /**
   * Сохранение плана
   */
  public onSave() {
    const plan = this.formGroup.getRawValue();
    this.planService.set(plan).subscribe((plan) => {
      this.formGroup.setValue(plan);
      this.notifyService.notify('Сохранено', 'success');
      this.dialogRef.close(true);
    });
  }

  /**
   * Отмена, закрытие формы
   */
  public onCancel() {
    this.dialogRef.close(false);
  }

  // ТРАТЫ

  /**
   * Добавление траты
   */
  public onSpendingAdd(): void {
    this.spendingModify(planSpendingDefault());
  }

  /**
   * Редактирование траты
   */
  public onSpendingModify(): void {
    if (!!this.selectedSpending) {
      this.spendingModify(this.selectedSpending);
    }
  }

  /**
   * Удаление траты
   */
  public onSpendingDelete(): void {
    if (!this.selectedSpending) {
      return;
    }

    const plan = this.formGroup.getRawValue() as Plan;
    const index = plan.spendings.findIndex(
      (item) => item.id === this.selectedSpending?.id ?? ''
    );

    if (index >= 0) {
      plan.spendings.splice(index, 1);
      this.selectedSpending = null;
      this.spendingDS.data = plan.spendings;
      this.calcSpending();
      this.formGroup.patchValue(plan);
    }
  }

  /**
   * Открытие формы редактирования траты
   * @param spending Трата
   */
  private spendingModify(spending: PlanSpending): void {
    if (!spending) {
      return;
    }

    const dialog = this.dialog.open(PlanSpendingEditorComponent, {
      width: '40em',
      height: 'auto',
      data: spending,
      autoFocus: 'dialog',
    });

    dialog.afterClosed().subscribe((spending) => {
      if (spending) {
        const plan = this.formGroup.getRawValue() as Plan;
        const index = plan.spendings.findIndex(
          (item) => item.id === spending.id
        );

        if (index >= 0) {
          plan.spendings[index] = spending;
        } else {
          plan.spendings.push(spending);
        }

        this.spendingDS.data = plan.spendings;
        this.calcSpending();
        this.formGroup.setValue(plan);
      }
    });
  }

  // НАКОПЛЕНИЯ

  /**
   * Добавление накопления
   */
  public onSavingAdd(): void {
    this.savingModify(planSavingDefault());
  }

  /**
   * Редактирование накопления
   */
  public onSavingModify(): void {
    if (!!this.selectedSaving) {
      this.savingModify(this.selectedSaving);
    }
  }

  /**
   * Удаление накопления
   */
  public onSavingDelete(): void {
    if (!this.selectedSaving) {
      return;
    }

    const plan = this.formGroup.getRawValue() as Plan;
    const index = plan.savings.findIndex(
      (item) => item.id === this.selectedSaving?.id ?? ''
    );

    if (index >= 0) {
      plan.savings.splice(index, 1);
      this.selectedSaving = null;
      this.savingsDS.data = plan.savings;
      this.calcSavings();
      this.formGroup.patchValue(plan);
    }
  }

  /**
   * Открытие формы редактирования траты
   * @param saving Накопление
   */
  private savingModify(saving: PlanSaving): void {
    if (!saving) {
      return;
    }

    const dialog = this.dialog.open(PlanSavingEditorComponent, {
      width: '40em',
      height: 'auto',
      data: saving,
      autoFocus: 'dialog',
    });

    dialog.afterClosed().subscribe((saving) => {
      if (saving) {
        const plan = this.formGroup.getRawValue() as Plan;
        const index = plan.savings.findIndex((item) => item.id === saving.id);

        if (index >= 0) {
          plan.savings[index] = saving;
        } else {
          plan.savings.push(saving);
        }

        this.savingsDS.data = plan.savings;
        this.calcSavings();
        this.formGroup.setValue(plan);
      }
    });
  }

  private calcSpending() {
    const spendings = this.spendingDS.data;
    this.spendingSum = 0;
    spendings.forEach((spend) => (this.spendingSum += spend.sum));
  }

  private calcSavings() {
    const savings = this.savingsDS.data;
    this.savingsSum = 0;
    savings.forEach((saving) => (this.savingsSum += saving.sum));
  }
}
