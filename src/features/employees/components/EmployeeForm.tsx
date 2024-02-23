import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { messages } from "@/config/messages";
import { IEmployee } from "@/types/Employee";
import { EmployeeSchema, EmployeeValidation } from "@/lib/validation/schema";
import {
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../services/employeeApi";
import { Button, Grid, Stack } from "@mui/material";
import {
  FormInputRadio,
  FormInputText,
  FormInputDate,
  FormInputDropdown,
} from "@/components/shared/form";
import { useAppSelector } from "@/hooks/hooks";
import { selectAuth } from "@/features/auth/authSlice";

interface FormProps {
  isAction: string;
  dataToEdit: IEmployee | undefined;
  onClose: () => void;
}

const Items = [
  { label: "IT", value: "IT" },
  { label: "female", value: "Female" },
  { label: "other", value: "Other" },
];

const GenderItems = [
  { id: "1", label: "Male", value: "M" },
  { id: "2", label: "Female", value: "F" },
];

const ActiveItems = [
  { id: "1", label: "Yes", value: "1" },
  { id: "2", label: "No", value: "0" },
];

const EmployeeForm = ({ onClose, dataToEdit, isAction }: FormProps) => {
  const { user } = useAppSelector(selectAuth);
  const [addEmployee, { isSuccess: addSuccess }] = useAddEmployeeMutation();
  const [updateEmployee, { isSuccess: updateSuccess }] =
    useUpdateEmployeeMutation();

  const methods = useForm<EmployeeSchema>({
    resolver: zodResolver(EmployeeValidation),
    defaultValues: {
      id: dataToEdit?.id ? dataToEdit.id : "",
      employeeId: dataToEdit?.employeeId ? dataToEdit?.employeeId : 0,
      fullName: dataToEdit?.fullName ? dataToEdit?.fullName : "",
      firstName: dataToEdit?.firstName ? dataToEdit?.firstName : "react",
      lastName: dataToEdit?.lastName ? dataToEdit?.lastName : "test-insert",
      email: dataToEdit?.email ? dataToEdit?.email : "react@example.com",
      phoneNumber: dataToEdit?.phoneNumber
        ? dataToEdit?.phoneNumber
        : "0933262899",
      department: dataToEdit?.department ? dataToEdit?.department : "",
      createdBy: dataToEdit?.createdBy ? dataToEdit?.createdBy : user?.username,
      //createdOn: dataToEdit?.createdOn ? dataToEdit?.createdOn : new Date(),
      modifiedBy: dataToEdit?.modifiedBy
        ? dataToEdit?.modifiedBy
        : user?.username,
      //modifiedOn: dataToEdit?.modifiedOn ? dataToEdit?.modifiedOn : new Date(),
      gender: dataToEdit?.gender ? dataToEdit?.gender : "M",
      active: dataToEdit?.active ? dataToEdit?.active : "1",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
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

  const isOnSubmit = useCallback((values: EmployeeSchema) => {
    window.alert(JSON.stringify(values, null, 4));
  }, []);

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
    <form onSubmit={handleSubmit(isOnSubmit)}>
      <Grid container>
        {" "}
        <Grid item xs={12} sm={12} md={6}>
          <Stack spacing={2} margin={2}>
            <FormInputText
              name={"firstName"}
              label={"First Name"}
              control={control}
              isAction={isAction}
            />
            <FormInputText
              name={"lastName"}
              label={"Last Name"}
              control={control}
              isAction={isAction}
            />
            <FormInputText
              name={"email"}
              label={"E-mail"}
              control={control}
              isAction={isAction}
            />
            <FormInputText
              name={"phoneNumber"}
              label={"Phone Number"}
              control={control}
              isAction={isAction}
            />
            <FormInputDropdown
              name="department"
              label="Department"
              isAction={isAction}
              control={control}
              options={Items}
            />
            <FormInputRadio
              label={"Gender"}
              name="gender"
              options={GenderItems}
              control={control}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Stack spacing={2} margin={2}>
            {/* <FormInputDate
              name="dateOfBirth"
              label="Hire Date"
              control={control}
            /> */}
            <FormInputText
              name={"createdBy"}
              label={"Created By"}
              control={control}
              isAction={isAction}
            />
            <FormInputDate
              name="createdOn"
              label="Created Date"
              control={control}
            />
            <FormInputText
              name={"modifiedBy"}
              label={"Modified By"}
              control={control}
              isAction={isAction}
            />
            <FormInputDate
              name="modifiedOn"
              label="Modified Date"
              control={control}
            />

            <FormInputRadio
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
