import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StateNotification } from '@shared/enums/state-notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notification: MatSnackBar = inject(MatSnackBar);

  activateNotification(
    message: string,
    state: StateNotification,
    duration: number = 5 * 1000
  ) {
    let panelClass: string;

    if (state === StateNotification.SUCCESS) {
      panelClass = 'success-noti';
    } else {
      panelClass = 'error-noti';
    }

    this.notification.open(message, undefined, {
      duration: duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }
}
