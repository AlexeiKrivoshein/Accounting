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
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TextAreaComponent } from './textarea/textarea.component';
import { DropdownButtonComponent } from './dropdown-button/dropdown-button.component';
import { MatMenuModule } from '@angular/material/menu';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ListComponent } from './list/list-component.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    TableComponent,
    LabelComponent,
    ButtonComponent,
    InputComponent,
    AutocompliteComponent,
    DatePickerComponent,
    TextAreaComponent,
    DropdownButtonComponent,
    ToolbarComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatListModule,
    ReactiveFormsModule,
  ],
  exports: [
    TableComponent,
    LabelComponent,
    ButtonComponent,
    InputComponent,
    AutocompliteComponent,
    DatePickerComponent,
    TextAreaComponent,
    DropdownButtonComponent,
    ToolbarComponent,
    ListComponent
  ],
})
export class ControlsModule {}
