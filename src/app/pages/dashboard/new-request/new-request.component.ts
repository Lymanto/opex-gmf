import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { newRequestType, selectType } from 'src/app/lib/types';
import { GetAllUsersService } from 'src/app/services/opex/user/get-all-users.service';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css'],
})
export class NewRequestComponent implements OnInit {
  userData: selectType[] = [];
  @Input() requestBody: newRequestType[] = [];
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
  uploadFileToTable(newRequest: newRequestType): void {
    // Handle the emitted event from the modal component
    this.requestBody.push(newRequest); // Add the new request to the table data
  }
}
