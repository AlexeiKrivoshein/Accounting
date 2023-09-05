import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryEditorComponent } from './category-editor/category-editor.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ControlsModule } from 'src/controls/controls.module';
import { DialogModule } from 'src/dialog/dialog.module';

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryEditorComponent
  ],
  imports: [
    CommonModule,
    ControlsModule,
    DialogModule
  ]
})
export class CategoryModule { }
