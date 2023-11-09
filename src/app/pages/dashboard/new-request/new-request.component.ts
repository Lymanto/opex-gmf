import { Component, EventEmitter, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { selectType } from 'src/app/lib/types';
import { GetAllUsersService } from 'src/app/services/opex/user/get-all-users.service';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css'],
})
export class NewRequestComponent implements OnInit {
  userData: selectType[] = [];
  currentDate: string = format(new Date(), 'dd MMM yyyy');
  idNumber: string = '';
  console = console;
  constructor(private service: GetAllUsersService) {}
  ngOnInit() {
    this.service.getAllUsers().subscribe((response: any) => {
      this.refactorUser(response.body?.data);
    });
  }
  refactorUser(data: any): selectType[] {
    data.forEach((element: any) => {
      this.userData.push({
        id: element.personalNumber,
        value: element.personalName,
      });
    });
    return this.userData;
  }

  getValue(val: any): void {
    this.idNumber = val.id;
    this.console.log('val :', val);
  }
}
