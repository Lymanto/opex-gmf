import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { LocalServiceConst } from 'src/app/constanta/local-service-constanta';
import { UserDataDTO } from 'src/app/dto/user-data-dto';
import { LocalStorageService } from 'src/app/services/opex/local-storage/local-storage.service';
import { GetAllUsersService } from 'src/app/services/opex/user/get-all-users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css'],
})
export class TopnavComponent implements OnInit {
  active: boolean = false;
  userInfo: UserDataDTO = <UserDataDTO>{};
  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly GetAllUsersService: GetAllUsersService,
    private readonly localStorageService: LocalStorageService
  ) {}
  logout(): void {
    localStorage.clear();
    this.keycloakService.clearToken();
    this.keycloakService.logout();
  }
  ngOnInit(): void {
    this.getUserInfo();
  }

  async getUserInfo(): Promise<void> {
    if (!this.GetAllUsersService.getPersonalInformationFromCache()) {
      try {
        let _data = await this.GetAllUsersService.getUserInfo();
        this.userInfo = _data;
      } catch {
        Swal.fire({
          title: 'Alert!',
          html: 'failed to get user info',
          // icon: 'success',
          confirmButtonColor: '#1F569D',
        });
      }
    } else {
      let _userInfo: any = {
        ...this.localStorageService.getData(LocalServiceConst.USER_INFO),
      };
      this.userInfo = JSON.parse(_userInfo?._result);
    }
  }
}
