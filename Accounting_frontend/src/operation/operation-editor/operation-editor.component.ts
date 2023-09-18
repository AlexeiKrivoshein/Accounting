import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account } from 'src/account/model/account';
import { AccountService } from 'src/account/services/account.service';
import { Category } from 'src/category/model/category';
import { CategoryService } from 'src/category/services/category.service';
import { Contractor } from 'src/contractor/model/contractor';
import { ContractorService } from 'src/contractor/services/contractor.service';
import { NotifyService } from 'src/notify/service/notify-service';
import { Operation, operationFormGroup } from '../model/operation';
import { OPERATION_TYPE_LOCALIZED } from '../model/operation-type';
import { OperationService } from '../services/operation.service';

@Component({
  selector: 'app-operation-editor',
  templateUrl: './operation-editor.component.html',
  styleUrls: ['./operation-editor.component.scss'],
})
export class OperationEditorComponent {
  public OPERATION_TYPE_LOCALIZED = OPERATION_TYPE_LOCALIZED;

  public formGroup: FormGroup = operationFormGroup();

  public categories$: BehaviorSubject<Category[]> = new BehaviorSubject<
    Category[]
  >([]);

  public accounts$: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>(
    []
  );

  public contractors$: BehaviorSubject<Contractor[]> = new BehaviorSubject<
    Contractor[]
  >([]);

  public getControl(fieldName: string): FormControl<any> {
    const control = this.formGroup.get(fieldName);
    return control as FormControl<any>;
  }

  public get items$(): Observable<Operation[]> {
    return this.operationService.get();
  }

  public accountDisplayFn = (data: any) => data['name'];

  public contractorDisplayFn = (data: any) => data['name'];

  public categoryDisplayFn = (data: any) => data['name'];

  public operationTypeDisplayFn = (data: any) => {
    const index = OPERATION_TYPE_LOCALIZED.findIndex(
      (item) => item.type == data
    );
    return index >= 0 ? OPERATION_TYPE_LOCALIZED[index].local : '';
  };

  constructor(
    private dialogRef: MatDialogRef<OperationEditorComponent>,
    @Inject(MAT_DIALOG_DATA) data: Operation,
    private operationService: OperationService,
    private categoryService: CategoryService,
    private accountService: AccountService,
    private contractorService: ContractorService,
    private notifyService: NotifyService
  ) {
    this.formGroup.setValue(data);
  }

  ngOnInit(): void {
    this.categoryService.get().subscribe((categories) => {
      this.categories$.next(categories);
    });

    this.accountService.get().subscribe((categories) => {
      this.accounts$.next(categories);
    });

    this.contractorService.get().subscribe((contractors) => {
      this.contractors$.next(contractors);
    });
  }

  public onCancel() {
    this.dialogRef.close(false);
  }

  public onSave() {
    const operation = this.formGroup.getRawValue();

    this.operationService.set(operation).subscribe((contractor) => {
      this.formGroup.setValue(contractor);
      this.notifyService.notify('Сохранено', 'success');
      this.dialogRef.close(true);
    });
  }

  public onOptionSelected(event: any) {
    const category = event?.option?.value?.category;
    const categoryControl = this.formGroup.get('category');

    if (category && !!categoryControl && !categoryControl?.value) {
      categoryControl.setValue(category);
    }
  }
}
