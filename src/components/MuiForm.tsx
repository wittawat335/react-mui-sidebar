import {
  SigninValidation,
  SignupValidation,
  TSignUpSchema,
} from "@/lib/validation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";

export const MuiForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(SignupValidation),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
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
            {...register("confirmPassword", {
              required: "confirmPassword is required",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Stack>
      </form>
      {/* <DevTool control={control} /> */}
    </>
  );
};
