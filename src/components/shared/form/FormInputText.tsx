import { Control, Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";

interface FormInputProps {
  name: string;
  label: string;
  isAction: string;
}

const FormInputText = ({ name, label, isAction }: FormInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          //size="small"
          inputProps={{ readOnly: isAction == "View" ? true : false }}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};

export default FormInputText;
