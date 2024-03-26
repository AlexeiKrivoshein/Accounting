import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AccountBase } from 'src/dictionaries/account/model/account-base';
import { AccountService } from 'src/dictionaries/account/services/account.service';
import {
  OperationType,
  operationTypeDisplayFn,
} from 'src/operation/model/operation-type';
import { OperationService } from 'src/operation/operation-editor-dialog/service/operation.service';

@Component({
  selector: 'app-correction-operation-editor',
  templateUrl: './correction-operation-editor.component.html',
  styleUrls: ['./correction-operation-editor.component.scss'],
})
export class CorrectionOperationEditorComponent {
  public operationTypes = Object.values(OperationType).filter(
    (value) => !isNaN(Number(value))
  );

  public operationTypeDisplayFn = operationTypeDisplayFn;

  public accounts$: BehaviorSubject<AccountBase[]> = new BehaviorSubject<AccountBase[]>(
    []
  );

  public accountDisplayFn = (data: any) => (data ? data['name'] : '');

  public getControl(fieldName: string): FormControl<any> {
    const control = this._formGroup.get(fieldName);
    return control as FormControl<any>;
  }

  private get _formGroup() {
    return this._operationService.correctionOperationDM.formGroup;
  }

  constructor(
    private _accountService: AccountService,
    private _operationService: OperationService
  ) {}

  ngOnInit(): void {
    this._accountService.get().subscribe((accounts) => {
      this.accounts$.next(accounts);
    });
  }
}
