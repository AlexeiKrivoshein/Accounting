import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifyService } from 'src/notify/service/notify-service';
import { Account, accountFormGroup } from '../model/account';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account-editor',
  templateUrl: './account-editor.component.html',
  styleUrls: ['./account-editor.component.scss']
})
export class AccountEditorComponent implements OnInit {
  public formGroup: FormGroup = accountFormGroup();

  public getControl(fieldName: string): FormControl<any> {
    const control = this.formGroup.get(fieldName);
    return control as FormControl<any>;
  }

  constructor(
    private dialogRef: MatDialogRef<AccountEditorComponent>,
    @Inject(MAT_DIALOG_DATA) data: Account,
    private accountService: AccountService,
    private notifyService: NotifyService
  ) {
    this.formGroup.setValue(data);
  }

  ngOnInit(): void {
  }

  public onCancel() {
    this.dialogRef.close(false)
  }

  public onSave() {
    const account = this.formGroup.getRawValue()
    this.accountService.set(account).subscribe(account => {
      this.formGroup.setValue(account);
      this.notifyService.notify('Сохранено', 'success')
      this.dialogRef.close(true);
    })
  }
}
