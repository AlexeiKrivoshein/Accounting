import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementListComponent } from './movement-list/movement-list.component';
import { ControlsModule } from 'src/controls/controls.module';
import { DialogModule } from 'src/dialog/dialog.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { OperationModule } from 'src/operation/operation.module';
import { CorrectionModule } from 'src/correction/correction.module';
import { TransferModule } from 'src/transfer/transfer.module';

@NgModule({
  declarations: [
    MovementListComponent,
  ],
  imports: [
    CommonModule,
    ControlsModule,
    DialogModule,
    MatMenuModule,
    MatIconModule,
    OperationModule,
    CorrectionModule,
    TransferModule
  ],
})
export class MovementModule {}
