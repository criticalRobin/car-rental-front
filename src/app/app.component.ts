import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseLayoutComponent } from './core/layout/components/base-layout/base-layout.component';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BaseLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly authSrv: AuthService = inject(AuthService);

  protected isLogged: boolean = false;

  ngOnInit(): void {
    this.authSrv.loggedInUser$.subscribe((user) => {
      this.isLogged = !!user && !!user.token;
    });
  }
}
