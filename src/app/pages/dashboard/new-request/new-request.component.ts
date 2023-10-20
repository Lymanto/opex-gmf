import { Component, EventEmitter, OnInit } from '@angular/core';
import { userType } from 'src/app/lib/types';
import { GetAllUsersService } from 'src/app/services/opex/get-all-users.service';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css'],
})
export class NewRequestComponent implements OnInit {
  userData!: any;
  idNumber: string = '';
  console = console;
  constructor(private service: GetAllUsersService) {}
  ngOnInit() {
    this.service.getAllUsers().subscribe((response) => {
      this.userData = response;
    });
  }
  getValue(val: string): void {
    this.idNumber = val;
    this.console.log('val :', val);
  }
}
