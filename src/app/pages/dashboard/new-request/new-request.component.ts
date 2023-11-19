import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { format } from 'date-fns';
import { EMPTY, Subject, catchError, of, takeUntil, tap } from 'rxjs';
import { HttpResult } from 'src/app/dto/http-result.dto';
import {
  CostCenterType,
  CreateRequestRealizationType,
  RealizationItemsType,
  documentCategoryType,
  glAccountType,
  newRequestUploadType,
  selectType,
} from 'src/app/lib/types';
import { CostCenterService } from 'src/app/services/opex/cost-center/cost-center.service';
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
  requestBody: newRequestUploadType[] = [];
  files: File[] = [];
  docCategories: string[] = [];
  docNames: string[] = [];
  createRequest: CreateRequestRealizationType = <
    CreateRequestRealizationType
  >{};
  currentDate: string = format(new Date(), 'dd MMM yyyy');
  idResponsibleNumber: string = '';
  idTypeSubmission: string = '';
  titleRequest: string = '';
  noteRequest: string = '';
  console = console;

  itemsForm!: FormGroup;
  isDisplay: boolean = true;

  currentKurs!: number;

  selectGroupData: selectType[] = [];
  available: number = 1500; //usd
  dataGL!: glAccountType[];

  costCenterData: CostCenterType | null = <CostCenterType>{};
  newRequestData: newRequestUploadType = <newRequestUploadType>{};
  selectDocumentCategoryData: selectType[] = [];
  idDocCategory!: string;
  modalDocumentType!: string;
  docName: string = '';
  fileSize: string = ''; // Initialize with the actual file size
  uploadedFile: File | null = null;
  isUploadSuccess: boolean = false;
  isUploadError: boolean = false;
  uploadError: string = '';
  specificUser: any;
  personalUnit!: string;
  selectedGroupData: any[] = [];
  constructor(
    private costCenter: CostCenterService,
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
    this.getSpecificUser(582127);
    this.getCurrentKurs();
    this.fetchGlAccount();
    this.fetchDocumentCategory();

    this.itemsForm = this.fb.group({
      items: new FormArray([this.createItem]),
    });
  }
  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
  generateDinas(dinas: string): void {
    this.personalUnit = dinas.slice(0, 3);
    this.getCostCenter(this.personalUnit);
  }
  getSpecificUser(id: number): void {
    this.users
      .getSpecificUsers(id)
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result: any) => {
          if (result) {
            // Ensure result.data is a single array of glAccountType objects
            this.specificUser = result.body;
            this.generateDinas(this.specificUser?.personalUnit);
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  getCostCenter(bidang: string): void {
    this.costCenter
      .getCostCenterByBidang(bidang)
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result) => {
          if (result) {
            this.costCenterData = result.data[0] as unknown as CostCenterType;
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  getValueTypeSubmission(val: any): void {
    this.idTypeSubmission = val.id;
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
    this.idResponsibleNumber = val.id;
  }

  addItems(): void {
    const currentGl =
      this.getItems.controls[this.getItems.controls.length - 1].get(
        'GLNumberControl'
      )?.value;
    if (currentGl != '') {
      this.selectedGroupData.push(currentGl);
      this.selectGroupData = this.selectGroupData.filter((item) => {
        return !this.selectedGroupData.includes(item.id);
      });
      this.console.log(this.selectedGroupData);
      (this.itemsForm.get('items') as FormArray).push(this.createItem);
    }
  }

  removeItem(index: number): void {
    const itemsArray = this.itemsForm.get('items') as FormArray;
    if (itemsArray.length > 1) {
      itemsArray.removeAt(index);
    }
    this.console.log('delete', this.selectedGroupData);
    const currentGl = this.selectedGroupData[index];
    this.selectedGroupData.splice(index, 1);
    const currentData = this.dataGL.filter((item) => {
      return item.glAccount == currentGl;
    });
    this.selectGroupData.push({
      id: currentData[0].glAccount,
      value: currentData[0].description,
    });
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
      periodStartControl: new FormControl<string>(
        new Date().toISOString().substr(0, 10)
      ),
      periodFinishControl: new FormControl<string>(
        new Date().toISOString().substr(0, 10)
      ),
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
  refactorItemsData(data: any): RealizationItemsType[] {
    const items: RealizationItemsType[] = [];
    data.forEach((element: any) => {
      items.push({
        amountSubmission: element.amountSubmissionControl,
        periodStart: new Date(element.periodStartControl),
        periodFinish: new Date(element.periodFinishControl),
        descPby: element.descriptionControl,
        remarkPby: element.remarkControl,
        glAccountId: element.GLNumberControl,
      });
    });
    return items;
  }
  save(): void {
    this.createRequest.type = this.idTypeSubmission;
    this.createRequest.responsibleNopeg = this
      .idResponsibleNumber as unknown as number;
    this.createRequest.personalNumber = this.specificUser?.personalNumber;
    this.createRequest.costCenterId = 1;
    this.createRequest.createdBy = this.specificUser?.personalNumber;
    this.createRequest.realizationItems = this.refactorItemsData(
      this.itemsForm.value.items
    );
    this.createRequest.titleRequest = this.titleRequest;
    this.createRequest.noteRequest = this.noteRequest;
    this.createRequest.uploadfile = this.files;
    this.createRequest.docCategoryId = this.docCategories;
    this.createRequest.docName = this.docNames;
    const formdata = this.convertToFormData(this.createRequest);
    formdata.forEach((value, key) => {
      console.log(key + ' ' + value);
    });
    this.newRequest
      .postCreateRequestRealization(formdata)
      .pipe(
        catchError((error: any) => {
          this.console.error('There was an error!', error);

          return of();
        })
      )
      .subscribe(
        (data: any) => {
          this.console.log('Success', data);
        },
        (error: any) => {
          this.console.error('Error', error);
        }
      );
  }
  convertToFormData(data: any): FormData {
    const formData = new FormData();
    formData.append('type', data.type);
    formData.append('responsibleNopeg', data.responsibleNopeg);
    formData.append('personalNumber', data.personalNumber);
    formData.append('costCenterId', data.costCenterId);
    formData.append('createdBy', data.createdBy);
    formData.append('realizationItems', JSON.stringify(data.realizationItems));
    formData.append('titleRequest', data.titleRequest);
    formData.append('noteRequest', data.noteRequest);
    formData.append('uploadfile', data.uploadfile);
    formData.append('docCategoryId', data.docCategoryId);
    formData.append('docName', data.docName);
    return formData;
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
        this.files.push(this.uploadedFile);
        this.docNames.push(this.docName);
        this.docCategories.push(this.idDocCategory);
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
    this.newRequestData = <newRequestUploadType>{};
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
  getTitleRequest(val: string): void {
    this.titleRequest = val;
  }
  getNoteRequest(val: string): void {
    this.noteRequest = val;
  }
}
