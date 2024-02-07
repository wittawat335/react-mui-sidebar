import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
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
import { useAddUserMutation } from "./userApi";
import { toast } from "react-toastify";
import { messages } from "@/config/messages";

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

function getStyles(name: string, roleName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      roleName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MuiForm() {
  const theme = useTheme();
  const [roleName, setRoleName] = useState<string[]>([]);
  const { data: names, isSuccess: roleSuccess } = useGetRoleNamesQuery();
  const [addUser, { isSuccess: addUserSuccess }] = useAddUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserSchema>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      email: "",
      username: "",
      fullname: "",
      password: "",
      roles: [],
      active: true,
    },
  });

  const onSubmit = useCallback((values: UserSchema) => {
    window.alert(JSON.stringify(values, null, 4));
  }, []);

  const handleAddUser = async (request: UserSchema) => {
    try {
      await addUser(request);
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
    if (addUserSuccess) toast.success(messages.delete_success);
  }, [addUserSuccess]);

  return (
    <form onSubmit={handleSubmit(handleAddUser)}>
      <Stack spacing={2} margin={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          <TextField
            label="Email"
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
          <FormControl>
            <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              {...register("roles", { required: "roles is required" })}
              multiple
              value={roleName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
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
        </Box>
        <Button variant="contained" type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
