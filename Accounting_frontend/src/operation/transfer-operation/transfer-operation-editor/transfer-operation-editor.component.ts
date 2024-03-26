import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AccountBase } from 'src/dictionaries/account/model/account-base';
import { AccountService } from 'src/dictionaries/account/services/account.service';
import { OperationService } from 'src/operation/operation-editor-dialog/service/operation.service';

@Component({
  selector: 'app-transfer-operation-editor',
  templateUrl: './transfer-operation-editor.component.html',
  styleUrls: ['./transfer-operation-editor.component.scss'],
})
export class TransferOperationEditorComponent {
  public accounts$: BehaviorSubject<AccountBase[]> = new BehaviorSubject<AccountBase[]>(
    []
  );

  public accountDisplayFn = (data: any) => (data ? data['name'] : '');

  public getControl(fieldName: string): FormControl<any> {
    const control = this._formGroup.get(fieldName);
    return control as FormControl<any>;
  }

  private get _formGroup() {
    return this._operationService.transferOperationDM.formGroup;
  }

  constructor(
    private accountService: AccountService,
    private _operationService: OperationService
  ) {}

  ngOnInit(): void {
    this.accountService.get().subscribe((accounts) => {
      this.accounts$.next(accounts);
    });
  }
}
