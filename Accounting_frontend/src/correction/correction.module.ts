import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorrectionEditorComponent } from './correction-editor/correction-editor.component';
import { ControlsModule } from 'src/controls/controls.module';
import { DialogModule } from 'src/dialog/dialog.module';

@NgModule({
  declarations: [CorrectionEditorComponent],
  imports: [CommonModule, DialogModule, ControlsModule],
})
export class CorrectionModule {}
