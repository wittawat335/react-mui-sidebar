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
import { FormInputText } from "@/components/shared/form";

type FormProps = {
  isAction: string;
  dataToEdit: IDepartment | undefined;
  onClose: () => void;
};
const DepartmentForm = ({ onClose, dataToEdit, isAction }: FormProps) => {
  const { user } = useAppSelector(selectAuth);
  const [addData, { isSuccess: addDataSuccess }] = useAddDepartmentMutation();
  const [updateData, { isSuccess: updateDataSuccess }] =
    useUpdateDepartmentMutation();

  const methods = useForm<DepartmenSchema>({
    resolver: zodResolver(DepartmentValidation),
    defaultValues: {
      id: dataToEdit?.id ? dataToEdit.id : "",
      departmentId: dataToEdit?.departmentId ? dataToEdit?.departmentId : "",
      departmentName: dataToEdit?.departmentName
        ? dataToEdit?.departmentName
        : "",
      createdBy: dataToEdit?.createdBy ? dataToEdit?.createdBy : user?.username,
      active: dataToEdit?.active ? dataToEdit?.active : "1",
      //createdOn: dataToEdit?.createdOn ? dataToEdit?.createdOn : new Date(),
      modifiedBy: dataToEdit?.modifiedBy
        ? dataToEdit?.modifiedBy
        : user?.username,
      //modifiedOn: dataToEdit?.modifiedOn ? dataToEdit?.modifiedOn : new Date(),
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = methods;

  const isOnSubmit = useCallback((values: DepartmenSchema) => {
    window.alert(JSON.stringify(values, null, 4));
  }, []);

  const NewForm = () => {
    return (
      <form onSubmit={handleSubmit(isOnSubmit)}>
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
    return <div>Edit</div>;
  };

  useEffect(() => {
    if (addDataSuccess) {
      toast.success(messages.add_success);
      onClose();
    }
  }, [addDataSuccess]);

  useEffect(() => {
    if (updateDataSuccess) {
      toast.success(messages.update_success);
      onClose();
    }
  }, [updateDataSuccess]);
  return <>{isAction == "New" ? NewForm() : EditForm()}</>;
};

export default DepartmentForm;
