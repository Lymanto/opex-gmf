export interface headerType {
  id: string;
  title: string;
}
export interface tableBodyReallocationType {
  id: string;
  documentName: string;
  docType: string;
  size: string;
  uploadBy: string;
  departmentBy: string;
  uploadDate: string;
  description: string;
}
export interface tableBodyRkapType {
  id: string;
  financialIndicators: string;
  glNumber: string;
  total: string;
  jan: string;
  feb: string;
  mar: string;
  apr: string;
  mei: string;
  jun: string;
  jul: string;
  agu: string;
  sep: string;
  okt: string;
  nov: string;
  des: string;
}
export interface tableBodyType {
  id: string;
  taReff: string;
  numberOfRequest: string;
  typeOfLetter: string;
  entryDate: string;
  amountSubmission: string;
  status: string;
  statusTo: string;
  departmentTo: string;
  description: string;
}

export interface userType {
  personalNumber: string;
  personalName: string;
  personalTitle: string;
  personalUnit: string;
  personalEmail: string;
  personalBirthPlace: string;
  personalBirthDate: string;
  personalGrade: string;
  personalImage: string | null;
  isGmfEmployee: string | null;
}

export interface modalDocumentType {
  docName: string;
  docCategory: string;
  size: string;
  file: File;
}

export interface documentCategoryType {
  idDocCategory: number;
  uniqueId: string;
  module: string;
  docCategory: string;
  description: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string | null;
}

export interface glAccountType {
  idGlAccount: number;
  uniqueId: string;
  glAccount: string;
  description: string;
  groupDetail: string;
  groupGl: string;
  sap: boolean;
  active: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string | null;
}

export interface selectType {
  id: string | number;
  value: string;
}

export interface kursType {
  idKurs?: number;
  uniqueId?: string;
  years?: number | string;
  value: number;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface CreateRequestRealizationType {
  type: string;
  responsibleNopeg: number;
  personalNumber: string;
  costCenterId: number;
  createdBy: string;
  titleRequest: string;
  noteRequest: string;
  realizationItems: RealizationItemsType[];
  uploadfile: File[];
  docCategoryId: string[];
  docName: string[];
}

export interface RealizationItemsType {
  amountSubmission: number;
  periodStart: Date;
  periodFinish: Date;
  descPby: string;
  remarkPby: string;
  glAccountId: number;
}
export interface newRequestUploadType {
  id: string;
  documentName: string;
  documentType: string;
  size: string;
  uploadBy: string;
  departmentBy: string;
  uploadDate: string;
  file: File;
}
export interface CostCenterType {
  idCostCenter: number;
  uniqueId: string;
  costCenter: string;
  description: string;
  bidang: string;
  dinas: string;
  directorat: string;
  groupDinas: string;
  profitCenter: string;
  active: true;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string | null;
}
