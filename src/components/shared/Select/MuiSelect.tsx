import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import { FormHelperText } from "@mui/material";

interface Option {
  id: string;
  name: string;
}

interface MuiSelectProps {
  name: string;
  label: string;
  value: any;
  error: string | null;
  options: Option[];
}

const MuiSelect: React.FC<MuiSelectProps> = (props) => {
  const { name, label, value, error = null, options } = props;

  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} name={name} value={value}>
        <MenuItem value="">None</MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default MuiSelect;
