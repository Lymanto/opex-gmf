import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { NgFor, AsyncPipe, NgIf } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
export interface statusList {
  id: number;
  value: string;
}
export const statusList: statusList[] = [
  {
    id: 1,
    value: 'Open',
  },
  {
    id: 2,
    value: 'Progress',
  },
  {
    id: 3,
    value: 'Closed',
  },
  {
    id: 4,
    value: 'Reject',
  },
  {
    id: 5,
    value: 'Revise',
  },
];
export interface submissionList {
  id: number;
  value: string;
}
export const submissionList: submissionList[] = [
  {
    id: 1,
    value: 'Uang Muka',
  },
  {
    id: 2,
    value: 'Pengadaan',
  },
  {
    id: 3,
    value: 'Quality',
  },
  {
    id: 4,
    value: 'Facility',
  },
  {
    id: 5,
    value: 'ICT',
  },
  {
    id: 6,
    value: 'Entertainment',
  },
  {
    id: 7,
    value: 'Reimbursement',
  },
];
@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    AsyncPipe,
  ],
})
export class SelectBoxComponent implements OnInit {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() type: string = '';
  @Input() required: boolean = false;
  statusList = statusList;
  submissionList = submissionList;
  control = new FormControl('');
  streets: string[] = [
    'Champs-Élysées',
    'Lombard Street',
    'Abbey Road',
    'Fifth Avenue',
  ];
  filteredStreets: Observable<string[]> | undefined;

  ngOnInit() {
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter((street) =>
      this._normalizeValue(street).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
