import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductValidation, productSchema } from "@/lib/validation/schema";
import { useAddProductMutation } from "./prouductApi";

export default function MuiForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<productSchema>({
    resolver: zodResolver(ProductValidation),
  });

  const onSubmit = useCallback((values: productSchema) => {
    window.alert(JSON.stringify(values, null, 4));
  }, []);

  const [addProduct] = useAddProductMutation();

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
          label="title"
          type="text"
          {...register("title", {
            required: "title is required",
            minLength: { value: 5, message: "min 5" },
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          label="price"
          type="number"
          {...register("price", { required: "price is required" })}
          error={!!errors.price}
          helperText={errors.price?.message}
        />
      </Box>
      <Button variant="contained" type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
