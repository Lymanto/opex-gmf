interface Employee {
    personalJob: string;
    personalName: string;
    personalUnit: string;
    isGmfEmployee: boolean;
    personalEmail: string;
    personalGroup: string;
    personalImage: string;
    personalTitle: string;
    personalNumber: string;
    personalSubGroup: string;
    personalSuperior: any;
  }
  
  interface RoleAssignment {
    employee: Employee;
    seniorManager: Employee;
    vicePresident: Employee;
  }
  
  interface RealizationItem {
    idRealizationItem: number;
    uniqueId: string;
    realizationId: number;
    glAccountId: number;
    amount: number;
    amountSubmission: number;
    amountHps: number | null;
    amountCorrection: number | null;
    periodStart: string;
    periodFinish: string;
    descPby: string;
    remarkPby: string;
    memo: string | null;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string | null;
  }
  
  interface FileUpload {
    idUpload: number;
    uniqueId: string;
    tableName: string;
    tableId: number;
    docCategoryId: number;
    docName: string;
    docLink: string;
    docSize: number;
    docType: string;
    department: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string | null;
  }
  
  interface RealizationDTO {
    idRealization: number;
    uniqueId: string;
    years: number;
    month: number;
    costCenterId: number;
    draftNumber: number;
    requestNumber: string;
    taReff: string | null;
    type: string;
    typeOfLetter: string;
    responsibleNopeg: string;
    titleRequest: string;
    noteRequest: string;
    status: string;
    statusId: number;
    department: string;
    personalNumber: string;
    statusToId: number;
    departmentTo: string;
    personalNumberTo: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string | null;
    contributors: any;
    roleAssignment: RoleAssignment;
    realizationItem: RealizationItem[];
    fileUploads: FileUpload[];
  }
  

  