import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { TSignUpSchema, SignupValidation } from "./schema";
import { Box, Button, TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/lib/types";

export default function () {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = useCallback((values: TSignUpSchema) => {
    window.alert(JSON.stringify(values, null, 4));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginBottom: "15px",
        }}
      >
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
      </Box>
      <Button variant="contained" type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
