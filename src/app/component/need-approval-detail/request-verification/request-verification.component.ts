import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';
import { RealizationDTO } from 'src/app/dto/request-verification.dto';
import { RequestVerificationService } from 'src/app/services/opex/need-approval/request-verification.service';

@Component({
  selector: 'app-request-verification',
  templateUrl: './request-verification.component.html',
  styleUrls: ['./request-verification.component.css'],
})
export class RequestVerificationComponent implements OnInit {
  @Input() data!: RealizationDTO;
  ngOnInit(): void {
    console.log(this.data);
  }
  formatDate(val: Date): string {
    return format(new Date(val), 'dd MMM yyyy');
  }
}
