import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Balance } from 'src/balance/model/balance';
import { BalanceService } from 'src/balance/services/balance.service';
import { NotifyService } from 'src/notify/service/notify-service';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  contractorOperationDefault,
} from 'src/operation/contractor-operation/model/contractor-operation';
import { OperationType } from 'src/operation/model/operation-type';
import { Operation } from '../model/operation';
import { OperationEditorDialogComponent } from '../operation-editor-dialog/operation-editor-dialog.component';
import { OperationsDataSource } from './service/operations-data-source';
import { OperationClass } from '../model/operation-class';
import { OperationView } from './model/operation-view';

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.scss'],
  providers: [OperationsDataSource],
})
export class OperationListComponent implements OnInit {
  public operationClass = OperationClass;
  public operationType = OperationType;

  public selected: OperationView | null = null;

  public balances: { account: string; sum: number }[] = [];

  public items$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
    private operationsDataSource: OperationsDataSource,
    private balanceService: BalanceService,
    private dialog: MatDialog,
    private notifyService: NotifyService
  ) {}

  public ngOnInit(): void {
    this.load().subscribe((items) => {
      this.items$.next(items);
    });
  }

  private load(): Observable<OperationView[]> {
    return this.operationsDataSource.load();
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
        switchMap(() => this.load()),
        tap((items) => {
          this.items$.next(items);
        })
      )
      .subscribe();
  }

  public onModify() {
    if (!this.selected) {
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
        switchMap(() => this.load()),
        tap((items) => {
          this.items$.next(items);
        })
      )
      .subscribe();
  }

  public onDelete() {
    if (!this.selected) {
      return;
    }

    const removed$ = this.operationsDataSource.remove(
      this.selected.id,
      this.selected.operationClass
    );

    removed$.pipe(switchMap(() => this.load())).subscribe({
      next: (items) => {
        this.selected = null;
        this.items$.next(items);
        this.notifyService.notify('Запись удалена.', 'success');
      },
      error: (err) => {
        console.log(err);
        this.notifyService.notify('Не удалось удалить запись.', 'error');
      },
    });
  }

  public onSelectedChange(event: Operation) {
    if (event) {
      this.balanceService.get(event.id).subscribe((data: Balance[]) => {
        this.balances = data
          .filter((balance) => balance.sum > 0)
          .map((balance) => ({
            account: balance.account?.name ?? '',
            sum: balance.sum,
          }));
      });
    }
  }
}
