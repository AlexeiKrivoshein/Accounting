import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from 'src/category/model/category';
import { CategoryService } from 'src/category/services/category.service';
import { NotifyService } from 'src/notify/service/notify-service';
import { Template, templateFormGroup } from '../model/template';
import { TemplateService } from '../services/template.service';

@Component({
  selector: 'app-template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss']
})
export class TemplateEditorComponent {
  public formGroup: FormGroup = templateFormGroup();

  public categories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  public getControl(fieldName: string): FormControl<any> {
    const control = this.formGroup.get(fieldName);
    return control as FormControl<any>;
  }

  public get items$(): Observable<Category[]> {
    return this.categoryService.get();
  }

  constructor(
    private dialogRef: MatDialogRef<TemplateEditorComponent>,
    @Inject(MAT_DIALOG_DATA) data: Template,
    private templateService: TemplateService,
    private categoryService: CategoryService,
    private notifyService: NotifyService
  ) {
    this.formGroup.setValue(data);
  }

  ngOnInit(): void {
    this.categoryService.get().subscribe(categories => {
      this.categories$.next(categories);
    })
  }

  public onCancel() {
    this.dialogRef.close(false)
  }

  public onSave() {
    const template = this.formGroup.getRawValue();

    this.templateService.set(template).subscribe(template => {
      this.formGroup.setValue(template);
      this.notifyService.notify('Сохранено', 'success')
      this.dialogRef.close(true);
    })
  }
}
