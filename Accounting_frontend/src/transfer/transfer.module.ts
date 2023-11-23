import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferEditorComponent } from './transfer-editor/transfer-editor.component';
import { ControlsModule } from 'src/controls/controls.module';
import { DialogModule } from 'src/dialog/dialog.module';

@NgModule({
  declarations: [TransferEditorComponent],
  imports: [CommonModule, DialogModule, ControlsModule],
})
export class TransferModule {}
