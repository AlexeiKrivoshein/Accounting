import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { LabelComponent } from './label/label.component';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TableComponent,
    LabelComponent,
    ButtonComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    ReactiveFormsModule
  ], 
  exports: [
    TableComponent,
    LabelComponent,
    ButtonComponent,
    InputComponent
  ]
})
export class ControlsModule { }
