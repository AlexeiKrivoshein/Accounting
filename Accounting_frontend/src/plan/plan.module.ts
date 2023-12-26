import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanListComponent } from './plan-list/plan-list.component';
import { ControlsModule } from 'src/controls/controls.module';
import { PlanEditorComponent } from './plan-editor/plan-editor.component';
import { DialogModule } from 'src/dialog/dialog.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PlanSavingEditorComponent } from './plan-saving-editor/plan-saving-editor.component';
import { PlanSpendingEditorComponent } from './plan-spending-editor/plan-spending-editor.component';

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
