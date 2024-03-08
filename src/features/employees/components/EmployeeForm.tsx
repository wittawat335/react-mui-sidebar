import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { messages } from "@/config/messages";
import { IEmployee } from "@/types/Employee";
import { EmployeeSchema, EmployeeValidation } from "@/lib/validation/schema";
import { Button, Grid, Stack } from "@mui/material";
import { useAppSelector } from "@/hooks/hooks";
import { selectAuth } from "@/features/auth/authSlice";
import { ActiveItems, GenderItems } from "@/data/data";
import { useGetDepartmentsQuery } from "@/features/department/services/departmentApi";
import {
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../services/employeeApi";
import {
  MuiRadioGroup,
  MuiSelectField,
  MuiTextField,
} from "@/components/shared";

interface FormProps {
  isAction: string;
  dataToEdit: IEmployee | undefined;
  onClose: () => void;
}

const EmployeeForm = ({ onClose, dataToEdit, isAction }: FormProps) => {
  const { user } = useAppSelector(selectAuth);
  const { data, isSuccess } = useGetDepartmentsQuery();
  const [addEmployee, { isSuccess: addSuccess }] = useAddEmployeeMutation();
  const [updateEmployee, { isSuccess: updateSuccess }] =
    useUpdateEmployeeMutation();

  const methods = useForm<EmployeeSchema>({
    resolver: zodResolver(EmployeeValidation),
    defaultValues: {
      id: dataToEdit?.id ? dataToEdit.id : "",
      employeeId: dataToEdit?.employeeId ? dataToEdit?.employeeId : "",
      fullName: dataToEdit?.fullName ? dataToEdit?.fullName : "",
      firstName: dataToEdit?.firstName ? dataToEdit?.firstName : "react",
      lastName: dataToEdit?.lastName ? dataToEdit?.lastName : "test-insert",
      email: dataToEdit?.email ? dataToEdit?.email : "react@example.com",
      phoneNumber: dataToEdit?.phoneNumber
        ? dataToEdit?.phoneNumber
        : "0933262899",
      departmentId: dataToEdit?.departmentId ? dataToEdit?.departmentId : "",
      //createdBy: dataToEdit?.createdBy ? dataToEdit?.createdBy : user?.username,
      //modifiedBy: dataToEdit?.modifiedBy
      //  ? dataToEdit?.modifiedBy
      // : user?.username,
      gender: dataToEdit?.gender ? dataToEdit?.gender : "M",
      active: dataToEdit?.active ? dataToEdit?.active : "1",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const submit = async (request: EmployeeSchema) => {
    try {
      isAction == "New"
        ? await addEmployee(request)
        : await updateEmployee(request);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (addSuccess) {
      toast.success(messages.add_success);
      onClose();
    }
  }, [addSuccess]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success(messages.update_success);
      onClose();
    }
  }, [updateSuccess]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container>
        {" "}
        <Grid item xs={12} sm={12} md={6}>
          <Stack spacing={2} margin={2}>
            <MuiTextField
              name={"firstName"}
              label={"First Name"}
              control={control}
              isAction={isAction}
            />
            <MuiTextField
              name={"lastName"}
              label={"Last Name"}
              control={control}
              isAction={isAction}
            />
            <MuiTextField
              name={"email"}
              label={"E-mail"}
              control={control}
              isAction={isAction}
            />
            <MuiTextField
              name={"phoneNumber"}
              label={"Phone Number"}
              control={control}
              isAction={isAction}
            />
            {isSuccess ? (
              <MuiSelectField
                name="departmentId"
                label="Department"
                isAction={isAction}
                control={control}
                options={data}
                optionLabel="departmentName"
              />
            ) : null}

            <MuiRadioGroup
              label={"Gender"}
              name="gender"
              options={GenderItems}
              control={control}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Stack spacing={2} margin={2}>
            <MuiTextField
              name={"createdBy"}
              label={"Created By"}
              control={control}
              isAction={isAction}
            />
            <MuiTextField
              name="createdOn"
              label="Created Date"
              control={control}
              isAction={isAction}
            />
            <MuiTextField
              name={"modifiedBy"}
              label={"Modified By"}
              control={control}
              isAction={isAction}
            />
            <MuiTextField
              name="modifiedOn"
              label="Modified Date"
              control={control}
              isAction={isAction}
            />

            <MuiRadioGroup
              label={"Active"}
              name="active"
              options={ActiveItems}
              control={control}
            />
            {isAction != "View" ? (
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Save
              </Button>
            ) : null}
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};
export default EmployeeForm;
