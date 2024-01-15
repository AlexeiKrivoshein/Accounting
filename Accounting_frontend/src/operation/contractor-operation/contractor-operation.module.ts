import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractorOperationEditorComponent } from './contractor-operation-editor/contractor-operation-editor.component';
import { ControlsModule } from 'src/controls/controls.module';

@NgModule({
  declarations: [ContractorOperationEditorComponent],
  imports: [CommonModule, ControlsModule],
  exports: [ContractorOperationEditorComponent]
})
export class ContractorOperationModule {}
