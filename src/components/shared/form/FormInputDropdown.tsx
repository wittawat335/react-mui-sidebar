import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface FormInputProps {
  name: string;
  label: string;
  isAction: string;
  options: Option[];
}

const FormInputDropdown = ({
  name,
  label,
  isAction,
  options,
}: FormInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const generateSingleOptions = () => {
    return options.map((option: any) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Select
            onChange={onChange}
            value={value}
            inputProps={{ readOnly: isAction == "View" ? true : false }}
            error={!!error}
          >
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
      {/* {error && <FormHelperText>{error}</FormHelperText>} */}
    </FormControl>
  );
};

export default FormInputDropdown;
