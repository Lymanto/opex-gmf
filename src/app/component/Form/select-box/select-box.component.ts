import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, tap } from 'rxjs/operators';
import { NgFor, AsyncPipe, NgIf } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { selectType } from 'src/app/lib/types';

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
  @Input() data!: any;
  @Input() displayWith!: any;
  @Input() required: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() value: string = '';
  @Output() selectedValue: EventEmitter<string> = new EventEmitter<string>();
  console = console;
  control = new FormControl('');

  filteredDatas: Observable<selectType[]> | undefined;

  ngOnInit() {
    this.filteredDatas = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): selectType[] {
    const filterValue = this._normalizeValue(value);
    return this.data.filter((items: any) =>
      this._normalizeValue(items.value).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  getValue(val: string): void {
    this.selectedValue.emit(val);
  }
}
