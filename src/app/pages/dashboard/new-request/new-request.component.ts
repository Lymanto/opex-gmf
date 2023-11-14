import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { format } from 'date-fns';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import {
  documentCategoryType,
  glAccountType,
  newRequestType,
  selectType,
} from 'src/app/lib/types';
import { NewRequestService } from 'src/app/services/opex/dashboard/new-request.service';
import { DocumentCategoryService } from 'src/app/services/opex/document-category/document-category.service';
import { KursUsdService } from 'src/app/services/opex/master-data/kurs-usd.service';
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

  itemsForm!: FormGroup;
  isDisplay: boolean = true;

  currentKurs!: number;

  selectGroupData: selectType[] = [];
  available: number = 1500; //usd
  dataGL!: glAccountType[];

  newRequestData: newRequestType = <newRequestType>{};
  selectDocumentCategoryData: selectType[] = [];
  idDocCategory!: string;
  modalDocumentType!: string;
  docName: string = '';
  fileSize: string = ''; // Initialize with the actual file size
  uploadedFile: File | null = null;
  isUploadSuccess: boolean = false;
  isUploadError: boolean = false;
  uploadError: string = '';
  constructor(
    private users: GetAllUsersService,
    private fb: FormBuilder,
    private newRequest: NewRequestService,
    private kurs: KursUsdService,
    private docCategory: DocumentCategoryService
  ) {}
  private readonly _onDestroy$: Subject<void> = new Subject<void>();
  ngOnInit() {
    this.users.getAllUsers().subscribe((response: any) => {
      this.refactorUser(response.body?.data);
    });
    this.itemsForm = this.fb.group({
      items: new FormArray([this.createItem]),
    });
    this.getCurrentKurs();
    this.fetchGlAccount();
    this.fetchDocumentCategory();
  }
  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
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

  addItems(): void {
    (this.itemsForm.get('items') as FormArray).push(this.createItem);
  }

  removeItem(index: number): void {
    const itemsArray = this.itemsForm.get('items') as FormArray;
    if (itemsArray.length > 1) {
      itemsArray.removeAt(index);
    }
  }

  showDeleteButton(index: number): boolean {
    return index > 0;
  }

  get formControllers() {
    return this.itemsForm.controls;
  }
  get getItems() {
    return this.formControllers['items'] as FormArray;
  }
  get createItem(): FormGroup {
    return this.fb.group({
      GLNumberControl: new FormControl<string>(''),
      groupControl: new FormControl<string>(''),
      groupDetailControl: new FormControl<string>(''),
      availableControl: new FormControl<number>(this.available),
      amountSubmissionControl: new FormControl<string>(''),
      periodStartControl: new FormControl<Date>(new Date()),
      periodFinishControl: new FormControl<Date>(new Date()),
      descriptionControl: new FormControl<string>(''),
      remarkControl: new FormControl<string>(''),
    });
  }

  getValueGLItem(val: any, index: number): void {
    this.dataGL.filter((item) => {
      if (item.glAccount === val.id) {
        this.getItems.controls[index]
          .get('groupControl')
          ?.setValue(item.groupGl);
        this.getItems.controls[index]
          .get('groupDetailControl')
          ?.setValue(item.groupDetail);
      }
    });
    this.getItems.controls[index].get('GLNumberControl')?.setValue(val.id);
  }
  getCurrentKurs() {
    return this.kurs
      .getLastKurs()
      .pipe(
        catchError((err) => {
          console.error('Error occurred', err);
          return EMPTY;
        }),
        tap((result: { data: any }) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects
            this.currentKurs = result.data.value;
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  fetchGlAccount(): void {
    this.newRequest
      .getAllGroup()
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects
            const allData = result.data.flatMap((item) => item); // Convert array of arrays to a single array
            this.dataGL = allData;
            this.refactorSelectGroupData(allData);
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  refactorSelectGroupData(data: glAccountType[]): void {
    data.forEach((element: glAccountType) => {
      this.selectGroupData.push({
        id: element.glAccount,
        value: element.description,
      });
    });
  }

  save(): void {
    this.console.log(this.itemsForm.value);
  }

  fetchDocumentCategory(): void {
    this.docCategory
      .getAllGroup()
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects
            const allData = result.data.flatMap((item) => item); // Convert array of arrays to a single array
            this.refactorSelectDocumentCategoryData(allData);
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  refactorSelectDocumentCategoryData(data: documentCategoryType[]): void {
    data.forEach((element: documentCategoryType) => {
      this.selectDocumentCategoryData.push({
        id: element.idDocCategory,
        value: element.docCategory,
      });
    });
  }
  uploadToTable() {
    if (this.uploadedFile) {
      const bytes = this.uploadedFile.size;
      const maxSize = 1048576; // 1 MB limit
      if (bytes > maxSize) {
      } else {
        if (this.idDocCategory === '' || this.docName === '') {
          this.isUploadError = true;
          this.isUploadSuccess = false;
          this.uploadError = 'Please fill all the fields';

          return;
        }
        this.selectDocumentCategoryData.filter((item) => {
          if (item.id === this.idDocCategory) {
            this.modalDocumentType = item.value;
          }
        });
        this.newRequestData.documentName = this.docName;
        this.newRequestData.documentType = this.modalDocumentType;
        this.newRequestData.file = this.uploadedFile;
        this.newRequestData.size = this.fileSize;
        this.requestBody.push(this.newRequestData);
        this.clearUp();
      }
    } else {
      this.isUploadError = true;
      this.isUploadSuccess = false;
      this.uploadError = 'Please fill all the fields';
    }
  }
  clearUp(): void {
    this.isUploadSuccess = false;
    this.isUploadError = false;
    this.newRequestData = <newRequestType>{};
    this.idDocCategory = '';
    this.modalDocumentType = '';
    this.docName = '';
    this.uploadedFile = null;
    this.fileSize = '';
  }
  uploadFile(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.uploadedFile = fileInput.files[0];
    }
    if (this.uploadedFile) {
      const bytes = this.uploadedFile.size;
      const maxSize = 1048576; // 1 MB limit
      if (bytes > maxSize) {
        this.fileSize = 'File size exceeds the maximum limit of 1 MB';
        this.isUploadError = true;
        this.uploadError =
          'Upload error, file size exceeds the maximum limit of 1 MB';
        this.isUploadSuccess = false;
      } else {
        this.fileSize = this.generateSize(bytes);
        this.isUploadError = false;
        this.isUploadSuccess = true;
      }
    } else {
      console.warn('No file selected.');
    }
  }
  generateSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }

  getValueDocType(val: any): void {
    this.idDocCategory = val.id;
  }
  getValueDocName(val: string): void {
    this.docName = val;
  }
}
