import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementListComponent } from './movement-list/movement-list.component';
import { OperationEditorComponent } from './operation-editor/operation-editor.component';
import { ControlsModule } from 'src/controls/controls.module';
import { DialogModule } from 'src/dialog/dialog.module';
import { ImportComponent } from './import/import.component';
import { TransferEditorComponent } from './transfer-editor/transfer-editor.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    MovementListComponent,
    OperationEditorComponent,
    TransferEditorComponent,
    ImportComponent,
  ],
  imports: [CommonModule, ControlsModule, DialogModule, MatMenuModule, MatIconModule],
})
export class OperationModule {}
