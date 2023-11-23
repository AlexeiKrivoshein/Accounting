import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportComponent } from './import/import.component';
import { OperationModule } from 'src/operation/operation.module';
import { TransferModule } from 'src/transfer/transfer.module';
import { CorrectionModule } from 'src/correction/correction.module';
import { ControlsModule } from 'src/controls/controls.module';
import { DialogModule } from 'src/dialog/dialog.module';

@NgModule({
  declarations: [ImportComponent],
  imports: [CommonModule, DialogModule, ControlsModule, OperationModule, TransferModule, CorrectionModule],
  exports: [ImportComponent],
})
export class ImportModule {}
