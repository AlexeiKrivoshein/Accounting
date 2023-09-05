import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateEditorComponent } from './template-editor/template-editor.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { ControlsModule } from 'src/controls/controls.module';
import { DialogModule } from 'src/dialog/dialog.module';

@NgModule({
  declarations: [
    TemplateEditorComponent,
    TemplateListComponent
  ],
  imports: [
    CommonModule,
    ControlsModule,
    DialogModule
  ]
})
export class TemplateModule { }
