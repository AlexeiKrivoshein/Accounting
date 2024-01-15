import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsModule } from 'src/controls/controls.module';
import { CorrectionOperationEditorComponent } from './correction-operation-editor/correction-operation-editor.component';

@NgModule({
  declarations: [CorrectionOperationEditorComponent],
  imports: [CommonModule, ControlsModule],
  exports: [CorrectionOperationEditorComponent]
})
export class CorrectionOperationModule {}
