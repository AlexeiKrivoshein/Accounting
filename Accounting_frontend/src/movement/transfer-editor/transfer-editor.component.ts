import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Account } from 'src/account/model/account';
import { AccountService } from 'src/account/services/account.service';
import { NotifyService } from 'src/notify/service/notify-service';
import { Transfer, transferFormGroup } from '../model/transfer';
import { TransferService } from '../services/transfer.service';

@Component({
  selector: 'app-transfer-editor',
  templateUrl: './transfer-editor.component.html',
  styleUrls: ['./transfer-editor.component.scss'],
})
export class TransferEditorComponent {
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
    private dialogRef: MatDialogRef<TransferEditorComponent>,
    @Inject(MAT_DIALOG_DATA) data: Transfer,
    private transferService: TransferService,
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
