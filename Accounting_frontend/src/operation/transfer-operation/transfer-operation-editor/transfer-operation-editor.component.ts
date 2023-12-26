import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { TransferOperationService } from 'src/operation/services/transfer-operation.service';
import { NotifyService } from 'src/notify/service/notify-service';
import { TransferOperation, transferFormGroup } from '../model/transfer-operation';
import { Account } from 'src/dictionaries/account/model/account';
import { AccountService } from 'src/dictionaries/account/services/account.service';

@Component({
  selector: 'app-transfer-operation-editor',
  templateUrl: './transfer-operation-editor.component.html',
  styleUrls: ['./transfer-operation-editor.component.scss'],
})
export class TransferOperationEditorComponent {
  public formGroup: FormGroup = transferFormGroup();

  public accounts$: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>(
    []
  );

  public getControl(fieldName: string): FormControl<any> {
    const control = this.formGroup.get(fieldName);
    return control as FormControl<any>;
  }

  public accountDisplayFn = (data: any) => (data ? data['name'] : '');

  constructor(
    private dialogRef: MatDialogRef<TransferOperationEditorComponent>,
    @Inject(MAT_DIALOG_DATA) data: TransferOperation,
    private transferService: TransferOperationService,
    private accountService: AccountService,
    private notifyService: NotifyService
  ) {
    this.formGroup.setValue(data);
  }

  ngOnInit(): void {
    this.accountService.get().subscribe((accounts) => {
      this.accounts$.next(accounts);
    });
  }

  public onCancel() {
    this.dialogRef.close(false);
  }

  public onSave() {
    const transfer = this.formGroup.getRawValue();

    this.transferService.set(transfer).subscribe((transfer) => {
      this.formGroup.setValue(transfer);
      this.notifyService.notify('Сохранено', 'success');
      this.dialogRef.close(true);
    });
  }
}
