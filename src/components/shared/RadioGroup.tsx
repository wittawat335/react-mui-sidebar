import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { FC } from "react";

interface RadioGroupProps {
  name: string;
  label: string;
  defaultValue: string;
  //value: string;
  //onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  items: { id: string; title: string }[];
}

const MuiRadioGroup: FC<RadioGroupProps> = (props) => {
  const { defaultValue, name, label, items } = props;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        row
        defaultValue={defaultValue}
        name={name}
        //value={value}
        //onChange={onChange}
      >
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio />}
            label={item.title}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default MuiRadioGroup;
