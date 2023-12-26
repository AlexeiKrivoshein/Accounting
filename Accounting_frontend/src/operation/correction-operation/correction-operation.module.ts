import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsModule } from 'src/controls/controls.module';
import { DialogModule } from 'src/dialog/dialog.module';
import { CorrectionEditorComponent } from './correction-operation-editor/correction-editor.component';

@NgModule({
  declarations: [CorrectionEditorComponent],
  imports: [CommonModule, DialogModule, ControlsModule],
})
export class CorrectionOperationModule {}
