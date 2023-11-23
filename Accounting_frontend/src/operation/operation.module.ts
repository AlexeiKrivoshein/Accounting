import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationEditorComponent } from './operation-editor/operation-editor.component';
import { ControlsModule } from 'src/controls/controls.module';
import { DialogModule } from 'src/dialog/dialog.module';

@NgModule({
  declarations: [OperationEditorComponent],
  imports: [CommonModule, DialogModule, ControlsModule],
})
export class OperationModule {}
