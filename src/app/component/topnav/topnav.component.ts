import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  role: string = '';

  inputPersonalNumber = new FormControl<string>('');

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
    this.getRoleFromLocalStorage();
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
  getRoleFromLocalStorage() {
    const _role: any = {
      ...this.localStorageService.getData(LocalServiceConst.ROLE),
    };
    this.role = _role._result.toUpperCase();
  }

  async changeUserInfo() {
    try {
      const result = await this.GetAllUsersService.getDetailUsers(
        this.inputPersonalNumber.value as string
      );

      this.localStorageService.saveData(
        LocalServiceConst.USER_INFO,
        JSON.stringify(result)
      );

      if (
        this.userInfo?.personalUnit?.includes('TA') &&
        this.userInfo?.personalJob?.includes('VICE PRESIDENT')
      ) {
        this.role = 'VP TA';
      } else if (
        this.userInfo.personalUnit.includes('TAB') &&
        this.userInfo?.personalJob.includes('SENIOR MANAGER')
      ) {
        this.role = 'SM TAB';
      } else if (
        this.userInfo.personalUnit.includes('TAB') &&
        this.userInfo?.personalJob.includes('PROFESSIONAL')
      ) {
        this.role = 'TAB';
      } else if (
        this.userInfo.personalUnit.includes('TAM') &&
        this.userInfo?.personalJob.includes('PROFESSIONAL')
      ) {
        this.role = 'TAM';
      } else if (
        this.userInfo.personalUnit.includes('TAM') &&
        this.userInfo?.personalJob.includes('SENIOR MANAGER')
      ) {
        this.role = 'SM TAM';
      } else if (
        this.userInfo.personalUnit.includes('TAM') &&
        this.userInfo?.personalJob.includes('VICE PRESIDENT')
      ) {
        this.role = 'VP TAM';
      } else if (
        this.userInfo.personalUnit.includes('TAP') &&
        this.userInfo?.personalJob.includes('PROFESSIONAL')
      ) {
        this.role = 'TAP';
      } else if (
        this.userInfo.personalUnit.includes('TAP') &&
        this.userInfo?.personalJob.includes('SENIOR MANAGER')
      ) {
        this.role = 'SM TAP';
      } else if (
        this.userInfo.personalUnit.includes('TAP') &&
        this.userInfo?.personalJob.includes('VICE PRESIDENT')
      ) {
        this.role = 'VP TAP';
      } else if (
        this.userInfo.personalUnit.includes('TX') &&
        this.userInfo?.personalJob.includes('VICE PRESIDENT')
      ) {
        this.role = 'VP TX';
      } else if (
        this.userInfo.personalUnit.includes('TX') &&
        this.userInfo?.personalJob.includes('SENIOR MANAGER')
      ) {
        this.role = 'SM TX';
      } else if (
        this.userInfo.personalUnit.includes('TXC-3') &&
        this.userInfo?.personalJob.includes('PROFESSIONAL')
      ) {
        this.role = 'TXC-3';
      } else if (
        this.userInfo.personalUnit.includes('DF') &&
        this.userInfo?.personalJob.includes('DIRECTOR')
      ) {
        this.role = 'DF';
      } else if (
        this.userInfo.personalUnit.includes('DT') &&
        this.userInfo?.personalJob.includes('DIRECTOR')
      ) {
        this.role = 'DT';
      } else if (this.userInfo?.personalTitle?.includes('SM ')) {
        this.role = 'SM_USER';
        // console.log('push list sm', this.role);
      } else if (this.userInfo?.personalTitle?.includes('VP ')) {
        this.role = 'VP_USER';
        console.log('push list vp', this.role);
      } else if (this.userInfo?.personalTitle?.includes('MANAGER ')) {
        this.role = 'MANAGER_USER';
      } else {
        this.role = 'USER';
        // console.log('push list user', this.role)
        // console.log('NOT PUSHING user', this.role)
      }

      // this.role.sort((a, b) => {
      //   const orderA = customOrder[a] || Number.MAX_SAFE_INTEGER;
      //   const orderB = customOrder[b] || Number.MAX_SAFE_INTEGER;
      //   return orderA - orderB;
      // });
      this.localStorageService.saveData(LocalServiceConst.ROLE, this.role);

      Swal.fire({
        title: 'Success!',
        html:
          'User has changed : ' +
          this.userInfo.personalNumber +
          'with role: ' +
          this.role,
        icon: 'success',
        confirmButtonColor: '#1F569D',
      });
    } catch (error) {
      console.log('error: ', error);
      Swal.fire({
        title: 'Failed!',
        html: 'failed changed user info ',
        icon: 'error',
        confirmButtonColor: '#1F569D',
      });
    }
  }
}
