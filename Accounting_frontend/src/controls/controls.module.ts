import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { LabelComponent } from './label/label.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    TableComponent,
    LabelComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ], 
  exports: [
    TableComponent,
    LabelComponent,
    ButtonComponent
  ]
})
export class ControlsModule { }
