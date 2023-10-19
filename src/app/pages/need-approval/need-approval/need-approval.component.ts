import { Component } from '@angular/core';
import { tableBodyType } from 'src/app/lib/types';

@Component({
  selector: 'app-need-approval',
  templateUrl: './need-approval.component.html',
  styleUrls: ['./need-approval.component.css'],
})
export class NeedApprovalComponent {
  isFilterActive: boolean = true;
  header: string[] = [
    'No.',
    'TA Reff',
    'No. of Request',
    'Type of Letter',
    'Entry Date',
    'Amount Submission',
    'Status',
    'Status To',
    'Department To',
  ];
  tableBody: tableBodyType[] = [
    {
      id: '1',
      taReff: 'TAM/RLA.TD/08.029/2023',
      numberOfRequest: '',
      typeOfLetter: 'Realokasi Anggaran',
      entryDate: '30 Maret 2023',
      amountSubmission: '',
      status: 'Open',
      statusTo: 'TAM',
      departmentTo: 'JKTTAM',
      description: '',
    },
    {
      id: '2',
      taReff: 'TAM/RLA.TD/08.029/2023',
      numberOfRequest: '',
      typeOfLetter: 'Realokasi Anggaran',
      entryDate: '30 Maret 2023',
      amountSubmission: '',
      status: 'Revise',
      statusTo: 'TAM',
      departmentTo: 'JKTTAM',
      description: '',
    },
    {
      id: '3',
      taReff: 'TAM/RLA.TD/08.029/2023',
      numberOfRequest: '',
      typeOfLetter: 'Realokasi Anggaran',
      entryDate: '30 Maret 2023',
      amountSubmission: '',
      status: 'Progress',
      statusTo: 'TAM',
      departmentTo: 'JKTTAM',
      description: '',
    },
    {
      id: '4',
      taReff: 'TAM/RLA.TD/08.029/2023',
      numberOfRequest: '',
      typeOfLetter: 'Realokasi Anggaran',
      entryDate: '30 Maret 2023',
      amountSubmission: '',
      status: 'Reject',
      statusTo: 'TAM',
      departmentTo: 'JKTTAM',
      description: '',
    },
    {
      id: '5',
      taReff: 'TAM/RLA.TD/08.029/2023',
      numberOfRequest: '',
      typeOfLetter: 'Realokasi Anggaran',
      entryDate: '30 Maret 2023',
      amountSubmission: '',
      status: 'Closed',
      statusTo: 'TAM',
      departmentTo: 'JKTTAM',
      description: '',
    },
  ];

  ngOnInit(): void {}
}
