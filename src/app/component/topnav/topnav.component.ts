import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { LocalStorageService } from 'src/app/services/opex/local-storage/local-storage.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css'],
})
export class TopnavComponent {
  active: boolean = false;
  constructor(private readonly keycloakService: KeycloakService) {}
  logout(): void {
    localStorage.clear();
    this.keycloakService.logout().then(() => this.keycloakService.clearToken());
  }
}
