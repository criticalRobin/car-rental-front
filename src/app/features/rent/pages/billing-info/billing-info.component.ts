import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BillingInfoTableComponent } from './components/billing-info-table/billing-info-table.component';
import { IBillingInfo } from './models/billing-info';
import { ICatalogVehicle } from '@features/catalog/models/catalog-vehicle.interface';
import { BillingInfoService } from './services/billing-info.service';
import { ILoginResponse } from '@core/auth/pages/login/models/login.interface';
import { NotificationService } from '@shared/services/notification.service';
import { StateNotification } from '@shared/enums/state-notification';

@Component({
  selector: 'app-billing-info',
  standalone: true,
  imports: [BillingInfoTableComponent],
  templateUrl: './billing-info.component.html',
  styleUrl: './billing-info.component.css',
})
export class BillingInfoComponent {
  private readonly router: Router = inject(Router);
  private readonly billingInfoSrv: BillingInfoService =
    inject(BillingInfoService);
  private readonly notificationSrv: NotificationService =
    inject(NotificationService);

  protected vehicle: ICatalogVehicle | null = null;
  protected billingInfo: IBillingInfo[] = [];

  constructor() {
    this.vehicle =
      this.router.getCurrentNavigation()?.extras.state?.['vehicle'];
    this.loadBillingInfo();
  }

  loadBillingInfo() {
    const { email }: ILoginResponse = JSON.parse(
      localStorage.getItem('loggedUser')!
    );

    this.billingInfoSrv.getBillingInfo(email).subscribe({
      next: (billingInfo: IBillingInfo[]) => {
        this.billingInfo = billingInfo;
      },
      error: () => {
        this.notificationSrv.activateNotification(
          'Error al cargar la información de facturación',
          StateNotification.ERROR
        );
      },
    });
  }
}
