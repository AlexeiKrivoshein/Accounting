import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifyComponent } from './notify/notify.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    NotifyComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  exports: [
    NotifyComponent
  ]
})
export class NotifyModule { }
