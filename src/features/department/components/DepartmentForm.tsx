import { selectAuth } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/hooks";
import { IDepartment } from "@/types/Department";
import {
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
} from "../services/departmentApi";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { messages } from "@/config/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DepartmenSchema, DepartmentValidation } from "@/lib/validation/schema";
import { Button, Grid, Stack } from "@mui/material";
import {
  FormInputDate,
  FormInputRadio,
  FormInputText,
} from "@/components/shared/form";
import { IAuth } from "@/types/Auth";

type FormProps = {
  user: IAuth | null;
  isAction: string;
  dataToEdit: IDepartment | undefined;
  onClose: () => void;
};

const ActiveItems = [
  { id: "1", label: "Yes", value: "1" },
  { id: "2", label: "No", value: "0" },
];

const DepartmentForm = ({ user, onClose, dataToEdit, isAction }: FormProps) => {
  const [addDepartment, { isSuccess: addSuccess }] = useAddDepartmentMutation();
  const [updateDepartment, { isSuccess: updateSuccess }] =
    useUpdateDepartmentMutation();

  const methods = useForm<DepartmenSchema>({
    resolver: zodResolver(DepartmentValidation),
    defaultValues: {
      //id: dataToEdit?.id ? dataToEdit.id : "",
      departmentId: dataToEdit?.departmentId ? dataToEdit?.departmentId : "",
      departmentName: dataToEdit?.departmentName
        ? dataToEdit?.departmentName
        : "",
      createdBy: dataToEdit?.createdBy ? dataToEdit?.createdBy : user?.username,
      active: dataToEdit?.active ? dataToEdit?.active : "1",
      createdOn: dataToEdit?.createdOn ? dataToEdit?.createdOn : new Date(),
      modifiedBy: dataToEdit?.modifiedBy
        ? dataToEdit?.modifiedBy
        : user?.username,
      modifiedOn: dataToEdit?.modifiedOn ? dataToEdit?.modifiedOn : new Date(),
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = methods;

  const submit = async (request: DepartmenSchema) => {
    try {
      isAction == "New"
        ? await addDepartment(request)
        : await updateDepartment(request);
    } catch (error) {
      console.log({ error });
    }
  };

  const isOnSubmit = useCallback((values: DepartmenSchema) => {
    window.alert(JSON.stringify(values, null, 4));
  }, []);

  const NewForm = () => {
    return (
      <form onSubmit={handleSubmit(submit)}>
        <Grid container>
          {" "}
          <Grid item xs={12} sm={12} md={12}>
            <Stack spacing={2} margin={2}>
              <FormInputText
                name={"departmentName"}
                label={"Datepartment Name"}
                control={control}
                isAction={isAction}
              />
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
    );
  };

  const EditForm = () => {
    return (
      <form onSubmit={handleSubmit(isOnSubmit)}>
        <Grid container>
          {" "}
          <Grid item xs={12} sm={12} md={12}>
            <Stack spacing={2} margin={2}>
              <FormInputText
                name={"departmentId"}
                label={"Department ID"}
                control={control}
                isAction={isAction}
              />
              <FormInputText
                name={"departmentName"}
                label={"Department Name"}
                control={control}
                isAction={isAction}
              />
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
    );
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

  return <>{isAction == "New" ? NewForm() : EditForm()}</>;
};

export default DepartmentForm;
