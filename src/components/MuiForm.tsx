import { SigninValidation, SignupValidation } from "@/lib/validation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";

export const MuiForm = () => {
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "user@example.com",
      password: "",
      confirmPassword: "",
      username: "",
      fullname: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    control,
  } = form;
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
            {...register("email", {
              required: "Email is required",
              minLength: { value: 5, message: "min 5" },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
            <TextField
            label="confirmPassword"
            type="password"
            {...register("confirmPassword", { required: "confirmPassword is required" })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Stack>
      </form>
      <DevTool control={control} />
    </>
  );
};
