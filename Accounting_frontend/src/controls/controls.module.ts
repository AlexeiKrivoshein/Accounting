import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { LabelComponent } from './label/label.component';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AutocompliteComponent } from './autocomplete/autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    TableComponent,
    LabelComponent,
    ButtonComponent,
    InputComponent,
    AutocompliteComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ], 
  exports: [
    TableComponent,
    LabelComponent,
    ButtonComponent,
    InputComponent,
    AutocompliteComponent
  ]
})
export class ControlsModule { }
