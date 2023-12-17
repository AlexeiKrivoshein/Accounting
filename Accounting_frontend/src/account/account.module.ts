import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountEditorComponent } from './account-editor/account-editor.component';
import { ControlsModule } from 'src/controls/controls.module';
import { DialogModule } from 'src/dialog/dialog.module';

@NgModule({
  declarations: [AccountListComponent, AccountEditorComponent],
  imports: [CommonModule, ControlsModule, DialogModule],
})
export class AccountModule {}
