import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, map, switchMap } from 'rxjs/operators';
import { Balance } from 'src/balance/model/balance';
import { BalanceService } from 'src/balance/services/balance.service';
import { NotifyService } from 'src/notify/service/notify-service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  ContractorOperation,
  contractorOperationDefault,
} from 'src/operation/contractor-operation/model/contractor-operation';
import { OperationType } from 'src/operation/model/operation-type';
import { OperationEditorDialogComponent } from '../operation-editor-dialog/operation-editor-dialog.component';
import { OperationsDataSource } from './service/operations-data-source';
import { OperationClass, operationClassLocal } from '../model/operation-class';
import { OperationView } from './model/operation-view';
import { FilterPanelItem } from '../filter-panel/model/filter-panel-item';
import { FilterItemValue } from '../filter-panel/model/filter-item-value';
import { Operation } from '../model/operation';
import { TransferOperation } from '../transfer-operation/model/transfer-operation';
import { CorrectionOperation } from '../correction-operation/model/correction-operation';
import { CashOperation } from '../cash-operation/model/cash-operation';
import { DatePipe } from '@angular/common';
import { v4 } from 'uuid';
import { FilterPanelItemAutocompete } from '../filter-panel/model/filter-panel-item-autocomplete';
import { CategoryService } from 'src/dictionaries/category/services/category.service';
import {
  MAX_DATE_POSTFIX,
  MIN_DATE_POSTFIX,
  OPERATION_CLASS_FILTER,
} from '../filter-panel/const';

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.scss'],
  providers: [OperationsDataSource, DatePipe],
})
export class OperationListComponent implements OnInit {
  public operationClass = OperationClass;
  public operationType = OperationType;

  public selected: OperationView | null = null;

  public balances: { account: string; sum: number }[] = [];

  public items$: BehaviorSubject<OperationView[]> = new BehaviorSubject<
    OperationView[]
  >([]);

  private _operationClassAutocomplite: FilterPanelItemAutocompete = {
    text: 'Тип операции',
    path: OPERATION_CLASS_FILTER,
    type: 'autocomplete',
    displayFn: (data: any) => data?.display ?? '',
    valueFn: (data: any) => data?.value ?? '',
    items$: of(
      Object.values(OperationClass)
        .filter((v) => !isNaN(Number(v)))
        .map((v) => {
          const operationClass = v as OperationClass;

          return {
            display: operationClassLocal(operationClass),
            value: operationClass,
          };
        })
    ),
  };

  private _categoryClassAutocomplite: FilterPanelItemAutocompete = {
    text: 'Категория',
    path: 'categoryID',
    type: 'autocomplete',
    displayFn: (data: any) => data?.name ?? '',
    valueFn: (data: any) => data?.id ?? '',
    items$: this.categoryService.get(),
  };

  public filterItems: FilterPanelItem[] = [
    {
      text: 'Дата операции с',
      path: `date${MIN_DATE_POSTFIX}`,
      type: 'date',
    },
    {
      text: 'Дата операции по',
      path: `date${MAX_DATE_POSTFIX}`,
      type: 'date',
    },
    this._operationClassAutocomplite,
    this._categoryClassAutocomplite,
  ];

  private _filter: FilterItemValue[] = [];

  public showFilter: Boolean = false;

  constructor(
    private operationsDataSource: OperationsDataSource,
    private balanceService: BalanceService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private notifyService: NotifyService,
    private datepipe: DatePipe
  ) {}

  public ngOnInit(): void {
    this.load().subscribe();
  }

  private load(): Observable<OperationView[]> {
    return this.operationsDataSource.load(this._filter).pipe(
      map((items) => {
        const views: OperationView[] = [];

        if (items?.length) {
          let groupDate = new Date(items[0].date);

          views.push({
            id: v4(),
            icon: '',
            from: this.datepipe.transform(groupDate, 'dd-MM-yyyy') ?? '',
            to: '',
            description: '',
            sum: 0,
            operationClass: null,
          });

          items.forEach((item) => {
            const itemDate = new Date(item.date);

            if (
              groupDate.getFullYear() !== itemDate.getFullYear() ||
              groupDate.getMonth() !== itemDate.getMonth() ||
              groupDate.getDay() !== itemDate.getDay()
            ) {
              groupDate = new Date(item.date);

              views.push({
                id: v4(),
                icon: '',
                from: this.datepipe.transform(groupDate, 'dd-MM-yyyy') ?? '',
                to: '',
                description: '',
                sum: 0,
                operationClass: null,
              });
            }

            views.push(this.castToView(item));
          });
        }

        this.items$.next(views);

        return views;
      })
    );
  }

  public onCreate() {
    this.dialog
      .open(OperationEditorDialogComponent, {
        width: '40em',
        height: 'auto',
        autoFocus: 'dialog',
        data: contractorOperationDefault(),
      })
      .afterClosed()
      .pipe(
        filter((result) => result),
        switchMap(() => this.load())
      )
      .subscribe();
  }

  public onModify() {
    if (!this.selected || this.selected.operationClass === null) {
      return;
    }

    this.operationsDataSource
      .get(this.selected.id, this.selected.operationClass)
      .pipe(
        switchMap((operation) => {
          return this.dialog
            .open(OperationEditorDialogComponent, {
              width: '40em',
              height: 'auto',
              autoFocus: 'dialog',
              data: operation,
            })
            .afterClosed();
        }),
        filter((result) => result),
        switchMap(() => this.load())
      )
      .subscribe();
  }

  public onDelete() {
    if (!this.selected || this.selected.operationClass === null) {
      return;
    }

    const removed$ = this.operationsDataSource.remove(
      this.selected.id,
      this.selected.operationClass
    );

    removed$.pipe(switchMap(() => this.load())).subscribe({
      next: () => {
        this.selected = null;
        this.notifyService.notify('Запись удалена.', 'success');
      },
      error: (err) => {
        console.log(err);
        this.notifyService.notify('Не удалось удалить запись.', 'error');
      },
    });
  }

  public onSelectedChange(event: OperationView) {
    if (!event || event.operationClass === null) {
      return;
    }

    this.balanceService.get(event.id).subscribe((data: Balance[]) => {
      this.balances = data
        .filter((balance) => balance.sum > 0)
        .map((balance) => ({
          account: balance.account?.name ?? '',
          sum: balance.sum,
        }));
    });
  }

  public onFilterApply(filter: FilterItemValue[]) {
    this._filter = filter;
    this.load().subscribe();
  }

  private castToView(operation: Operation): OperationView {
    let from = '';
    let to = '';

    switch (operation.operationClass) {
      case OperationClass.ContractorOperation:
        const contractorOperation = operation as ContractorOperation;

        if (contractorOperation.operationType === OperationType.Credited) {
          from = contractorOperation.account?.name ?? '';
          to = contractorOperation.contractor?.name ?? '';
        } else {
          from = contractorOperation.contractor?.name ?? '';
          to = contractorOperation.account?.name ?? '';
        }

        return {
          id: contractorOperation.id,
          icon: 'shopping_cart',
          from,
          to,
          description: contractorOperation.category?.name ?? '',
          sum: contractorOperation.sum,
          operationClass: OperationClass.ContractorOperation,
        };
      case OperationClass.TransferOperation:
        const transferOperation = operation as TransferOperation;
        from = transferOperation.creditAccount?.name ?? '';
        to = transferOperation.debitAccount?.name ?? '';

        return {
          id: transferOperation.id,
          icon: 'swap_horiz',
          from,
          to,
          description: '',
          sum: transferOperation.sum,
          operationClass: OperationClass.TransferOperation,
        };
      case OperationClass.CorrectionOperation:
        const correctionOperation = operation as CorrectionOperation;
        from = correctionOperation.account?.name ?? '';
        to = '';

        return {
          id: correctionOperation.id,
          icon: 'exposure',
          from,
          to,
          description:
            correctionOperation.operationType === OperationType.Credited
              ? 'Расход'
              : 'Приход',
          sum: correctionOperation.sum,
          operationClass: OperationClass.CorrectionOperation,
        };
      case OperationClass.CashOperation:
        const cashOperation = operation as CashOperation;
        from = cashOperation.account?.name ?? '';
        to = '';

        return {
          id: cashOperation.id,
          icon: 'payments',
          from,
          to,
          description:
            cashOperation.operationType === OperationType.Credited
              ? 'Снятие'
              : 'Внесение',
          sum: cashOperation.sum,
          operationClass: OperationClass.CashOperation,
        };
    }
  }
}
