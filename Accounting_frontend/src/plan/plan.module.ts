import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanListComponent } from './plan-list/plan-list.component';
import { ControlsModule } from 'src/controls/controls.module';
import { PlanEditorComponent } from './plan-editor/plan-editor.component';
import { DialogModule } from 'src/dialog/dialog.module';
import { PlanSpendingEditorComponent } from './plan-spending-editor/plan-spending-editor.component';
import { PlanSavingEditorComponent } from './plan-saving-editor/plan-saving-editor.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    PlanListComponent,
    PlanEditorComponent,
    PlanSpendingEditorComponent,
    PlanSavingEditorComponent,
  ],
  imports: [CommonModule, ControlsModule, DialogModule, MatTabsModule],
})
export class PlanModule {}
