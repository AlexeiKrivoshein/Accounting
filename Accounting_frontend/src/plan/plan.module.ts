import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanListComponent } from './plan-list/plan-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BalanceModule } from 'src/balance/balance.module';
import { ControlsModule } from 'src/controls/controls.module';

@NgModule({
  declarations: [PlanListComponent],
  imports: [CommonModule, MatTabsModule, BalanceModule, ControlsModule],
})
export class PlanModule {}
