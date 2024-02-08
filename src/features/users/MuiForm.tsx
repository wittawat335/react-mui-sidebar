import { useEffect, useState } from "react";
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
import { useGetRoleNamesQuery } from "../roles/roleApi";
import { useAddUserMutation, useUpdateUserMutation } from "./userApi";
import { toast } from "react-toastify";
import { messages } from "@/config/messages";
import { IUser } from "@/types/User";

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
  data: IUser | undefined;
  isEdit: boolean;
  onClose: () => void;
}

export default function MuiForm({ onClose, data, isEdit }: FormProps) {
  const theme = useTheme();
  const [roleName, setRoleName] = useState<string[] | undefined>([]);
  const { data: names, isSuccess: roleSuccess } = useGetRoleNamesQuery();
  const [addUser, { isSuccess: addUserSuccess }] = useAddUserMutation();
  const [updateUser, { isSuccess: updateSuccess }] = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserSchema>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      email: data?.email ? data?.email : "",
      username: data?.username ? data?.username : "",
      fullname: data?.fullname ? data?.fullname : "",
    },
  });

  const submit = async (request: UserSchema) => {
    try {
      isEdit ? await updateUser(request) : await addUser(request);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleChange = (event: SelectChangeEvent<typeof roleName>) => {
    const {
      target: { value },
    } = event;
    setRoleName(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    if (addUserSuccess) {
      toast.success(messages.add_success);
      onClose();
    }
  }, [addUserSuccess]);

  useEffect(() => {
    if (isEdit) {
      setRoleName(data?.roles.split(","));
    }
  }, []);

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
        {!isEdit ? (
          <TextField
            label="Password"
            type="password"
            {...register("password", { required: "password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        ) : null}

        <TextField
          label="Fullname"
          type="text"
          {...register("fullname", { required: "fullname is required" })}
          error={!!errors.fullname}
          helperText={errors.fullname?.message}
        />
        {/* Roles DDl */}
        <FormControl>
          <InputLabel id="demo-multiple-chip-label">Role</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            {...register("roles", { required: "roles is required" })}
            multiple
            value={roleName}
            onChange={handleChange}
            input={<OutlinedInput label="Chip" />}
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
              ? names?.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, roleName, theme)}
                  >
                    {name}
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
            name="row-radio-buttons-group"
            defaultValue="1"
            value={data?.active}
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
          Submit
        </Button>
      </Stack>
    </form>
  );
}
