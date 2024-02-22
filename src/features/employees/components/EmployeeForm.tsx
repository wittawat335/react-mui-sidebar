import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
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

const genderItems = [
  { id: "1", label: "Active", value: "1" },
  { id: "2", label: "InActive", value: "0" },
];

const EmployeeForm = ({ onClose, dataToEdit, isAction }: FormProps) => {
  const [addEmployee, { isSuccess: addSuccess }] = useAddEmployeeMutation();
  const [updateEmployee, { isSuccess: updateSuccess }] =
    useUpdateEmployeeMutation();
  const methods = useForm<EmployeeSchema>({
    resolver: zodResolver(EmployeeValidation),
    defaultValues: {
      firstName: dataToEdit?.firstName ? dataToEdit?.firstName : "test@",
      lastName: dataToEdit?.lastName ? dataToEdit?.lastName : "test",
      email: dataToEdit?.email ? dataToEdit?.email : "test@example.com",
      phoneNumber: dataToEdit?.phoneNumber ? dataToEdit?.phoneNumber : "",
      department: dataToEdit?.department ? dataToEdit?.department : "",
      // dateOfBirth: dataToEdit?.dateOfBirth
      //   ? dataToEdit?.dateOfBirth
      //   : new Date(),
      active: dataToEdit?.active ? dataToEdit?.active : "0",
    },
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(isOnSubmit)}>
        <Grid container>
          {" "}
          <Grid item xs={12} md={6}>
            <Stack spacing={2} margin={2}>
              <FormInputText
                name={"firstName"}
                label={"First Name"}
                isAction={isAction}
              />
              <FormInputText
                name={"lastName"}
                label={"Last Name"}
                isAction={isAction}
              />
              <FormInputText
                name={"email"}
                label={"E-mail"}
                isAction={isAction}
              />
              <FormInputText
                name={"phoneNumber"}
                label={"Phone Number"}
                isAction={isAction}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={2} margin={2}>
              <FormInputDropdown
                name="department"
                label="Department"
                isAction={isAction}
                options={Items}
              />
              <FormInputDate name="dateOfBirth" label="DateOfBirth" />
              <FormInputRadio name="active" options={genderItems} />
              {isAction != "View" ? (
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              ) : null}
            </Stack>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};
export default EmployeeForm;
