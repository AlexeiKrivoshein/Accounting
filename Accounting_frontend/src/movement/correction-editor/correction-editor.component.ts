import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account } from 'src/account/model/account';
import { AccountService } from 'src/account/services/account.service';
import { NotifyService } from 'src/notify/service/notify-service';
import { Correction, correctionFormGroup } from '../model/correction';
import { OperationType, operationTypeDisplayFn } from '../model/operation-type';
import { CorrectionService } from '../services/correction.service';

@Component({
  selector: 'app-correction-editor',
  templateUrl: './correction-editor.component.html',
  styleUrls: ['./correction-editor.component.scss'],
})
export class CorrectionEditorComponent {
  public operationTypes = Object.values(OperationType).filter(
    (value) => !isNaN(Number(value))
  );
  public operationTypeDisplayFn = operationTypeDisplayFn;

  public formGroup: FormGroup = correctionFormGroup();

  public accounts$: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>(
    []
  );

  public getControl(fieldName: string): FormControl<any> {
    const control = this.formGroup.get(fieldName);
    return control as FormControl<any>;
  }

  public get items$(): Observable<Correction[]> {
    return this.correctionService.get();
  }

  public accountDisplayFn = (data: any) => (data ? data['name'] : '');

  constructor(
    private dialogRef: MatDialogRef<CorrectionEditorComponent>,
    @Inject(MAT_DIALOG_DATA) data: Correction,
    private correctionService: CorrectionService,
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
    const correction = this.formGroup.getRawValue();
    
    this.correctionService.set(correction).subscribe((correction) => {
      this.formGroup.setValue(correction);
      this.notifyService.notify('Сохранено', 'success');
      this.dialogRef.close(true);
    });
  }
}
