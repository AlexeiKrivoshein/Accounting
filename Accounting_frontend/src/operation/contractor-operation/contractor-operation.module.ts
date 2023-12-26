import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractorOperationEditorComponent } from './contractor-operation-editor/contractor-operation-editor.component';
import { ControlsModule } from 'src/controls/controls.module';
import { DialogModule } from 'src/dialog/dialog.module';

@NgModule({
  declarations: [ContractorOperationEditorComponent],
  imports: [CommonModule, DialogModule, ControlsModule],
})
export class ContractorOperationModule {}
