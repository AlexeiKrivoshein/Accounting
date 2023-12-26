import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferOperationEditorComponent } from './transfer-operation-editor/transfer-operation-editor.component';
import { ControlsModule } from 'src/controls/controls.module';
import { DialogModule } from 'src/dialog/dialog.module';

@NgModule({
  declarations: [TransferOperationEditorComponent],
  imports: [CommonModule, DialogModule, ControlsModule],
})
export class TransferOperationModule {}
