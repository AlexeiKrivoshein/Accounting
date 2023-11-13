import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from 'src/category/model/category';
import { CategoryService } from 'src/category/services/category.service';
import { NotifyService } from 'src/notify/service/notify-service';
import {
  OperationType,
  operationTypeDisplayFn,
} from 'src/operation/model/operation-type';
import { Contractor, contractorFormGroup } from '../model/contractor';
import { ContractorService } from '../services/contractor.service';

@Component({
  selector: 'app-contractor-editor',
  templateUrl: './contractor-editor.component.html',
  styleUrls: ['./contractor-editor.component.scss'],
})
export class ContractorEditorComponent {
  public operationTypes = Object.values(OperationType).filter(
    (value) => !isNaN(Number(value))
  );

  public operationTypeDisplayFn = operationTypeDisplayFn;

  public formGroup: FormGroup = contractorFormGroup();

  public categoryDisplayFn = (data: any) => (data ? data['name'] : '');

  public categories$: BehaviorSubject<Category[]> = new BehaviorSubject<
    Category[]
  >([]);

  public getControl(fieldName: string): FormControl<any> {
    const control = this.formGroup.get(fieldName);
    return control as FormControl<any>;
  }

  public get items$(): Observable<Category[]> {
    return this.categoryService.get();
  }

  constructor(
    private dialogRef: MatDialogRef<ContractorEditorComponent>,
    @Inject(MAT_DIALOG_DATA) data: Contractor,
    private contractorService: ContractorService,
    private categoryService: CategoryService,
    private notifyService: NotifyService
  ) {
    this.formGroup.setValue(data);
  }

  ngOnInit(): void {
    this.categoryService.get().subscribe((categories) => {
      this.categories$.next(categories);
    });
  }

  public onCancel() {
    this.dialogRef.close(false);
  }

  public onSave() {
    const contractor = this.formGroup.getRawValue();

    this.contractorService.set(contractor).subscribe((contractor) => {
      this.formGroup.setValue(contractor);
      this.notifyService.notify('Сохранено', 'success');
      this.dialogRef.close(true);
    });
  }
}
