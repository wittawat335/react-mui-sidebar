import { useCallback, useEffect, useState } from "react";
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
  SelectChangeEvent,
  Stack,
  TextField,
  Theme,
  useTheme,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, UserValidation } from "@/lib/validation/schema";
import { useGetRoleNamesQuery, useGetRolesQuery } from "../roles/roleApi";
import { useAddUserMutation, useUpdateUserMutation } from "./userApi";
import { toast } from "react-toastify";
import { messages } from "@/config/messages";
import { IUser } from "@/types/User";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

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
  dataToEdit: IUser | undefined;
  onClose: () => void;
}

const names: string[] = [
  "Humaira Sims",
  "Santiago Solis",
  "Dawid Floyd",
  "Mateo Barlow",
  "Samia Navarro",
  "Kaden Fields",
  "Genevieve Watkins",
  "Mariah Hickman",
  "Rocco Richardson",
  "Harris Glenn",
];

export default function MuiForm({ onClose, dataToEdit, isAction }: FormProps) {
  console.log(names);
  console.log([dataToEdit?.roles]);
  const theme = useTheme();
  const { data: roles, isSuccess: roleSuccess } = useGetRolesQuery();
  const [addUser, { isSuccess: addUserSuccess }] = useAddUserMutation();
  const [updateUser, { isSuccess: updateSuccess }] = useUpdateUserMutation();
  const [selectedRoles, setSelectedRoles] = useState<string[] | undefined>(
    isAction != "New" ? [] : []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserSchema>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      email: dataToEdit?.email ? dataToEdit.email : "",
      username: dataToEdit?.username ? dataToEdit.username : "",
      fullname: dataToEdit?.fullname ? dataToEdit.fullname : "",
    },
  });

  const submit = async (request: UserSchema) => {
    try {
      await addUser(request);
      //isAction == "Edit" ? await updateUser(request) : await addUser(request);
    } catch (error) {
      console.log({ error });
    }
  };

  const onSubmit = useCallback((values: UserSchema) => {
    window.alert(JSON.stringify(values, null, 4));
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof selectedRoles>) => {
    const {
      target: { value },
    } = event;
    setSelectedRoles(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    if (addUserSuccess) {
      toast.success(messages.add_success);
      onClose();
    }
  }, [addUserSuccess]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack spacing={2} margin={2}>
        <TextField
          label="E-mail"
          type="email"
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
          {...register("username", { required: "username is required" })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          label="Password"
          type="password"
          {...register("password", { required: "password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <TextField
          label="Fullname"
          type="text"
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
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    onDelete={() =>
                      setSelectedRoles(
                        selectedRoles?.filter((item) => item !== value)
                      )
                    }
                    deleteIcon={
                      <CancelIcon
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    }
                  />
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
              value="1"
              control={<Radio />}
              label="Active"
              {...register("active")}
            />
            <FormControlLabel
              value="0"
              control={<Radio />}
              label="InActive"
              {...register("active")}
            />
          </RadioGroup>
        </FormControl>

        <Button variant="contained" type="submit" disabled={isSubmitting}>
          Save
        </Button>
      </Stack>
    </form>
  );
}
