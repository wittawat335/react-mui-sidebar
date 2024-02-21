import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";

const InputBox: FC<TextFieldProps> = (props) => {
  const { name, label, value, error = null, onChange, ...other } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export default InputBox;
