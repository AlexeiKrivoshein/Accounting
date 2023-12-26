import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsModule } from 'src/controls/controls.module';
import { DialogModule } from 'src/dialog/dialog.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MovementEditorComponent } from './movement-editor/movement-editor.component';
import { CorrectionOperationModule } from 'src/operation/correction-operation/correction-operation.module';
import { TransferOperationModule } from 'src/operation/transfer-operation/transfer-operation.module';
import { ContractorOperationModule } from 'src/operation/contractor-operation/contractor-operation.module';
import { MovementListComponent } from './operation-list/movement-list.component';

@NgModule({
  declarations: [
    MovementListComponent,
    MovementEditorComponent,
  ],
  imports: [
    CommonModule,
    ControlsModule,
    DialogModule,
    MatMenuModule,
    MatIconModule,
    ContractorOperationModule,
    CorrectionOperationModule,
    TransferOperationModule
  ],
})
export class OperationModule {}
