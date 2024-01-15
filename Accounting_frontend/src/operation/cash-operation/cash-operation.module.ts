import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashOperationEditorComponent } from './cash-operation-editor/cash-operation-editor.component';
import { ControlsModule } from 'src/controls/controls.module';

@NgModule({
  declarations: [CashOperationEditorComponent],
  imports: [CommonModule, ControlsModule],
  exports: [CashOperationEditorComponent],
})
export class CashOperationModule {}
