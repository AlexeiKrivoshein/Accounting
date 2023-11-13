import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsModule } from 'src/controls/controls.module';
import { DialogModule } from 'src/dialog/dialog.module';
import { BalanceListComponent } from './balance-list/balance-list.component';

@NgModule({
  declarations: [
    BalanceListComponent
  ],
  imports: [
    CommonModule,
    ControlsModule,
    DialogModule
  ],
  exports: [
    BalanceListComponent
  ]
})
export class BalanceModule { }
