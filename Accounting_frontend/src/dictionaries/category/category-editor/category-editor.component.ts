import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifyService } from 'src/notify/service/notify-service';
import { Category, categoryFormGroup } from '../model/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss']
})
export class CategoryEditorComponent {
  public formGroup: FormGroup = categoryFormGroup();

  public getControl(fieldName: string): FormControl<any> {
    const control = this.formGroup.get(fieldName);
    return control as FormControl<any>;
  }

  constructor(
    private dialogRef: MatDialogRef<CategoryEditorComponent>,
    @Inject(MAT_DIALOG_DATA) data: Category,
    private categoryService: CategoryService,
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
    const category = this.formGroup.getRawValue()
    this.categoryService.set(category).subscribe(category => {
      this.formGroup.setValue(category);
      this.notifyService.notify('Сохранено', 'success')
      this.dialogRef.close(true);
    })
  }
}
