export interface headerType {
  id: string;
  title: string;
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

export interface selectType {
  id: string;
  value: string;
}
