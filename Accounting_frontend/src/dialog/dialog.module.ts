import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [
    DialogComponent
  ]
})
export class DialogModule { }
