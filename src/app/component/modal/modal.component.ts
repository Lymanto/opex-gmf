import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Flowbite } from 'src/app/lib/flowbite';
import { format } from 'date-fns';
import {
  documentCategoryType,
  newRequestType,
  selectType,
} from 'src/app/lib/types';
import { HttpClient } from '@angular/common/http';
import { DocumentCategoryService } from 'src/app/services/opex/document-category/document-category.service';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
@Flowbite()
export class ModalComponent {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() hasIcon: boolean = true;
  @Input() isHref: boolean = false;
  @Input() href: string = '';
  @Input() icon: string = '';
  @Input() type: string = '';
  @Output() uploadFileToTable: EventEmitter<newRequestType> =
    new EventEmitter<newRequestType>();
  newRequest: newRequestType = <newRequestType>{};
  selectDocumentCategoryData: selectType[] = [];
  idDocCategory!: number;
  modalDocumentType: any;
  yearsSelected!: number;
  console = console;

  currentYear: string = format(new Date(), 'yyyy');
  yearsData: selectType[] = [
    {
      id: (parseInt(this.currentYear) + 1).toString(),
      value: (parseInt(this.currentYear) + 1).toString(),
    },
    {
      id: this.currentYear,
      value: this.currentYear,
    },
  ];

  uploadToTable() {
    this.uploadFileToTable.emit(this.newRequest);
  }

  generateYears(): void {
    for (let i = 1; i <= 10; i++) {
      this.yearsData.push({
        id: (parseInt(this.currentYear) - i).toString(),
        value: (parseInt(this.currentYear) - i).toString(),
      });
    }
  }
  getValueSelectBox(val: any): void {
    this.yearsSelected = parseInt(val.id);
  }

  uploadedFile: File | null = null;

  uploadFile(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.uploadedFile = fileInput.files[0];
    }
    if (this.uploadedFile) {
      const file = new FormData();

      file.append('file', this.uploadedFile);

      this.newRequest.file = file;
    } else {
      console.warn('No file selected.');
    }
  }
  fileSize: number = 0; // Initialize with the actual file size

  onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      if (file.size <= 1048576) {
        // 1 MB limit
        this.uploadedFile = file;
      } else {
        alert(
          'File size exceeds the maximum limit of 1 MB. Please choose a smaller file.'
        );
        // Optionally, you can reset the file input
        fileInput.value = '';
      }
    }
  }

  getFileSize(): string {
    if (this.uploadedFile) {
      const bytes = this.uploadedFile.size;
      const maxSize = 1048576; // 1 MB limit
      if (bytes > maxSize) {
        return 'File size exceeds the maximum limit of 1 MB';
      } else {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
      }
    } else {
      return 'Unknown size';
    }
  }

  constructor(private service: DocumentCategoryService) {}

  private readonly _onDestroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.generateYears();
    this.fetchDocumentCategory();
  }
  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  fetchDocumentCategory(): void {
    this.service
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
  getValue(val: any): void {
    this.idDocCategory = val.id;
    this.console.log('val :', val);
  }
}
