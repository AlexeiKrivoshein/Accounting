import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountEditorComponent } from './account-editor/account-editor.component';
import { ControlsModule } from 'src/controls/controls.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AccountListComponent,
    AccountEditorComponent
  ],
  imports: [
    CommonModule,
    ControlsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class AccountModule { }
