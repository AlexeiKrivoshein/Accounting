import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountEditorComponent } from './account-editor/account-editor.component';
import { ControlsModule } from 'src/controls/controls.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogModule } from 'src/dialog/dialog.module';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AccountListComponent,
    AccountEditorComponent
  ],
  imports: [
    CommonModule,
    ControlsModule,
    DialogModule,
    MatFormFieldModule,
    MatInputModule    
  ]
})
export class AccountModule { }
