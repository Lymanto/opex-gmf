import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, tap } from 'rxjs/operators';
import { NgFor, AsyncPipe, NgIf } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
  @Input() data!: string[];
  @Input() displayWith!: any;
  @Input() required: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() value: string = '';
  console = console;
  control = new FormControl('');

  filteredDatas: Observable<string[]> | undefined;

  ngOnInit() {
    this.filteredDatas = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
      tap(() => this.control.setValue(this.displayWith))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.data.filter((items) =>
      this._normalizeValue(items).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
