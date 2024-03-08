import { IDepartmentList } from "@/types/Department";
import {
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
} from "../services/departmentApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { messages } from "@/config/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DepartmenSchema, DepartmentValidation } from "@/lib/validation/schema";
import { Button, Grid, Stack } from "@mui/material";
import { IAuth } from "@/types/Auth";
import { ActiveItems } from "@/data/data";
import { MuiRadioGroup, MuiTextField } from "@/components/shared";

type FormProps = {
  user: IAuth | null;
  isAction: string;
  dataToEdit: IDepartmentList | undefined;
  onClose: () => void;
};

const DepartmentForm = ({ user, onClose, dataToEdit, isAction }: FormProps) => {
  const [addDepartment, { isSuccess: addSuccess }] = useAddDepartmentMutation();
  const [updateDepartment, { isSuccess: updateSuccess }] =
    useUpdateDepartmentMutation();

  const methods = useForm<DepartmenSchema>({
    resolver: zodResolver(DepartmentValidation),
    defaultValues: {
      departmentId: dataToEdit?.departmentId ? dataToEdit?.departmentId : "",
      departmentName: dataToEdit?.departmentName
        ? dataToEdit?.departmentName
        : "",
      active: dataToEdit?.active ? dataToEdit?.active : "1",
      createdBy: dataToEdit?.createdBy
        ? dataToEdit?.createdBy!
        : user?.username!,
      modifiedBy:
        isAction != "Edit" ? dataToEdit?.modifiedBy! : user?.username!,
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

  const NewForm = () => {
    return (
      <form onSubmit={handleSubmit(submit)}>
        <Grid container>
          {" "}
          <Grid item xs={12} sm={12} md={12}>
            <Stack spacing={2} margin={2}>
              <MuiTextField
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
      <form onSubmit={handleSubmit(submit)}>
        <Grid container>
          {" "}
          <Grid item xs={12} sm={12} md={12}>
            <Stack spacing={2} margin={2}>
              <MuiTextField
                name={"departmentId"}
                label={"Department ID"}
                control={control}
                isAction={isAction}
              />
              <MuiTextField
                name={"departmentName"}
                label={"Department Name"}
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
      reset();
      toast.success(messages.add_success);
      onClose();
    }
  }, [addSuccess]);

  useEffect(() => {
    if (updateSuccess) {
      reset();
      toast.success(messages.update_success);
      onClose();
    }
  }, [updateSuccess]);

  return <>{isAction == "New" ? NewForm() : EditForm()}</>;
};

export default DepartmentForm;
