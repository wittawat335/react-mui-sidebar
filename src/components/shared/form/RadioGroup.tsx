import * as React from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup
} from "@mui/material";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

interface IOptionTypes {
  id: string;
  label: string;
  value: string;
  desc?: string;
}

interface IFormElementTypes {
  name: string;
  options: IOptionTypes[];
}

export default function MuiRadioGroup({
  name,
  options
}: IFormElementTypes) {
  const {
    control,
    register,
    formState: { errors }
  } = useFormContext();

  /* const [theValue, setTheValue] = useState(control._defaultValues[name]);

  const handleChange = (event) => {
    console.log(event.target.value);

    setTheValue(event.target.value);
  }; */

  return (
    <Controller
      name={name}
      defaultValue=""
      control={control}
      render={({ field }) => (
        <FormControl fullWidth>
          <RadioGroup
            {...field}
            row
            onChange={(event, value) => field.onChange(value)}
            value={field.value}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          <FormHelperText>{String(errors[name]?.message ?? "")}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
