import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsModule } from 'src/controls/controls.module';
import { DialogModule } from 'src/dialog/dialog.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CorrectionOperationModule } from 'src/operation/correction-operation/correction-operation.module';
import { TransferOperationModule } from 'src/operation/transfer-operation/transfer-operation.module';
import { ContractorOperationModule } from 'src/operation/contractor-operation/contractor-operation.module';
import { OperationEditorDialogComponent } from './operation-editor-dialog/operation-editor-dialog.component';
import { OperationListComponent } from './operation-list/operation-list.component';
import { CashOperationModule } from './cash-operation/cash-operation.module';

@NgModule({
  declarations: [
    OperationListComponent,
    OperationEditorDialogComponent,
  ],
  imports: [
    CommonModule,
    ControlsModule,
    DialogModule,
    MatMenuModule,
    MatIconModule,
    ContractorOperationModule,
    CorrectionOperationModule,
    TransferOperationModule,
    CashOperationModule
  ],
})
export class OperationModule {}
