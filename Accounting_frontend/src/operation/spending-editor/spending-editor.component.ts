import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account } from 'src/account/model/account';
import { AccountService } from 'src/account/services/account.service';
import { Category } from 'src/category/model/category';
import { CategoryService } from 'src/category/services/category.service';
import { Contractor } from 'src/contractor/model/contractor';
import { ContractorService } from 'src/contractor/services/contractor.service';
import { ContractorOperation, operationFormGroup } from '../contractor-operation/model/contractor-operation';
import { OperationType, operationTypeDisplayFn } from '../model/operation-type';
import { ContractorOperationService } from '../contractor-operation/services/contractor-operation.service';

@Component({
  selector: 'app-spending-editor',
  templateUrl: './spending-editor.component.html',
  styleUrls: ['./spending-editor.component.scss'],
})
export class SpendingEditorComponent implements OnInit {
  public operationTypes = Object.values(OperationType).filter(
    (value) => !isNaN(Number(value))
  );
  public operationTypeDisplayFn = operationTypeDisplayFn;

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

  public get items$(): Observable<ContractorOperation[]> {
    return this.operationService.get();
  }

  public accountDisplayFn = (data: any) => (data ? data['name'] : '');

  public contractorDisplayFn = (data: any) => (data ? data['name'] : '');

  public categoryDisplayFn = (data: any) => (data ? data['name'] : '');

  @Input()
  public set spending(value: any) {
    this.formGroup.setValue(value);
  }

  constructor(
    private operationService: ContractorOperationService,
    private categoryService: CategoryService,
    private accountService: AccountService,
    private contractorService: ContractorService
  ) {}

  ngOnInit(): void {
    this.categoryService.get().subscribe((categories) => {
      this.categories$.next(categories);
    });

    this.accountService.get().subscribe((accounts) => {
      this.accounts$.next(accounts);
    });

    this.contractorService.get().subscribe((contractors) => {
      this.contractors$.next(contractors);
    });
  }

  public onContractorSelected(event: any) {
    const category = event?.option?.value?.category;
    const categoryControl = this.formGroup.get('category');

    if (
      category != undefined &&
      category != null &&
      !!categoryControl &&
      !categoryControl?.touched
    ) {
      categoryControl.setValue(category);
    }

    const operationType = event?.option?.value?.operationType;
    const operationTypeControl = this.formGroup.get('operationType');

    if (
      operationType != undefined &&
      operationType != null &&
      !!operationTypeControl &&
      !operationTypeControl?.touched
    ) {
      operationTypeControl.setValue(operationType);
    }
  }
}
