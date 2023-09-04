import { Injectable } from '@angular/core';
import { NotifyType } from '../model/notify-type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyComponent } from '../notify/notify.component';

const NOTIFY_DURATION_MS = 5000;

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private snackBar: MatSnackBar) {}

  public notify(message: string, type: NotifyType) {
    let classLevel: string = 'notify-success';
    switch (type) {
      case 'success':
        classLevel = 'notify-success';
        break;
      case 'inform': {
        classLevel = 'notify-info';
        break;
      }
      case 'error': {
        classLevel = 'notify-error';
        break;
      }
    }

    this.snackBar.openFromComponent(NotifyComponent, {
      duration: NOTIFY_DURATION_MS,
      data: {
        message,
        type,
      },
      panelClass: classLevel,
    });
  }
}
