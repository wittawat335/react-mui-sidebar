export interface IDepartment {
  id: string | null;
  departmentId: string | null;
  departmentName: string | null;
  active: string | null;
}
export interface IDepartmentList extends IDepartment {
  createdBy: string | null;
  createdOn: Date | null;
  modifiedBy: string | null;
  modifiedOn: Date | null;
}
