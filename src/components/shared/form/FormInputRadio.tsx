import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

interface IOptionTypes {
  id: string;
  label: string;
  value: string;
  desc?: string;
}

interface IFormElementTypes {
  label: string;
  name: string;
  control: any;
  options: IOptionTypes[];
}

export default function FormInputRadio({
  label,
  name,
  control,
  options,
}: IFormElementTypes) {
  return (
    <Controller
      name={name}
      //defaultValue=""
      control={control}
      render={({ field }) => (
        <FormControl fullWidth>
          <FormLabel component="legend">{label}</FormLabel>
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
        </FormControl>
      )}
    />
  );
}
