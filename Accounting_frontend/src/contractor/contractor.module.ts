import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractorEditorComponent } from './contractor-editor/contractor-editor.component';
import { ContractorListComponent } from './contractor-list/contractor-list.component';
import { ControlsModule } from 'src/controls/controls.module';
import { DialogModule } from 'src/dialog/dialog.module';

@NgModule({
  declarations: [ContractorEditorComponent, ContractorListComponent],
  imports: [CommonModule, ControlsModule, DialogModule],
})
export class ContractorModule {}
