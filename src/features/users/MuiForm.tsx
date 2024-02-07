import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Stack, TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, UserValidation } from "@/lib/validation/schema";

export default function MuiForm() {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        </Box>
        <Button variant="contained" type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
