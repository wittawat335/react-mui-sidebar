import { useEffect, useState } from "react";
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
import { Button, Grid, Stack, TextField } from "@mui/material";
import InputBox from "@/components/shared/InputBox/InputBox";
import { MuiRadioGroup, MuiSelect } from "@/components/shared";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

interface FormProps {
  isAction: string;
  dataToEdit: IEmployee | undefined;
  onClose: () => void;
}

const EmployeeForm = ({ onClose, dataToEdit, isAction }: FormProps) => {
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  console.log(dateValue);
  const [addEmployee, { isSuccess: addSuccess }] = useAddEmployeeMutation();
  const [updateEmployee, { isSuccess: updateSuccess }] =
    useUpdateEmployeeMutation();

  const Items = [
    { id: "male", name: "Male" },
    { id: "female", name: "Female" },
    { id: "other", name: "Other" },
  ];

  const genderItems = [
    { id: "1", title: "Active" },
    { id: "2", title: "InActive" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeSchema>({
    resolver: zodResolver(EmployeeValidation),
    defaultValues: {},
  });

  const submit = async (request: EmployeeSchema) => {
    try {
      //await addEmployee(request);
      //   isAction == "New"
      //     ? await addEmployee(request)
      //     : await updateEmployee(request);
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
        <Grid item xs={6}>
          <Stack spacing={2} margin={2}>
            <TextField
              label="First Name"
              type="text"
              inputProps={{ readOnly: isAction == "View" ? true : false }}
              {...register("firstName", {
                required: "firstName is required",
                minLength: { value: 5, message: "min 5" },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Last Name"
              type="text"
              inputProps={{ readOnly: isAction == "View" ? true : false }}
              {...register("lastName", {
                required: "lastName is required",
                minLength: { value: 5, message: "min 5" },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="E-mail"
              type="email"
              inputProps={{ readOnly: isAction == "View" ? true : false }}
              {...register("email", {
                required: "email is required",
                minLength: { value: 5, message: "min 5" },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Phone Number"
              type="text"
              inputProps={{ readOnly: isAction == "View" ? true : false }}
              {...register("phoneNumber")}
            />

            <TextField
              label="Create By"
              type="text"
              inputProps={{ readOnly: isAction == "View" ? true : false }}
              {...register("phoneNumber")}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2} margin={2}>
            <DatePicker
              label="Hire Date"
              value={dateValue}
              onChange={(newDate) => {
                setDateValue(newDate);
              }}
            />
            <DatePicker label="Start Working" />

            <DatePicker label="End Working" />

            <MuiSelect
              label="Department"
              options={Items}
              {...register("department")}
            />
            <MuiSelect
              label="Department"
              options={Items}
              {...register("department")}
            />
           

            {/* Active */}
            <MuiRadioGroup
              label=""
              defaultValue="1"
              name="Active"
              items={genderItems}
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
