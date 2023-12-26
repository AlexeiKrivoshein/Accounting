import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/dictionaries/category/model/category';
import { CategoryService } from 'src/dictionaries/category/services/category.service';
import { PlanSpending, planSpendingFormGroup } from '../model/plan-spending';

@Component({
  selector: 'app-plan-spending-editor',
  templateUrl: './plan-spending-editor.component.html',
  styleUrls: ['./plan-spending-editor.component.scss'],
})
export class PlanSpendingEditorComponent {
  public formGroup: FormGroup = planSpendingFormGroup();

  public categories$: BehaviorSubject<Category[]> = new BehaviorSubject<
    Category[]
  >([]);

  public getControl(fieldName: string): FormControl<any> {
    const control = this.formGroup.get(fieldName);
    return control as FormControl<any>;
  }

  public categoryDisplayFn = (data: any) => (data ? data['name'] : '');

  constructor(
    private dialogRef: MatDialogRef<PlanSpendingEditorComponent>,
    @Inject(MAT_DIALOG_DATA) data: PlanSpending,
    private categoryService: CategoryService
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
    const spending = this.formGroup.getRawValue() as PlanSpending;
    spending.categoryID = spending.category?.id ?? spending.categoryID;
    this.dialogRef.close(spending);
  }
}
