import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  console = console;
  itemsForm!: FormGroup;
  isDisplay:boolean = true
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.itemsForm = this.fb.group({
      items: new FormArray([this.createItem]),
    });
    // console.log(this.itemsForm);
  }
  addItems(): void {
    (this.itemsForm.get('items') as FormArray).push(this.createItem);
  }
  get formControllers() {
    return this.itemsForm.controls;
  }
  get getItems() {
    return this.formControllers['items'] as FormArray;
  }
  get createItem(): FormGroup {
    return this.fb.group({
      budget: [new FormControl<string>('', Validators.required)],
      group: [new FormControl<string>('', Validators.required)],
      groupDetailControl: [new FormControl<string>('', Validators.required)],
      GLDetailControl: [new FormControl<string>('', Validators.required)],
      availableControl: [new FormControl<string>('', Validators.required)],
      amountSubmissionControl: [
        new FormControl<string>('', Validators.required),
      ],
    });
  }
}
