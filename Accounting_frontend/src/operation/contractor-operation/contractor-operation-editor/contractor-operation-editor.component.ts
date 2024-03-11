import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Account } from 'src/dictionaries/account/model/account';
import { AccountService } from 'src/dictionaries/account/services/account.service';
import { Category } from 'src/dictionaries/category/model/category';
import { CategoryService } from 'src/dictionaries/category/services/category.service';
import { Contractor } from 'src/dictionaries/contractor/model/contractor';
import { ContractorService } from 'src/dictionaries/contractor/services/contractor.service';
import {
  OperationType,
  operationTypeDisplayFn,
} from '../../model/operation-type';
import { OperationService } from 'src/operation/operation-editor-dialog/service/operation.service';

@Component({
  selector: 'app-contractor-operation-editor',
  templateUrl: './contractor-operation-editor.component.html',
  styleUrls: ['./contractor-operation-editor.component.scss'],
})
export class ContractorOperationEditorComponent implements OnInit {
  public operationTypes = Object.values(OperationType).filter(
    (value) => !isNaN(Number(value))
  );
  public operationTypeDisplayFn = operationTypeDisplayFn;

  public categories$: BehaviorSubject<Category[]> = new BehaviorSubject<
    Category[]
  >([]);

  public categoryDisplayFn = (data: any) => (data ? data['name'] : '');

  public accounts$: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>(
    []
  );

  public accountDisplayFn = (data: any) => (data ? data['name'] : '');

  public contractors$: BehaviorSubject<Contractor[]> = new BehaviorSubject<
    Contractor[]
  >([]);

  public contractorDisplayFn = (data: any) => (data ? data['name'] : '');

  public getControl(fieldName: string): FormControl<any> {
    const control = this._formGroup.get(fieldName);
    return control as FormControl<any>;
  }

  private get _formGroup() {
    return this._operationService.contractorOperationDM.formGroup;
  }

  constructor(
    private _categoryService: CategoryService,
    private _accountService: AccountService,
    private _contractorService: ContractorService,
    private _operationService: OperationService
  ) {}

  ngOnInit(): void {
    this._categoryService.get().subscribe((categories) => {
      this.categories$.next(categories);
    });

    this._accountService.get().subscribe((accounts) => {
      this.accounts$.next(accounts);
    });

    this._contractorService.get().subscribe((contractors) => {
      this.contractors$.next(contractors);
    });
  }

  public onContractorSelected(value: any) {
    const category = value?.category;
    const categoryControl = this._formGroup.get('category');

    if (
      category != undefined &&
      category != null &&
      !!categoryControl &&
      !categoryControl?.touched
    ) {
      categoryControl.setValue(category);
    }

    const operationType = value?.operationType;
    const operationTypeControl = this._formGroup.get('operationType');

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
