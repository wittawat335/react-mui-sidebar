import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Theme,
  useTheme,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { messages } from "@/config/messages";
import CheckIcon from "@mui/icons-material/Check";
import { IEmployee } from "@/types/Employee";
import {
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
} from "./employeeApi";
import { EmployeeSchema, EmployeeValidation } from "@/lib/validation/schema";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  name: string,
  roleName: readonly string[] | undefined,
  theme: Theme
) {
  return {
    fontWeight:
      roleName?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface FormProps {
  isAction: string;
  dataToEdit: IEmployee | undefined;
  onClose: () => void;
}

export default function EmployeeForm({
  onClose,
  dataToEdit,
  isAction,
}: FormProps) {
  const theme = useTheme();
  const [addEmployee, { isSuccess: addSuccess }] = useAddEmployeeMutation();
  const [updateEmployee, { isSuccess: updateSuccess }] =
    useUpdateEmployeeMutation();
  //   const [selectedRoles, setSelectedRoles] = useState<string[] | undefined>(
  //     isAction != "New" ? dataToEdit?.roles : []
  //   );

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
      await addEmployee(request);
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
      <Stack spacing={2} margin={2}>
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
          label="Username"
          type="text"
          inputProps={{ readOnly: isAction == "View" ? true : false }}
          {...register("username", { required: "username is required" })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        {isAction === "New" ? (
          <TextField
            label="Password"
            type="password"
            {...register("password", { required: "password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        ) : null}

        <TextField
          label="PhoneNumber"
          type="text"
          inputProps={{ readOnly: isAction == "View" ? true : false }}
          {...register("phonenumber")}
        />
        <TextField
          label="Fullname"
          type="text"
          inputProps={{ readOnly: isAction == "View" ? true : false }}
          {...register("fullname", { required: "fullname is required" })}
          error={!!errors.fullname}
          helperText={errors.fullname?.message}
        />
        {/* Roles DDl */}
        <FormControl>
          <InputLabel>Role</InputLabel>
          <Select
            {...register("roles", { required: "roles is required" })}
            multiple
            value={selectedRoles}
            onChange={handleChange}
            input={<OutlinedInput label="Chip" />}
            inputProps={{ readOnly: isAction == "View" ? true : false }}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {roleSuccess
              ? roles?.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.name}
                    style={getStyles(item.name, selectedRoles, theme)}
                  >
                    {item.name}
                    {selectedRoles?.includes(item.name) ? (
                      <CheckIcon color="info" />
                    ) : null}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>

        {/* Active */}
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            defaultValue={dataToEdit?.active ? dataToEdit.active : "1"}
          >
            <FormControlLabel
              disabled={isAction == "View" ? true : false}
              value="1"
              control={<Radio />}
              label="Active"
              {...register("active")}
            />
            <FormControlLabel
              disabled={isAction == "View" ? true : false}
              value="0"
              control={<Radio />}
              label="InActive"
              {...register("active")}
            />
          </RadioGroup>
        </FormControl>

        {isAction != "View" ? (
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            Save
          </Button>
        ) : null}
      </Stack>
    </form>
  );
}
