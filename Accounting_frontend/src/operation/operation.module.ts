import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationListComponent } from './operation-list/operation-list.component';
import { OperationEditorComponent } from './operation-editor/operation-editor.component';
import { ControlsModule } from 'src/controls/controls.module';
import { DialogModule } from 'src/dialog/dialog.module';

@NgModule({
  declarations: [OperationListComponent, OperationEditorComponent],
  imports: [CommonModule, ControlsModule, DialogModule],
})
export class OperationModule {}
