import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { AccountBase } from 'src/dictionaries/account/model/account-base';
import { AccountService } from 'src/dictionaries/account/services/account.service';
import { PlanSaving, planSavingFormGroup } from '../model/plan-savings';

@Component({
  selector: 'app-plan-saving-editor',
  templateUrl: './plan-saving-editor.component.html',
  styleUrls: ['./plan-saving-editor.component.scss'],
})
export class PlanSavingEditorComponent {
  public formGroup: FormGroup = planSavingFormGroup();

  public accounts$: BehaviorSubject<AccountBase[]> = new BehaviorSubject<AccountBase[]>(
    []
  );

  public getControl(fieldName: string): FormControl<any> {
    const control = this.formGroup.get(fieldName);
    return control as FormControl<any>;
  }

  public accountDisplayFn = (data: any) => (data ? data['name'] : '');

  constructor(
    private dialogRef: MatDialogRef<PlanSavingEditorComponent>,
    @Inject(MAT_DIALOG_DATA) data: PlanSaving,
    private accountService: AccountService
  ) {
    this.formGroup.setValue(data);
  }

  ngOnInit(): void {
    this.accountService.get().subscribe((accounts) => {
      this.accounts$.next(accounts);
    });
  }

  public onCancel() {
    this.dialogRef.close(null);
  }

  public onSave() {
    const saving = this.formGroup.getRawValue() as PlanSaving;
    saving.accountID = saving.account?.id ?? saving.accountID;
    this.dialogRef.close(saving);
  }
}
