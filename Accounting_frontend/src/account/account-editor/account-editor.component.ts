import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account, accountDefault, accountFormGroup } from '../model/account';

@Component({
  selector: 'app-account-editor',
  templateUrl: './account-editor.component.html',
  styleUrls: ['./account-editor.component.scss']
})
export class AccountEditorComponent implements OnInit {
  public formGroup: FormGroup = accountFormGroup();

  public getControl(fieldName: string): FormControl<any> {
    return this.formGroup.get(fieldName) as FormControl<any>;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: Account) {
    this.formGroup.setValue(data);
  }

  ngOnInit(): void {
    
  }
}
