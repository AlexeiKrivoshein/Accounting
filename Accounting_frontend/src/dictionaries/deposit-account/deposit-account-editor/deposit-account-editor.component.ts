import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Category} from "../../category/model/category";
import {FormControl, FormGroup} from "@angular/forms";
import {CategoryService} from "../../category/services/category.service";
import {contractorFormGroup} from "../../contractor/model/contractor";

@Component({
  selector: 'app-deposit-account-editor',
  templateUrl: './deposit-account-editor.component.html',
  styleUrls: ['./deposit-account-editor.component.scss']
})
export class DepositAccountEditorComponent implements OnInit {
  public formGroup: FormGroup = contractorFormGroup();

  public categoryDisplayFn = (data: any) => (data ? data['name'] : '');

  public categories$: BehaviorSubject<Category[]> = new BehaviorSubject<
    Category[]
  >([]);

  public getControl(fieldName: string): FormControl<any> {
    const control = this.formGroup.get(fieldName);
    return control as FormControl<any>;
  }

  constructor(private categoryService: CategoryService,) {
  }

  ngOnInit(): void {
    this.categoryService.get().subscribe((categories) => {
      this.categories$.next(categories);
    });
  }
}
