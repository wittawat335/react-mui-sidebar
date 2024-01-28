import { SignupValidation } from "@/lib/validation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";


export const MuiForm = () => {
  const form = useForm<z.infer<typeof SignupValidation>>({
    defaultValues: {
      email: "user@example.com",
      password: "",
      confirmPassword: "",
      username: "",
      fullname: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = (data: z.infer<typeof SignupValidation>) => {
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} margin={2} width={400}>
          <TextField
            label="email"
            type="email"
            {...register("email", { required: "email is req" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="password"
            type="password"
            {...register("password", { required: "Password is req" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
};
