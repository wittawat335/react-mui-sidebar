export interface IEmployee {
  id: string | null;
  employeeId: number | null;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  //dateOfBirth: Date | null;
  gender: string;
  //address: string;
  department: string;
  active: string | null;
  createdBy: string | null;
  createdOn: Date | null;
  modifiedBy: string | null;
  modifiedOn: Date | null;
}
