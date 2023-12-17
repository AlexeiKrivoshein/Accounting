import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY_GUID } from 'src/const';
import { PlanSpending } from './plan-spending';
import { PlanSaving } from './plan-savings';

/**
 * План
 */
export interface Plan {
  /**
   * Идентификатор
   */
  id: string;

  /**
   * Имя
   */
  name: string;

  /**
   * Дата начала плана
   */
  startDate: Date;

  /**
   * Дата окончания плана
   */
  endDate: Date;

  /**
   * Траты
   */
  spendings: PlanSpending[];

  /**
   * Накопления
   */
  savings: PlanSaving[];

  /**
   * Описание
   */
  description: string;
}

export function planDefault(): Plan {
  const now = new Date();

  let endMonth = 0;
  let endYear = 0;

  const nowMoth = now.getMonth();
  if (nowMoth < 11) {
    endMonth = nowMoth + 1;
    endYear = now.getFullYear();
  } else {
    endMonth = 0;
    endYear = now.getFullYear() + 1;
  }

  const endMaxDay = new Date(endYear, endMonth, 0).getDate();

  const nowDay = now.getDate();

  const endDate = new Date(
    endYear,
    endMonth,
    endMaxDay < nowDay ? endMaxDay : nowDay
  );

  return {
    id: EMPTY_GUID,
    name: '',
    startDate: now,
    endDate,
    spendings: [],
    savings: [],
    description: '',
  };
}

export function planFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    name: new FormControl<string>('', [Validators.required]),
    startDate: new FormControl<Date>(new Date()),
    endDate: new FormControl<Date>(new Date()),
    spendings: new FormControl<PlanSpending[]>([]),
    savings: new FormControl<PlanSaving[]>([]),
    description: new FormControl<string>(''),
  });
}
