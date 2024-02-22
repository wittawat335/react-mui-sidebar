/* eslint-disable react/require-default-props */
import React from "react";
import { TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface IFormElementTypes {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
}

export default function DateFieldElement({
  name,
  label,
  defaultValue,
}: IFormElementTypes) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const [value, setValue] = React.useState<string | null>(null);

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...field}
            label={label}
            inputFormat="DD/MM/YYYY"
            slots={(params) => (
              <TextField
                {...params}
                error={!!errors[name]}
                fullWidth
                helperText={String(errors[name]?.message ?? "")}
                {...register(name)}
              />
            )}
            value={value}
            onChange={(newvalue) => {
              setValue(newvalue);
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
}
